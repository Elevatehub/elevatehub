<template>
  <!-- <Skeletor height="250" v-if="donutSeries.length == 0"></Skeletor> -->
  <apexchart width="100%" height="170%" type="donut" :options="optionsDonuts" :series="donutSeries"
    v-if="donutSeries.length != 0"></apexchart>
</template>

<script>
import { bankService } from '@service/bankData'
import { topicService } from '@service/topic'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['loadingDonut']), // Map the loadingTrend state
    isLoadingDonut() {
      return this.loadingDonut
    }
  },
  data() {
    return {
      donutSeries: [],
      isLoadingTopics: false,
      optionsDonuts: {
        labels: [],
        colors: ['#4F200D', '#F11A7B']
      }
    }
  },
  methods: {
    ...mapMutations(['setLoadingDonut']),
    async getAllTopics() {
      this.setLoadingDonut(true)
      try {
        const data = await topicService.topicGet()
        for (const i in data) {
          this.optionsDonuts.labels.push(data[i].header)
          const result = await this.getBankData(data[i].query.split(','))
          this.donutSeries.push(result)
        }
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.setLoadingDonut(false)
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
        return joining.length
      } catch (error) {
        console.error('Error topic in:', error)
      }
    }
  },
  created() {
    this.getAllTopics()
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
