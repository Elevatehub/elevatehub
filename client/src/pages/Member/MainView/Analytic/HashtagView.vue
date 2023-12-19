<template>
  <v-layout v-if="isLoadingTopics">
    <v-main class="fullscreen-center">
      <Loading />
    </v-main>
  </v-layout>
  <div class="my-5">
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
          <ul class="list-group" v-for="name in keyword" :key="name._id">
            <li class="list-group-item">
              <v-row>
                <v-col>{{ name }}</v-col>
              </v-row>
            </li>
          </ul>
        </v-window-item>

        <v-window-item value="three">
          <ul class="list-group" v-for="name in brand" :key="name._id">
            <li class="list-group-item">
              <v-row>
                <v-col>{{ name.author }}</v-col>
              </v-row>
            </li>
          </ul>
        </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>

<script>
import { topicService } from '@service/topic'
import { bankService } from '@service/bankData'
import { grouping } from '@service/grouping'
import Loading from '@components/loading/LoadingComponent.vue'

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoadingTopics: false,
      topics: null,
      hashtag: [],
      keyword: [],
      brand: [],
      tab: null
    }
  },
  methods: {
    async getAllTopics() {
      this.isLoadingTopics = true
      try {
        const data = await topicService.topicGet()
        var arrays = data && data.map((item) => item.query.split(','))
        const mergedArray = [].concat(...arrays)
        const uniqueArray = [...new Set(mergedArray)]
        if (data) {
          this.getBankData(uniqueArray)
        }
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
      }
    },
    async getBankData(query) {
      try {
        const payloadHashTag = {
          keyword: query
        }
        const dataHashTag = await bankService.hashtagPost(payloadHashTag)
        const data = await topicService.topicGet()
        
        var resultKeyword = []
        data.forEach((x) => {
          resultKeyword.push({
            ...x.Keyword
          })
        });
        const mergedObject = Object.assign({}, ...resultKeyword);
        this.keyword = mergedObject

        var resultBrands = []
        data.forEach((x) => {
          resultBrands.push({
            ...x.Brands
          })
        });
        const mergedBrand = Object.assign({}, ...resultBrands);
        this.brand = mergedBrand


        this.hashtag = grouping.groupingHashtag(dataHashTag)
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
