<template>
  <v-layout v-if="isLoadingTrend && isLoadingDonut">
    <v-main class="fullscreen-center">
      <Loading />
    </v-main>
  </v-layout>
  <v-row>
    <v-col cols="12">
      <TrendMovementChart />
    </v-col>
    <v-col cols="4">
      <v-card height="100%">
        <DonutChart :labels="labelDonuts" :sentiment="sentimentDonuts" />
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-card height="100%">
        <StackBarDashboardChart :stackBar="stackBar" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TrendMovementChart from './components/TrendMovementChart.vue'
import DonutChart from './components/DonutChart.vue'
import StackBarDashboardChart from './components/StackBarDashboardChart.vue'
import { topicService } from '@service/topic'
import Loading from '@components/loading/LoadingComponent.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['loadingTrend', 'loadingDonut', 'loadingStackBar']), // Map the loadingTrend state
    isLoadingTrend() {
      return this.loadingTrend
    },
    isLoadingDonut() {
      return this.loadingDonut
    },
    isloadingStackBar() {
      return this.loadingStackBar
    }
  },
  components: {
    TrendMovementChart,
    DonutChart,
    StackBarDashboardChart,
    Loading
  },
  data() {
    return {
      isLoadingTopics: false,
      labelDonuts: [],
      sentimentDonuts: [],
      stackBar: null
    }
  },
  methods: {
    async getAllTopics() {
      try {
        const data = await topicService.topicGet()
        const DonutItems = await this.groupingDonut(data)
        this.labelDonuts = DonutItems.map((data) => data.type)
        this.sentimentDonuts = DonutItems.map((data) => data.count)
        this.stackBar = data
      } catch (error) {
        console.error('Error topic in:', error)
      }
    },
    async groupingDonut(data) {
      const DonutData = await data.map((data) => data.GroupSentiment)
      const resultMap = new Map()
      DonutData.forEach((arr) => {
        arr.forEach((item) => {
          const { type, count } = item
          if (resultMap.has(type)) {
            resultMap.set(type, resultMap.get(type) + count)
          } else {
            resultMap.set(type, count)
          }
        })
      })
      const result = Array.from(resultMap, ([type, count]) => ({ type, count }))
      return result
    }
  },
  created() {
    this.getAllTopics()
  }
}
</script>
