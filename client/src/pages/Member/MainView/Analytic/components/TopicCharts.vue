<template>
  <apexchart width="100%" height="155%" type="area" :options="options" :series="sentiment"></apexchart>
</template>

<script>
import { topicService } from '@service/topic'
import { bankService } from '@service/bankData'
import { grouping } from '@service/grouping'

export default {
  props: {
    idPath: String
  },
  data() {
    return {
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
  watch: {
    idPath: {
      immediate: true,
      handler(newIdPath) {
        this.getTopics(newIdPath)
      }
    }
  }
}
</script>
