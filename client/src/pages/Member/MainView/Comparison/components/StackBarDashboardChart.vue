<template>
  <!-- <h5 v-if="!isloadingStackBar">Stack Bar Chart</h5> -->
  <!-- <Skeletor height="250" v-if="isLoadingTopics && options.xaxis.categories.length == 0"></Skeletor> -->
  <apexchart
    type="bar"
    :options="options"
    :series="series"
    v-if="!isloadingStackBar && options.xaxis.categories.length > 0"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['loadingStackBar']),
    isloadingStackBar() {
      return this.loadingStackBar
    }
  },
  props: {
    stackBar: Array
  },
  data() {
    return {
      options: {
        chart: {
          type: 'bar',
          stacked: true
        },
        xaxis: {
          categories: []
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        fill: {
          opacity: 1
        }
      },
      series: [
        {
          name: 'Positive',
          data: [55, 45]
        },
        {
          name: 'Negative',
          data: [15, 19]
        },
        {
          name: 'Netral',
          data: [49, 17]
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setLoadingStackBar']),
    async getData() {
      let data = []
      this.setLoadingStackBar(true)
      await Promise.all(
        this.stackBar.map(async (items) => {
          data.push(items.GroupSentiment)
          this.options.xaxis.categories.push(items.header)
        })
      )
      const combinedArray = data.reduce((acc, innerArray) => acc.concat(innerArray), [])

      // Create a map to group counts by type
      const countsMap = new Map()

      combinedArray.forEach((item) => {
        const { type, count } = item
        if (countsMap.has(type)) {
          countsMap.get(type).push(count)
        } else {
          countsMap.set(type, [count])
        }
      })

      // Convert the map entries into the desired format
      const resultArray = Array.from(countsMap, ([name, data]) => ({ name, data }))
      this.series = resultArray
      this.setLoadingStackBar(false)
      return this.stackBar
    }
  },
  created() {
    setTimeout(() => {
      this.getData()
    }, 2000)
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
