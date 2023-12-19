<template>
  <v-layout v-if="isLoadingTopics">
    <v-main class="fullscreen-center">
      <Loading />
    </v-main>
  </v-layout>
  <v-row v-if="options.labels.length > 0">
    <v-col>
      <div class="w-100 cardItem">
        <div class="card-body">
          <div class="card-title cardHeader">All</div>
          <div class="d-flex align-items-center">
            <img :src="imageSelector('All')" class="img-fluid colorImage" alt="" style="width: 20%; margin-right: 5%" />
            <a>{{ totalMed }}</a>
          </div>
        </div>
      </div>
    </v-col>
    <v-col v-for="item in medsos" :key  ="item.type">
      <div class="w-100 cardItem">
        <div class="card-body">
          <div class="card-title cardHeader">{{ item.type }}</div>
          <div class="d-flex align-items-center">
            <img :src="imageSelector(item.type)" class="img-fluid colorImage" alt=""
              style="width: 20%; margin-right: 5%" />
            <a>{{ item.count }}</a>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
  <div class="col">
    <div class="cardItemBar" v-if="options.labels.length > 0">
      <div class="cardHeader">Trends by Date</div>
      <apexchart width="100%" height="150%" type="line" :options="options" :series="series"></apexchart>
    </div>
  </div>
  <v-row>
    <v-col v-if="options.labels.length > 0">
      <div class="cardItemBar">
        <div class="cardHeader">Total Sentiment</div>
        <apexchart width="100%" height="170%" type="donut" :options="optionsDonuts" :series="donutSeries">
        </apexchart>
      </div>
    </v-col>
    <v-col cols="8" v-if="options.labels.length > 0">
      <div class="cardItemBar">
        <div class="cardHeader">Trends Sentiment</div>
        <apexchart width="100%" height="155%" type="area" :options="options" :series="sentiment"></apexchart>
      </div>
    </v-col>
  </v-row>
  <v-card class="my-5">
    <v-tabs v-model="tab" bg-color="purple">
      <v-tab value="one">Top Hashtag</v-tab>
      <v-tab value="two">Top Keywords</v-tab>
      <v-tab value="three">Top Media</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <ul class="list-group" v-for="name in hashtag" :key="name._id">
            <li class="list-group-item">
              <v-row>
                <v-col>#{{ name.title }}</v-col>
                <v-col style="text-align: end">{{ name.entities }} Items</v-col>
              </v-row>
            </li>
          </ul>
        </v-window-item>

        <v-window-item value="two">
          <ul class="list-group" v-for="name in keyword" :key="name">
            <li class="list-group-item">
              <v-row>
                <v-col>{{ name }}</v-col>
              </v-row>
            </li>
          </ul>
        </v-window-item>

        <v-window-item value="three">
          <ul class="list-group" v-for="name in brands" :key="name._id">
            <li class="list-group-item">
              <v-row>
                <v-col>{{ name.author }}</v-col>
                <v-col style="text-align: end">{{ name.qty }} Items</v-col>
              </v-row>
            </li>
          </ul>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import global from '@assets/logoBrand/global.png'
import news from '@assets/logoBrand/news.png'
import facebook from '@assets/logoBrand/facebook.png'
import instagram from '@assets/logoBrand/instagram.png'
import tiktok from '@assets/logoBrand/tiktok.png'
import twitter from '@assets/logoBrand/twitter.png'
import { topicService } from '@service/topic'
import Loading from '@components/loading/LoadingComponent.vue'

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoadingTopics: false,
      totalMed: 0,
      medsos: [],
      keyword: [],
      options: {
        labels: [],
        colors: ['#00DFA2', '#3E001F', '#0079FF', '#F11A7B', '#4F200D']
      },
      optionsDonuts: {
        labels: [],
        colors: ['#00DFA2', '#4F200D', '#F11A7B']
      },
      series: [],
      sentiment: [],
      donutSeries: [],
      hashtag: [],
      brands: [],
      tab: null,
      currentHash: window.location.hash.replace('#', ''),
    }
  },
  methods: {
    imageSelector(type) {
      if (type === 'Tiktok') {
        return tiktok
      }
      if (type === 'Instagram') {
        return instagram
      }
      if (type === 'Facebook') {
        return facebook
      }
      if (type === 'News') {
        return news
      }
      if (type === 'All') {
        return global
      }
      if (type === 'Twitter') {
        return twitter
      }
    },
    getData() {
      const idPath = window.location.hash.replace('#', '')
      this.getTopics(idPath)
    },
    async getTopics(idPath) {
      this.isLoadingTopics = true
      try {
        const data = await topicService.topicGetId(idPath)
        ///MedsosHeader
        this.medsos = data.GroupType
        let tMed = 0
        data.GroupType.map((items) => (tMed += items.count))
        this.totalMed = tMed
        ///TrendByDate
        this.series = data.Type.map(({ name, data }) => ({
          name,
          data: data.slice(-5) // Get the first 5 elements
        }))
        console.log(this.series)
        ///TrendSentiment
        this.options.labels = Object.keys(data.DateType).slice(-5)
        this.sentiment = data.Sentiment.map(({ name, data }) => ({
          name,
          data: data.slice(-5) // Get the first 5 elements
        }))
        ///
        this.optionsDonuts.labels = data.GroupSentiment.map((data) => data.type)
        this.donutSeries = data.GroupSentiment.map((data) => data.count)
        ///hashtag
        this.hashtag = data.GroupHashtag
        this.keyword = data.Keyword
        this.brands = data.Brands.sort((a, b) => b.qty - a.qty).slice(0, 10)
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
      }
    },
  },
  created() {
    this.getData()
  },
  mounted() {
    window.addEventListener('hashchange', this.handleHashChange);
    this.intervalId = setInterval(() => {
      const now = window.location.hash.replace('#', '');
      if(now != this.currentHash){
        this.getData()
        this.currentHash = now
        this.isLoadingTopics = true
      }
    }, 1000);
  }
}
</script>

  <style scoped>
  .fullscreen-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .cardItem {
    border-radius: 8px;
    background: #fff;
    padding: 10%;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
  }

  .cardItemBar {
    border-radius: 8px;
    background: #fff;
    padding: 2%;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
    margin-top: 1%;
    margin-bottom: 1%;
  }

  .cardHeader {
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .logo {
    width: 30px;
    height: 30px;
    left: 23px;
    bottom: 30px;
    border-radius: 100px;
    background: #fff;
  }

  .cardDesc {
    color: #000;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
  }

  .image-container {
    position: relative;
    display: inline-block;
    /* Or use "block" if you want it to take the full width */
  }

  .image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.5);
    /* Replace with your desired tint color */
    z-index: 1;
    /* Ensure the tint layer is above the image */
  }

.image-container img {
  z-index: 2;
  /* Ensure the image is above the tint layer */
}

/* Hide the scrollbars */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
