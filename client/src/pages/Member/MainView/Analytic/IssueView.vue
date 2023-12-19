<template>
  <v-layout v-if="isLoadingTopics">
    <v-main class="fullscreen-center">
      <Loading />
    </v-main>
  </v-layout>
  <table class="table table-bordered" v-if="!isLoadingTopics">
    <thead>
      <tr>
        <th>Trend Name</th>
        <th>Appear Date</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr v-for="i in 10" :key="i" v-if="isLoadingTopics">
        <td>
          <Skeletor height="20"></Skeletor>
        </td>
        <td>
          <Skeletor height="20"></Skeletor>
        </td>
      </tr> -->
      <tr v-for="item in item3" :key="item._id">
        <td>{{ item.title }}</td>
        <td>{{ formatDate(item.createdAt) }}</td>
      </tr>
    </tbody>
  </table>
  <br />
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
      isLoadingTopics: false,
      topics: null,
      item3: []
    }
  },
  methods: {
    formatDate(inputDate) {
      const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
      ]

      const date = new Date(inputDate)
      const day = date.getDate()
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      const hours = date.getHours()
      const minutes = date.getMinutes()

      return `${day} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
    },
    async getAllTopics() {
      this.isLoadingTopics = true
      try {
        const data = await topicService.topicGet()
        const mergedResult = {}
        for (const item of data) {
          const detailedData = await topicService.topicGetId(item.id)
          const result = await this.getBankData(detailedData.query.split(','))

          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              if (!mergedResult[key]) {
                mergedResult[key] = []
              }
              mergedResult[key] = mergedResult[key].concat(result[key])
            }
          }
        }

        const newArray = Object.values(mergedResult).flat()

        this.item3 = newArray
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

        return sortedItems.splice(0, 10)
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
            const data = await getLinkPreview(element.url)
            const dateObj = new Date(element.createdAt)
            const dayName = dateObj.toLocaleString('id-ID', { weekday: 'long' })
            const dayRegular = dateObj.toLocaleString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })

            itemsOne.push({
              image: data.images[0],
              title: data.title,
              description: data.description,
              url: data.url,
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
