<template>
  <v-layout v-if="isLoadingTopics">
    <v-main class="fullscreen-center">
      <Loading />
    </v-main>
  </v-layout>
  <div class="row">
    <div class="col-12" v-for="(item, i) in topics" :key="i" v-if="!isLoadingTopics">
      <div class="cardItemBar">
        <h5>{{ item.header }}</h5>
        <Trend :labels="Object.keys(item.DateType).slice(-5)" :sentiment="item.Sentiment.map(({ name, data }) => ({
          name,
          data: data.slice(-5)
        }))
          " />
      </div>
    </div>
  </div>
</template>

<script>
import { topicService } from '@service/topic'
import Trend from './components/Trend.vue'
import Loading from '@components/loading/LoadingComponent.vue'

export default {
  components: {
    Trend,
    Loading
  },
  data() {
    return {
      topics: null,
      isLoadingTopics: false
    }
  },
  methods: {
    async getAllTopics() {
      this.isLoadingTopics = true
      try {
        const data = await topicService.topicGet()
        this.topics = data
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
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
