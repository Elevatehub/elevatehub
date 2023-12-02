import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Bookmark } from './schema/bookmark.schema';
import { Search } from 'src/search/schema/search.schema';
import { Hashtag } from 'src/hashtag/schema/hashtag.schema';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name)
    private BookmarkModel: mongoose.Model<Bookmark>,
    @InjectModel(Search.name)
    private SearchModel: mongoose.Model<Search>,
    @InjectModel(Hashtag.name)
    private HashtagModel: mongoose.Model<Hashtag>,
  ) { }

  async create(createBookmarkDto: CreateBookmarkDto, idUser: any) {
    const id = idUser.id;
    const { query, header, isActive } = createBookmarkDto;
    const Bookmark = await this.BookmarkModel.create({
      idUser: id,
      query: query,
      header: header,
      isActive: isActive,
    });
    return Bookmark;
  }

  async findAll(header: any) {
    const Bookmarks = await this.BookmarkModel.find({
      idUser: { $in: header.id },
    });

    const result = await Promise.all(
      Bookmarks.map(async (item) => {
        const BookmarkData = await this.findOne(item._id.toHexString());
        return {
          ...BookmarkData,
        };
      }),
    );

    return result;
  }

  async findKeyword(header: any) {
    const Bookmark = await this.BookmarkModel.find({
      idUser: { $in: header.id },
    });
    const keywordsArray = Bookmark.map((obj) => obj.query);
    const joinedKeywords = keywordsArray.join(',');
    const splitKeywords = joinedKeywords.split(',');
    return splitKeywords;
  }

  async findOne(id: string): Promise<Bookmark> {
    const data = await this.BookmarkModel.findOne({ _id: id });
    const bankData = await this.SearchModel.find({
      type: {
        $in: ['Tiktok', 'Instagram', 'Facebook', 'News'],
      },
      keywords: { $in: data.query.split(',') },
    });
    const hashtagData = await this.HashtagModel.find({
      keyword: { $in: data.query.split(',') },
    });
    const groupHashtag = await this.groupingHashtag(hashtagData);
    const groupType = await this.groupByType(bankData);
    const groupSentiment = await this.groupBySentiment(bankData);
    const groupingByDateTypes = await this.groupByCreatedAtAndGetTypeCount(
      bankData,
    );
    const groupingByDateSentiment =
      await this.groupByCreatedAtAndGetSentimentCount(bankData);
    const groupedDataType = await this.groupedDataType(groupingByDateTypes);
    const groupedDataSentiment = await this.groupedDataSentiment(
      groupingByDateSentiment,
    );
    if (data._id === undefined) {
      throw new InternalServerErrorException('Bookmark not found');
    }
    return {
      id: id,
      query: data.query,
      idUser: data.idUser,
      header: data.header,
      isActive: true,
      GroupType: groupType,
      GroupSentiment: groupSentiment,
      GroupHashtag: groupHashtag,
      DateType: groupingByDateTypes,
      DateSentiment: groupingByDateSentiment,
      Type: groupedDataType,
      Sentiment: groupedDataSentiment,
      Hashtag: hashtagData,
      News: bankData
        .filter((data) => data.type === 'News')
        .sort(
          (a, b) =>
            (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any),
        ),
    };
  }

  async update(id: string, updateBookmarkDto: UpdateBookmarkDto) {
    return await this.BookmarkModel.findByIdAndUpdate(id, updateBookmarkDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<Bookmark> {
    return await this.BookmarkModel.findByIdAndDelete(id);
  }

  async groupByType(articles) {
    const groupedByType = articles.reduce((groups, article) => {
      const type = article.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(article);
      return groups;
    }, {});

    const typeCounts = Object.keys(groupedByType).map((type) => ({
      type,
      count: groupedByType[type].length,
    }));
    return typeCounts;
  }

  async groupBySentiment(articles) {
    const groupedByType = articles.reduce((groups, article) => {
      const type = article.sentiment;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(article);
      return groups;
    }, {});

    const typeCounts = Object.keys(groupedByType).map((type) => ({
      type,
      count: groupedByType[type].length,
    }));
    return typeCounts;
  }

  async groupByCreatedAtAndGetTypeCount(data) {
    const groupedData = await data.reduce((result, item) => {
      const createdAt = new Date(item.createdAt).toISOString().split('T')[0]; // Convert to ISO string and extract date part
      const type = item.type;

      if (!result[createdAt]) {
        result[createdAt] = {
          News: 0,
          Facebook: 0,
          Tiktok: 0,
          Instagram: 0,
          Twitter: 0,
        };
      }

      if (!result[createdAt][type]) {
        result[createdAt][type] = 0;
      }

      result[createdAt][type]++;

      return result;
    }, {});

    // Sort the grouped data by 'createdAt' date
    const sortedGroupedData = Object.keys(groupedData)
      .sort((a, b) => (new Date(a) as any) - (new Date(b) as any))
      .reduce((sorted, key) => {
        sorted[key] = groupedData[key];
        return sorted;
      }, {});

    return sortedGroupedData;
  }

  async groupByCreatedAtAndGetSentimentCount(data) {
    const groupedData = await data.reduce((result, item) => {
      const createdAt = new Date(item.createdAt).toISOString().split('T')[0]; // Convert to ISO string and extract date part
      const type = item.sentiment;

      if (!result[createdAt]) {
        result[createdAt] = {
          Positive: 0,
          Netral: 0,
          Negative: 0,
        };
      }

      if (!result[createdAt][type]) {
        result[createdAt][type] = 0;
      }

      result[createdAt][type]++;

      return result;
    }, {});

    // Sort the grouped data by 'createdAt' date
    const sortedGroupedData = Object.keys(groupedData)
      .sort((a, b) => (new Date(a) as any) - (new Date(b) as any))
      .reduce((sorted, key) => {
        sorted[key] = groupedData[key];
        return sorted;
      }, {});

    return sortedGroupedData;
  }

  async groupedDataType(groupedData) {
    const types = ['News', 'Facebook', 'Tiktok', 'Instagram', 'Twitter'];
    const transformedData = types.map((type) => ({
      name: type,
      data: Object.keys(groupedData).map(
        (date) => groupedData[date][type] || 0,
      ),
    }));
    return transformedData;
  }

  async groupedDataSentiment(groupedData) {
    const types = ['Positive', 'Netral', 'Negative'];
    const transformedData = types.map((type) => ({
      name: type,
      data: Object.keys(groupedData).map(
        (date) => groupedData[date][type] || 0,
      ),
    }));
    return transformedData;
  }

  async groupingHashtag(data: any[]) {
    const groupedByTitle = data.reduce((acc, current) => {
      const { title, ...rest } = current;
      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title].push(rest);
      return acc;
    }, {});

    const groupedEntities = Object.entries(groupedByTitle)
      .map(([title, entities]) => ({
        title,
        entities: (entities as any[]).length, // Use type assertion here
      }))
      .sort((a, b) => b.entities - a.entities);

    const getTopTen = groupedEntities.filter((data, index) => index <= 10);
    return getTopTen;
  }
}
