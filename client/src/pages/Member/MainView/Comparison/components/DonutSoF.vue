<template>
  <!-- <Skeletor height="250" v-if="sentimentData.length == 0"></Skeletor> -->
  <apexchart
    width="100%"
    height="170%"
    type="donut"
    :options="optionsDonuts"
    :series="sentimentData"
    v-if="sentimentData.length != 0"
  ></apexchart>
</template>

<script>
export default {
  props: {
    labels: Array,
    sentiment: Array
  },
  data() {
    return {
      isLoadingTopics: false,
      sentimentData: [],
      optionsDonuts: {
        labels: [],
        colors: ['#008ffb', '#4F200D', '#F11A7B']
      }
    }
  },
  methods: {
    async getData() {
      this.optionsDonuts.labels = this.labels
      this.sentimentData = this.sentiment
      this.isLoadingTopics = true
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
