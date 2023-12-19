<template>
  <v-layout v-if="isLoadingTopics">
    <v-main class="fullscreen-center">
      <Loading />
    </v-main>
  </v-layout>
  <h5>Topic Trends</h5>
  <div class="row">
    <div class="col-6" v-for="(item, i) in topics" :key="i">
      <div class="cardItemBar">
        <div class="cardHeader">{{ item.header }}</div>
        <TopicChart :idPath="item.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { topicService } from '@service/topic'
import { bankService } from '@service/bankData'
import { grouping } from '@service/grouping'
import TopicChart from './components/TopicCharts.vue'
import Loading from '@components/loading/LoadingComponent.vue'

export default {
  components: {
    TopicChart,
    Loading
  },
  data() {
    return {
      topics: null,
      options: {
        labels: ['Positive', 'Netral', 'Negative'],
        colors: ['#00DFA2', '#3E001F', '#0079FF', '#F11A7B', '#4F200D'],
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      sentiment: [
        {
          name: 'positive',
          data: [30, 40, 45, 50]
        },
        {
          name: 'netral',
          data: [30, 3, 45, 10]
        },
        {
          name: 'negative',
          data: [30, 3, 45, 10]
        }
      ]
    }
  },
  methods: {
    async getAllTopics() {
      this.isLoadingTopics = true
      try {
        const data = await topicService.topicGet()
        this.topics = data && data.map((item) => item)
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
      }
    },
    getData() {
      this.getTopics(topics[0])
    },
    async getTopics(idPath) {
      this.isLoadingTopics = true
      try {
        const data = await topicService.topicGetId(idPath)
        this.getBankData(data.query.split(','))
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
      }
    },
    async getBankData(query) {
      try {
        const payloadTiktok = {
          type: 'Tiktok',
          keywords: query
        }
        const payloadInstagram = {
          type: 'Instagram',
          keywords: query
        }
        const payloadFacebook = {
          type: 'Facebook',
          keywords: query
        }
        const payloadGoogleTrends = {
          type: 'News',
          keywords: query
        }
        const dataTiktok = await bankService.bankPost(payloadTiktok)
        const dataInstagram = await bankService.bankPost(payloadInstagram)
        const dataFacebook = await bankService.bankPost(payloadFacebook)
        const dataGoogleTrends = await bankService.bankPost(payloadGoogleTrends)

        const joining = dataTiktok.concat(dataInstagram, dataFacebook, dataGoogleTrends)

        ///set to data chart name of sentiment
        this.options.xaxis = {
          categories: grouping.groupingforTopic(joining).label.map((data) => data.name)
        }
        this.options.labels = grouping.groupingforTopic(joining).label.map((data) => data.name)
        ///
        this.sentiment = grouping.groupingforTopic(joining).data
        ///
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
      }
    }
  },
  created() {
    this.getAllTopics()
    // this.getData()
  }
}
</script>

<style scoped>
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
