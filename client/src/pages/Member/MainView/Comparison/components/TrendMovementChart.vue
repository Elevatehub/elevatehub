<template>
  <h5 v-if="!isLoadingTrend">Topic Trends</h5>
  <div class="row">
    <!-- <div class="col-12 mt-2" v-if="isLoadingTopics && options.xaxis.categories.length == 0">
      <Skeletor height="250"></Skeletor>
    </div> -->
    <div class="col-12">
      <div class="cardItemBar" v-if="!isLoadingTopics && options.xaxis.categories.length > 0">
        <apexchart width="100%" height="155%" type="area" :options="options" :series="Comparison"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import { topicService } from '@service/topic'
import { bankService } from '@service/bankData'
import { grouping } from '@service/grouping'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['loadingTrend']), // Map the loadingTrend state
    isLoadingTrend() {
      return this.loadingTrend
    }
  },
  data() {
    return {
      topics: null,
      label: [],
      options: {
        labels: [],
        colors: ['#00DFA2', '#3E001F', '#0079FF', '#F11A7B', '#4F200D'],
        chart: {
          id: 'vuechart-example'
        },

        xaxis: {
          categories: []
        }
      },
      Comparison: [
        {
          name: 'Money Investment',
          data: [30, 40, 45, 50]
        },
        {
          name: 'Ayam Geprek',
          data: [30, 3, 45, 10]
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setLoadingTrend']),
    async getAllTopics() {
      this.setLoadingTrend(true)
      try {
        const data = await topicService.topicGet()
        const mergedResult = {}
        this.label = data.map((item) => item.header)
        for (const item of data) {
          const detailedData = await topicService.topicGetId(item.id)
          const result = await this.getBankData(detailedData.query.split(','))
          for (const date in result) {
            if (result.hasOwnProperty(date)) {
              if (!mergedResult[date]) {
                mergedResult[date] = []
              }
              mergedResult[date].push(result[date])
            }
          }
        }

        for (const date in mergedResult) {
          if (mergedResult[date].length <= 1) {
            delete mergedResult[date]
          }
        }
        const result = []

        for (let i = 0; i < this.label.length; i++) {
          const name = this.label[i]
          const data = []

          for (const date in mergedResult) {
            if (mergedResult.hasOwnProperty(date)) {
              data.push(mergedResult[date][i])
            }
          }

          result.push({ name, data })
        }

        const keysArray = Object.keys(mergedResult)

        this.Comparison = result
        this.options.xaxis = {
          categories: keysArray
        }
        this.options.labels = keysArray
      } catch (error) {
        console.error('Error topic in:', error)
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

        const joining = dataTiktok.data.concat(dataInstagram.data, dataFacebook.data, dataGoogleTrends.data)

        return grouping.groupingByDate(joining)
      } catch (error) {
        console.error('Error topic in:', error)
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
