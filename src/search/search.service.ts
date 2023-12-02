/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ApifyClient } from 'apify-client';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Search } from './schema/search.schema';
import { CreateDataBankDto } from '../data-bank/dto/create-data-bank.dto';
import { Hashtag } from '../hashtag/schema/hashtag.schema';
import { MAX_GET } from 'src/core/constant';
import * as MD5 from 'crypto-js/md5';
import { PostSearchDto } from './dto/post-search.dto';

@Injectable()
export class SearchService {
  private client: ApifyClient;
  constructor(
    @InjectModel(Search.name)
    private searchModel: mongoose.Model<Search>,
    @InjectModel(Hashtag.name)
    private hashtagModel: mongoose.Model<Hashtag>,
  ) {
    this.client = new ApifyClient({
      token: 'apify_api_JJ5UnlHs0ljpPHJGr5sDcMQpYPyYYC19kkDJ',
    });
  }

  async findAll(items: CreateDataBankDto) {
    const { type, keywords } = items;
    const Transaction = await this.searchModel.find({
      type: { $in: type },
      keywords: { $in: keywords },
    });
    return Transaction;
  }

  async findGoogle(keyword: PostSearchDto) {
    const keywordChoice = keyword.keyword.map((items) => items.toLowerCase());
    const citiesString = keywordChoice.join(' ');
    const input = {
      queries: citiesString,
      maxPagesPerQuery: 1,
      resultsPerPage: MAX_GET,
      mobileResults: false,
      languageCode: '',
      maxConcurrency: 1,
      saveHtml: false,
      saveHtmlToKeyValueStore: false,
      includeUnfilteredResults: false,
      customDataFunction: async ({ input, $, request, response, html }) => {
        return {
          pageTitle: $('title').text(),
        };
      },
    };

    const run = await this.client
      .actor('apify/google-search-scraper')
      .call(input);
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      // console.dir(item);
    });
    return 'Berhasil';
  }

  async findTiktok(keyword) {
    try {
      const array = keyword.keyword.map(async (key) => {
        const keyword = key.toLowerCase()
        const input = {
          hashtags: [keyword],
          resultsPerPage: MAX_GET,
          shouldDownloadVideos: false,
          shouldDownloadCovers: false,
        };
        const run = await this.client
          .actor('clockworks/tiktok-hashtag-scraper')
          .call(input);
        const { items } = await this.client
          .dataset(run.defaultDatasetId)
          .listItems();
        const promises = items.map(async (item) => {
          const authorName = (item.authorMeta as { name: string }).name;
          const avatar = (item.authorMeta as { avatar: string }).avatar;
          const pushItemPromise = this.pushItem({
            id: item.id,
            title: 'string',
            url: item.webVideoUrl,
            views: item.playCount,
            avatar: avatar,
            author: authorName,
            desc: item.text,
            type: 'Tiktok',
            keywords: keyword,
            createdAt: item.createTimeISO,
          });
          const pushHashTagPromise = this.pushHashTag(item.hashtags, keyword);
          await Promise.all([pushItemPromise, pushHashTagPromise]);
        });
        const result = await Promise.all(promises);
        return result;
      });
      return await Promise.all(array);
    } catch (error) {
      return 'Berhasil';
    }
  }

  async findInstagram(keyword) {
    try {
      const array = keyword.keyword.map(async (key) => {
        const keyword = key.toLowerCase()
        const input = {
          hashtags: [keyword],
          resultsLimit: MAX_GET,
        };
        const run = await this.client
          .actor('apify/instagram-hashtag-scraper')
          .call(input);
        // Fetch and print actor results from the run's dataset (if any)
        // console.log('Results from dataset');
        const { items } = await this.client
          .dataset(run.defaultDatasetId)
          .listItems();
        const promises = items.map(async (item) => {
          const pushItemPromise = this.pushItem({
            id: item.id,
            title: 'string',
            url: item.url,
            views: item.likesCount,
            author: item.ownerFullName,
            avatar: item.displayUrl,
            desc: item.caption,
            type: 'Instagram',
            keywords: key.toLowerCase(),
            createdAt: item.createTimeISO,
          });
          const pushHashTagPromise = this.pushHashTagInstag(item.hashtags, key.toLowerCase());
          await Promise.all([pushItemPromise, pushHashTagPromise]);
        });
        const result = await Promise.all(promises);
        return result;
      });
      return await Promise.all(array);
    } catch (error) {
      return 'Berhasil';
    }
  }

  async findFacebook(keyword) {
    try {
      const array = keyword.keyword.map(async (key) => {
        const keyword = key.toLowerCase();
        const input = {
          keywordList: [keyword],
          resultsLimit: MAX_GET,
          proxy: {
            useApifyProxy: true,
            apifyProxyGroups: ['RESIDENTIAL'],
          },
          maxRequestRetries: 1000,
        };
        const run = await this.client
          .actor('apify/facebook-hashtag-scraper')
          .call(input);
        const { items } = await this.client
          .dataset(run.defaultDatasetId)
          .listItems();
        const promises = items.map(async (item) => {
          const name = (item.user as { name: string }).name;
          const profilePic = (item.user as { profilePic: string }).profilePic;
          const pushItemPromise = this.pushItem({
            id: item.postId,
            title: 'string',
            url: item.url,
            views: item.viewsCount,
            author: name,
            avatar: profilePic,
            type: 'Facebook',
            desc: item.text,
            keywords: keyword,
            createdAt: item.date,
          });
          const pushHashTagPromise = this.pushHashTagFb(item.hashtags, keyword);
          await Promise.all([pushItemPromise, pushHashTagPromise]);
        });
        const result = await Promise.all(promises);
        return result;
      })
      return await Promise.all(array);
    } catch (error) {
      return 'Berhasil';
    }
  }

  async findGoogleNews(keyword: string) {
    try {
      const input = {
        query: keyword,
        language: 'ID:id',
        maxItems: MAX_GET,
        extractImages: false,
        proxyConfiguration: {
          useApifyProxy: true,
        },
      };
      const run = await this.client
        .actor('lhotanok/google-news-scraper')
        .call(input);
      const { items } = await this.client
        .dataset(run.defaultDatasetId)
        .listItems();
      const promises = items.map(async (item) => {
        const pathSegment = this.getLastPathSegment(item.link);
        const decodedString = atob(pathSegment);
        const cleanURL = this.getCleanURL(decodedString);
        // const result = MD5(cleanURL).toString();
        const pushItemPromise = this.pushItem({
          id: pathSegment,
          title: item.title,
          url: cleanURL,
          views: 0,
          author: item.source,
          avatar: item.image,
          type: 'News',
          desc: item.title,
          keywords: keyword,
          createdAt: item.publishedAt,
        });
        await Promise.all([pushItemPromise]);
      });
      const result = await Promise.all(promises);
      return result;
    } catch (error) {
      return 'Berhasil';
    }
  }

  async findGoogleTrends() {
    const input = {
      geo: 'ID',
      outputMode: 'complete',
      fromDate: 'today',
      toDate: '2 days',
      maxItems: MAX_GET,
      proxy: {
        useApifyProxy: true,
      },
      extendOutputFunction: async ({ item }) => {
        return item;
      },
      customData: {},
    };
    const run = await this.client
      .actor('hooli/google-trending-searches')
      .call(input);
    // Fetch and print actor results from the run's dataset (if any)
    // console.log('Results from dataset');
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      // console.dir(item);
    });
    return items;
  }

  async findGoogleTrendsSearchKeyword(keyword: PostSearchDto) {
    const array = keyword.keyword.map((items) => items.toLowerCase());
    const input = {
      searchTerms: array,
      isMultiple: false,
      timeRange: '',
      geo: '',
      isPublic: false,
      category: '',
      maxItems: MAX_GET,
      extendOutputFunction: ($) => {
        const result = {};
        return result;
      },
      proxyConfiguration: {
        useApifyProxy: true,
      },
      outputAsISODate: false,
      csvOutput: false,
      maxConcurrency: 10,
      pageLoadTimeoutSecs: 180,
    };
    const run = await this.client
      .actor('emastra/google-trends-scraper')
      .call(input);
    // Fetch and print actor results from the run's dataset (if any)
    // console.log('Results from dataset');
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      // console.dir(item);
    });
    return items;
  }

  async findGoogleTrendsSearch(keyword: PostSearchDto) {
    const array = keyword.keyword.map((items) => items.toLowerCase());
    const input = {
      search: array,
      countryCode: 'id',
    };
    const run = await this.client
      .actor('hooli/easy-google-scraper')
      .call(input);
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      const keywords = (item.searchQuery as { term: string }).term;
      const url = item.url as string;
      const urlObject = new URL(url);
      const hostUrl = urlObject.origin;
      this.pushItem({
        id: item.displayedUrl,
        title: 'string',
        url: item.url,
        views: 'google',
        author: hostUrl,
        avatar: 'google',
        type: 'GoogleTrends',
        desc: item.description,
        keywords: keywords,
        createdAt: new Date(),
      });
    });
    return items;
  }

  async findWebCompetitorQuick(keyword: PostSearchDto) {
    const array = keyword.keyword.map((items) => items.toLowerCase());
    console.log(array);
    const input = {
      websites: array,
      proxy: {
        useApifyProxy: true,
        apifyProxyCountry: 'US',
      },
    };
    const run = await this.client
      .actor('mscraper/similarweb-quick-scraper')
      .call(input);
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      console.dir(item);
    });
    return items;
  }

  async findWebCompetitorFull(keyword: PostSearchDto) {
    const array = keyword.keyword.map((items) => items.toLowerCase());
    const input = {
      websites: array,
      maxRequestRetries: 100,
      proxyConfigurationOptions: {
        useApifyProxy: true,
      },
    };
    const run = await this.client.actor('m0uka/similarweb-scraper').call(input);
    // Fetch and print actor results from the run's dataset (if any)
    // console.log('Results from dataset');
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      // console.dir(item);
    });
    return 'Berhasil';
  }

  async findBussinessExtract(keyword: PostSearchDto) {
    const array = keyword.keyword.map((items) => items.toLowerCase());
    const input = {
      searchStringsArray: array,
      locationQuery: 'Jakarta, INDONESIA',
      maxCrawledPlacesPerSearch: 1,
      language: 'id',
      onlyDataFromSearchPage: false,
      includeWebResults: false,
      deeperCityScrape: false,
      oneReviewPerRow: false,
      reviewsSort: 'newest',
      reviewsFilterString: '',
      scrapeReviewerName: true,
      scrapeReviewerId: true,
      scrapeReviewerUrl: true,
      scrapeReviewId: true,
      scrapeReviewUrl: true,
      scrapeResponseFromOwnerText: true,
      searchMatching: 'all',
      placeMinimumStars: '',
      allPlacesNoSearchAction: '',
    };
    const run = await this.client
      .actor('compass/crawler-google-places')
      .call(input);
    // Fetch and print actor results from the run's dataset (if any)
    // console.log('Results from dataset');
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      // console.dir(item);
    });
    return items;
  }

  async findTechnologyLookup(keyword: PostSearchDto) {
    const files = [];
    keyword.keyword.forEach((element) => {
      files.push({
        url: element,
      });
    });
    const input = {
      startUrls: files,
      proxyConfig: {
        useApifyProxy: true,
        apifyProxyGroups: ['RESIDENTIAL'],
      },
    };
    const run = await this.client
      .actor('alexey/web-technology-lookup')
      .call(input);
    // Fetch and print actor results from the run's dataset (if any)
    // console.log('Results from dataset');
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      // console.dir(item);
    });
    return items;
  }

  async findSEOAudit(keyword: PostSearchDto) {
    const input = {
      startUrl: keyword.keyword[0],
      proxy: {
        useApifyProxy: true,
      },
      maxRequestsPerCrawl: MAX_GET,
      maxDepth: MAX_GET,
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
      viewPortWidth: 1440,
      viewPortHeight: 900,
      pageTimeout: 300000,
      maxRequestRetries: 200,
      handlePageTimeoutSecs: 5,
      seoParams: {
        maxTitleLength: 70,
        minTitleLength: 10,
        maxMetaDescriptionLength: 140,
        maxLinksCount: 3000,
        maxWordsCount: 350,
        outputLinks: false,
        workingStatusCodes: [200, 301, 302, 304],
      },
    };
    const run = await this.client.actor('misceres/seo-audit-tool').call(input);
    // Fetch and print actor results from the run's dataset (if any)
    // console.log('Results from dataset');
    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();
    items.forEach((item) => {
      // console.dir(item);
    });
    return items;
  }

  async pushItem(item) {
    try {
      await this.searchModel.create({
        ...item,
        sentiment: await this.pushSentiment(item.desc),
      });
      return;
    } catch (error) {
      return;
    }
  }

  async pushHashTag(item, keyword) {
    item.forEach((data) => {
      try {
        this.hashtagModel.create({
          title: data.name,
          keyword: keyword,
        });
        return;
      } catch (error) {
        return;
      }
    });
    return 'Berhasil';
  }

  async pushHashTagInstag(item, keyword) {
    item.forEach((data) => {
      try {
        this.hashtagModel.create({
          title: data,
          keyword: keyword,
        });
        return;
      } catch (error) {
        return;
      }
    });
    return 'Berhasil';
  }

  async pushHashTagFb(item, keyword) {
    try {
      this.hashtagModel.create({
        title: keyword,
        keyword: keyword,
      });
      return;
    } catch (error) {
      return;
    }
  }

  async pushSentiment(content) {
    const regex = /#\w+/g;
    const getData = await fetch(
      `https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyAjVgaXw5PQhVg-OgIV-Dq_qExoDKOdI3E`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: {
            type: 'PLAIN_TEXT',
            content: content.replace(regex, ''),
          },
          encodingType: 'UTF8',
        }),
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    // return getData;
    if (getData.documentSentiment === undefined) {
      return 'Netral';
    } else if (getData.documentSentiment.score === 0.4) {
      return 'Netral';
    } else if (getData.documentSentiment.score > 0.4) {
      return 'Positive';
    } else if (getData.documentSentiment.score < 0.4) {
      return 'Negative';
    }
  }

  getCleanURL(text) {
    const separatorIndex = text.lastIndexOf('Ò');
    if (separatorIndex !== -1) {
      text = text.substring(0, separatorIndex);
    }
    const urlRegex = /(https?:\/\/[^\s'"<>]+)/g;
    const matches = text.match(urlRegex);
    return matches ? matches[0] : null;
  }

  getLastPathSegment(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const pathSegments = pathname.split('/');
    return pathSegments[pathSegments.length - 1];
  }
}
