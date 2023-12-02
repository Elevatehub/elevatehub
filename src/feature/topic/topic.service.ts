import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Topic } from './schema/topic.schema';
import { Search } from 'src/search/schema/search.schema';
import { Hashtag } from 'src/hashtag/schema/hashtag.schema';
import * as natural from 'natural';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name)
    private TopicModel: mongoose.Model<Topic>,
    @InjectModel(Search.name)
    private SearchModel: mongoose.Model<Search>,
    @InjectModel(Hashtag.name)
    private HashtagModel: mongoose.Model<Hashtag>,
  ) { }

  async create(createTopicDto: CreateTopicDto, idUser: any) {
    const id = idUser.id;
    const { query, header, isActive } = createTopicDto;
    const Topic = await this.TopicModel.create({
      idUser: id,
      query: query,
      header: header,
      isActive: isActive,
    });
    return Topic;
  }

  async findAll(header: any) {
    const topics = await this.TopicModel.find({
      idUser: { $in: header.id },
    });

    const result = await Promise.all(
      topics.map(async (item) => {
        const topicData = await this.findOne(item._id.toHexString());
        return {
          ...topicData,
        };
      }),
    );

    return result;
  }

  async findKeyword(header: any) {
    const Topic = await this.TopicModel.find({
      idUser: { $in: header.id },
    });
    const keywordsArray = Topic.map((obj) => obj.query);
    const joinedKeywords = keywordsArray.join(',');
    const splitKeywords = joinedKeywords.split(',');
    return splitKeywords;
  }

  async findAllKeyword() {
    const Topic = await this.TopicModel.find();
    const keywordsArray = Topic.map((obj) => obj.query);
    const joinedKeywords = keywordsArray.join(',');
    const splitKeywords = joinedKeywords.split(',');
    return splitKeywords;
  }

  async findAllEntity(header: any) {
    const Topic = await this.TopicModel.find();
    return Topic;
  }

  async findOne(id: string): Promise<Topic> {
    const data = await this.TopicModel.findOne({ _id: id });
    const bankData = await this.SearchModel.find({
      type: {
        $in: ['Tiktok', 'Instagram', 'Facebook', 'News'],
      },
      keywords: { $in: data.query.split(',') },
    });
    const hashtagData = await this.HashtagModel.find({
      keyword: { $in: data.query.split(',') },
    });
    const keywordData = await this.groupedKeywordType(
      bankData.filter((data) => data.type === 'News'),
    );
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
    const groupingByBrand = await this.groupedByBrand(
      bankData.filter((data) => data.type === 'News'),
    );
    if (data._id === undefined) {
      throw new InternalServerErrorException('Topic not found');
    }
    return {
      id: id,
      Keyword: keywordData,
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
      Brands: groupingByBrand,
      News: bankData
        .filter((data) => data.type === 'News')
        .sort(
          (a, b) =>
            (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any),
        ),
    };
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    return await this.TopicModel.findByIdAndUpdate(id, updateTopicDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<Topic> {
    return await this.TopicModel.findByIdAndDelete(id);
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

  async groupedKeywordType(groupedData) {
    const joinedParagraph = groupedData.map((item) => item.desc).join(' ');
    const tokenizer = new natural.WordTokenizer();

    const text = joinedParagraph;
    const words = tokenizer.tokenize(text);

    // You can filter out common stop words if needed
    const stopWords = [
      'untuk',
      'dan',
      'di',
      'kepada',
      'ke',
      'com',
      'ini',
      'Rp',
      'yang',
    ];
    const filteredWords = words.filter(
      (word) => !stopWords.includes(word.toLowerCase()),
    );

    // Count the frequency of each word
    const wordFrequency = {};
    filteredWords.forEach((word) => {
      if (wordFrequency[word]) {
        wordFrequency[word]++;
      } else {
        wordFrequency[word] = 1;
      }
    });

    // Sort the words by frequency
    const sortedWords = Object.keys(wordFrequency).sort(
      (a, b) => wordFrequency[b] - wordFrequency[a],
    );

    // Get the top keywords (e.g., top 5)
    const topKeywords = sortedWords.slice(0, 10);

    return topKeywords;
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

  async groupedByBrand(data) {
    // Create an object to store the counts
    const countObj = {};

    // Count the occurrences of each unique 'data' value
    data.forEach((item) => {
      const { author } = item;
      countObj[author] = (countObj[author] || 0) + 1;
    });

    // Transform the counts into the desired format
    const result = Object.keys(countObj).map((author) => ({
      author,
      qty: countObj[author],
    }));
    return result;
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
