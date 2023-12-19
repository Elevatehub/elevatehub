<template>
  <v-layout v-if="isLoadingTopics">
    <v-main class="fullscreen-center">
      <Loading />
    </v-main>
  </v-layout>
  <h5>Analisis Topic</h5>
  <br />
  <EasyDataTable v-if="!isLoadingTopics" :rows-per-page="10" show-index border-cell buttons-pagination :headers="headers" :items="items"
    :search-field="searchField" :search-value="searchValue">
    <template #item-url="{ url, image }">
      <div class="player-wrapper">
        <img @click="getUrl(url)" :src="image" class="img rounded-circle p-6" alt="image" style="width: 5% ; margin: 0; padding: 0;" />
      </div>
    </template>
    <template #item-sentiment="{ sentiment }">
      <div class="player-wrapper">
        <div v-if="sentiment === 'Netral'" class="bg-primary text-center rounded text-white">{{ sentiment }}
        </div>
        <div v-if="sentiment === 'Positive'" class="bg-green text-center rounded text-white">{{ sentiment
        }}
        </div>
        <div v-if="sentiment === 'Negative'" class="bg-red text-center rounded text-white">{{ sentiment }}
        </div>
      </div>
    </template>
  </EasyDataTable>
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
      data: [],
      searchField: "",
      searchValue: "",
      headers: [
        { text: "Image", value: "url", sortable: true },
        { text: "Penerbit", value: "author", sortable: true },
        { text: "Penjelasan", value: "description", sortable: true },
        { text: "Waktu", value: "days", sortable: true },
        { text: "Sentimen", value: "sentiment" }
      ],
      items: [],
      currentHash: window.location.hash.replace('#', ''),
      isLoadingTopics: false,
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
        this.items = await this.getNews(sortedItems)
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
            // const data = await getLinkPreview(element.url)
            const dateObj = new Date(element.createdAt)
            const dayName = dateObj.toLocaleString('id-ID', { weekday: 'long' })
            const dayRegular = dateObj.toLocaleString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
            // const data = await getLinkPreview("https://cors-anywhere.herokuapp.com/" + element.url)
            itemsOne.push({
              author: element.author,
              image: 'https://elevatehubvue.web.app/assets/logo-dark-6cd1efba.png',
              title: element.title,
              sentiment: element.sentiment,
              description: element.desc,
              url: element.url,
              days: dayName + ', ' + dayRegular,
              createdAt: element.createdAt
            })
          } catch (error) {
            console.error(error)
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
.cardHeader {
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>
