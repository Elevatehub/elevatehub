<template>
  <v-layout v-if="isLoadingTopics">
    <v-main class="fullscreen-center">
      <Loading />
    </v-main>
  </v-layout>
  <v-row v-if="!isLoadingTopics">
    <v-col v-for="item in item1" :key="item.url">
      <v-card @click="getUrl(item.url)">
        <img class="card-img-top imagesView" :src="item.image" alt="Card image cap" style="height: 120" />
        <div class="card-body">
          <p class="card-title limit-text cardHeader  px-3">{{ item.description }}</p>
          <div class="card-text limit-text cardDesc px-3">Author: {{ item.title }}</div>
          <p class="card-text px-3" style="padding-bottom: 5%">
            <small class="text-muted">{{ item.days }}</small>
          </p>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <br />
  <v-row>
    <v-col cols="6" v-for="item in item3" :key="item.url">
      <v-card @click="getUrl(item.url)">
        <img class="card-img-top imagesView" :src="item.image" alt="Card image cap" style="height: 120" />
        <div class="card-body">
          <p class="card-title limit-text  cardHeader px-3">{{ item.description }}</p>
          <h5 class="card-text limit-text cardDesc px-3">Author: {{ item.title }}</h5>
          <p class="card-text px-3" style="padding-bottom: 5%">
            <small class="text-muted">{{ item.days }}</small>
          </p>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { topicService } from '@service/topic'
import { bankService } from '@service/bankData'
import { getLinkPreview } from 'link-preview-js'
import Loading from '@components/loading/LoadingComponent.vue'

export default {
  components: {
    Loading
  },
  data() {
    return {
      item1: [],
      item2: [],
      item3: [],
      isLoadingTopics: false,
      currentHash: window.location.hash.replace('#', ''),
    }
  },
  methods: {
    getUrl(url) {
      window.open(url)
    },
    getData() {
      const idPath = window.location.hash.replace('#', '')
      this.getTopics(idPath)
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
        const payloadNews = {
          type: 'News',
          keywords: query
        }
        const dataNews = await bankService.bankPost(payloadNews)
        const sortedItems = dataNews.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        const item1 = sortedItems.splice(0, 3)
        this.item1 = await this.getNews(item1)

        const item3 = sortedItems.splice(0, 20)
        this.item3 = await this.getNews(item3)
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
      }
    },
    getCleanURL(text) {
      const separatorIndex = text.lastIndexOf('Ò')
      if (separatorIndex !== -1) {
        text = text.substring(0, separatorIndex)
      }
      const urlRegex = /(https?:\/\/[^\s'"<>]+)/g
      const matches = text.match(urlRegex)
      return matches ? matches[0] : null
    },
    getLastPathSegment(url) {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      const pathSegments = pathname.split('/')
      return pathSegments[pathSegments.length - 1]
    },
    async getNews(data) {
      const itemsOne = []
      await Promise.all(
        data.map(async (element) => {
          try {
            const dateObj = new Date(element.createdAt)
            const dayName = dateObj.toLocaleString('id-ID', { weekday: 'long' })
            const dayRegular = dateObj.toLocaleString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
            // const data = await getLinkPreview("https://cors-anywhere.herokuapp.com/" + element.url)
            itemsOne.push({
              image: 'https://elevatehubvue.web.app/assets/logo-dark-6cd1efba.png',
              title: element.author,
              description: element.desc,
              url: element.url,
              days: dayName + ', ' + dayRegular,
              createdAt: element.createdAt
            })
          } catch (error) {
            if (error instanceof DOMException && error.name === "SecurityError") {
              // Handle CORS-related error
              console.log("CORS Error: Unable to fetch data from this URL due to CORS restrictions.");
            } else {
              // Handle other types of errors
              console.log("An error occurred while fetching the link preview:", error);
            }
          }
        })
      )
      const sortedItems = itemsOne.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return sortedItems // Return the sorted items.
    }
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
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.cardHeaderWhite {
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.cardDescWhite {
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
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

.imagesView {
  height: 150px;
  width: 100%;
  background-size: cover;
}

.imagesViewBig {
  height: 300px;
  width: 100%;
  background-size: cover;
}

.limit-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
