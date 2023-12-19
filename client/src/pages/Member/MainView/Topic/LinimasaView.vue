<template>
    <v-layout v-if="isLoadingTopics">
        <v-main class="fullscreen-center">
        <Loading />
        </v-main>
    </v-layout>
    <v-row v-if="!isLoadingTopics">
        <v-col cols="8">
            <div class="cardItemBar">
                <div class="cardHeader">Trends Sentiment</div>
                <apexchart v-if="loading" width="100%" height="155%" type="line" :options="chartOptions" :series="series">
                </apexchart>
            </div>
        </v-col>
        <v-col>
            <div class="cardItemBar">
                <div class="cardHeader">Date and Range</div>
                <br />
                <v-btn style="margin: 10px;" @click="filterDate(1)">
                    Today
                </v-btn>
                <v-btn style="margin: 10px;" @click="filterDate(2)">
                    Kemarin
                </v-btn>
                <v-btn style="margin: 10px;" @click="filterDate(7)">
                    7 Hari
                </v-btn>
                <v-btn style="margin: 10px;" @click="filterDate(30)">
                    1 Bulan
                </v-btn>
            </div>
        </v-col>
    </v-row>
    <br />
    <div class="cardHeader">News</div>
    <br />

    <v-row>
        <EasyDataTable :rows-per-page="10" show-index border-cell buttons-pagination :headers="headers" :items="news"
            :search-field="searchField" :search-value="searchValue">
            <template #item-sentiment="{ sentiment }">
                <div class="player-wrapper">
                    <div v-if="sentiment === 'Netral'" class="bg-primary text-center rounded text-white">{{ sentiment }}
                    </div>
                    <div v-if="sentiment === 'Positive'" class="bg-green text-center rounded text-white">{{ sentiment }}
                    </div>
                    <div v-if="sentiment === 'Negative'" class="bg-red text-center rounded text-white">{{ sentiment }}
                    </div>
                </div>
            </template>
            <template #item-updatedAt="{ updatedAt }">
                <div class="player-wrapper">
                    <div>{{ new Date(updatedAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            }) }}  
                    WIB</div>
                </div>
            </template>
        </EasyDataTable>
    </v-row>
    <br />

    <div class="cardHeader">Social Media</div>
    <br />

  <v-container>
    <div>Tiktok</div>
    <EasyDataTable :rows-per-page="10" show-index border-cell buttons-pagination :headers="headersSosmed" :items="tiktok"
            :search-field="searchField" :search-value="searchValue">
        <template #item-sentiment="{ sentiment }">
            <div class="player-wrapper">
                <div v-if="sentiment === 'Netral'" class="bg-primary text-center rounded text-white">{{ sentiment }}
                </div>
                <div v-if="sentiment === 'Positive'" class="bg-green text-center rounded text-white">{{ sentiment }}
                </div>
                <div v-if="sentiment === 'Negative'" class="bg-red text-center rounded text-white">{{ sentiment }}
                </div>
            </div>
        </template>
        <template #item-updatedAt="{ updatedAt }">
            <div class="player-wrapper">
                <div>{{ new Date(updatedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        }) }}  
                WIB</div>
            </div>
        </template>
    </EasyDataTable>
  </v-container>
  <v-container>
        <div>Instagram</div>
        <EasyDataTable :rows-per-page="10" show-index border-cell buttons-pagination :headers="headersSosmed" :items="instagram"
            :search-field="searchField" :search-value="searchValue">
        <template #item-sentiment="{ sentiment }">
            <div class="player-wrapper">
                <div v-if="sentiment === 'Netral'" class="bg-primary text-center rounded text-white">{{ sentiment }}
                </div>
                <div v-if="sentiment === 'Positive'" class="bg-green text-center rounded text-white">{{ sentiment }}
                </div>
                <div v-if="sentiment === 'Negative'" class="bg-red text-center rounded text-white">{{ sentiment }}
                </div>
            </div>
        </template>
        <template #item-updatedAt="{ updatedAt }">
            <div class="player-wrapper">
                <div>{{ new Date(updatedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        }) }}  
                WIB</div>
            </div>
        </template>
    </EasyDataTable>
  </v-container>
  <v-container>
        <div>FaceBook</div>
        <EasyDataTable :rows-per-page="10" show-index border-cell buttons-pagination :headers="headersSosmed" :items="facebook"
            :search-field="searchField" :search-value="searchValue">
        <template #item-sentiment="{ sentiment }">
            <div class="player-wrapper">
                <div v-if="sentiment === 'Netral'" class="bg-primary text-center rounded text-white">{{ sentiment }}
                </div>
                <div v-if="sentiment === 'Positive'" class="bg-green text-center rounded text-white">{{ sentiment }}
                </div>
                <div v-if="sentiment === 'Negative'" class="bg-red text-center rounded text-white">{{ sentiment }}
                </div>
            </div>
        </template>
        <template #item-updatedAt="{ updatedAt }">
            <div class="player-wrapper">
                <div>{{ new Date(updatedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        }) }}  
                WIB</div>
            </div>
        </template>
    </EasyDataTable>
  </v-container>
</template>

<script>
import global from '@assets/logoBrand/global.png'
import news from '@assets/logoBrand/news.png'
import facebook from '@assets/logoBrand/facebook.png'
import instagram from '@assets/logoBrand/instagram.png'
import tiktok from '@assets/logoBrand/tiktok.png'
import twitter from '@assets/logoBrand/twitter.png'
import { topicService } from '@service/topic'
import Loading from '@components/loading/LoadingComponent.vue'
import { bankService } from '@service/bankData'

export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoadingTopics: false,
            news: [],
            tiktok: [],
            instagram: [],
            facebook: [],
            loading: true,
            headers: [
                { text: "Penerbit", value: "author", sortable: true },
                { text: "Penjelasan", value: "desc", sortable: true },
                { text: "Waktu", value: "updatedAt", sortable: true },
                { text: "Sentimen", value: "sentiment" }
            ],
            headersSosmed: [
                { text: "Penerbit", value: "author", sortable: true },
                { text: "Penjelasan", value: "desc", sortable: true },
                { text: "Waktu", value: "updatedAt", sortable: true },
                { text: "Sentimen", value: "sentiment" }
            ],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#77B6EA', '#545454', 'red'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Sentiment',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent',], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: [],
                    title: {
                        text: 'Date'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Data'
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            },
            series: [],
            currentHash: window.location.hash.replace('#', ''),
        }
    },
    methods: {
        imageSelector(type) {
            if (type === 'Tiktok') {
                return tiktok
            }
            if (type === 'Instagram') {
                return instagram
            }
            if (type === 'Facebook') {
                return facebook
            }
            if (type === 'News') {
                return news
            }
            if (type === 'All') {
                return global
            }
            if (type === 'Twitter') {
                return twitter
            }
        },
        async getData() {
            const idPath = window.location.hash.replace('#', '')
            this.getTopics(idPath)
            const data = await topicService.topicGetId(idPath)
            const query = data.query.split(',')
            const payloadNews = {
                type: 'News',
                keywords: query
            }
            const dataNews = await bankService.bankPost(payloadNews)
            const sortedItems = dataNews.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            const result = sortedItems
            this.news = result
            this.isLoadingTopics = false
        },
        async getSosmed() {
            try {
                const idPath = window.location.hash.replace('#', '');
                this.getTopics(idPath);
                const data = await topicService.topicGetId(idPath);
                const query = data.query.split(',');
                const payloadNews = {
                    type: 'Tiktok',
                    keywords: query
                };
                const dataNews = await bankService.bankPost(payloadNews);
                const sortedItems = dataNews.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const tiktok = sortedItems.splice(0, 10);
                this.tiktok = tiktok;
            } catch (error) {
                console.error("An error occurred:", error);
                // Handle the error as needed (e.g., show an error message to the user).
            }
        },
        async getInstagram() {
            try {
                const idPath = window.location.hash.replace('#', '');
                this.getTopics(idPath);
                const data = await topicService.topicGetId(idPath);
                const query = data.query.split(',');
                const payloadNews = {
                    type: 'Instagram',
                    keywords: query
                };
                const dataNews = await bankService.bankPost(payloadNews);
                const sortedItems = dataNews.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const instagram = sortedItems.splice(0, 10);
                this.instagram = instagram;
            } catch (error) {
                console.error("An error occurred:", error);
                // Handle the error as needed (e.g., show an error message to the user).
            }
        },
        async getFacebook() {
            try {
                const idPath = window.location.hash.replace('#', '');
                this.getTopics(idPath);
                const data = await topicService.topicGetId(idPath);
                const query = data.query.split(',');
                const payloadNews = {
                    type: 'Facebook',
                    keywords: query
                };
                const dataNews = await bankService.bankPost(payloadNews);
                const sortedItems = dataNews.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const facebook = sortedItems.splice(0, 10);
                this.facebook = facebook;
            } catch (error) {
                console.error("An error occurred:", error);
                // Handle the error as needed (e.g., show an error message to the user).
            }
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
                        // const data = await getLinkPreview(element.url)
                        itemsOne.push({
                            image: 'https://elevatehubvue.web.app/assets/logo-dark-6cd1efba.png',
                            title: element.author,
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
        },
        async getTopics() {
            this.isLoadingTopics = true
            try {
                this.loading = false
                const idPath = window.location.hash.replace('#', '')
                const data = await topicService.topicGetId(idPath)
                // const files = []
                this.chartOptions.xaxis.categories = Object.keys(data.DateSentiment).slice(-7)
                this.series = data.Sentiment.map(({ name, data }) => ({
                    name,
                    data: data.slice(-7) // Get the first 5 elements
                }))
                this.loading = true
            } catch (error) {
                console.error('Error topic in:', error)
            } finally {
                this.isLoadingTopics = false
            }
        },
        async filterDate(items) {
            this.loading = false
            const idPath = window.location.hash.replace('#', '')
            const data = await topicService.topicGetId(idPath)
            // const files = []
            this.chartOptions.xaxis.categories = Object.keys(data.DateSentiment).slice(-items)
            this.series = data.Sentiment.map(({ name, data }) => ({
                name,
                data: data.slice(-items) // Get the first 5 elements
            }))
            this.loading = true
        }
    },
    created() {
        this.getData(),
        this.getSosmed(),
        this.getInstagram(),
        this.getFacebook()
    },
    mounted() {
        window.addEventListener('hashchange', this.handleHashChange);
        this.intervalId = setInterval(() => {
        const now = window.location.hash.replace('#', '');
        if(now != this.currentHash){
            this.getData()
            this.currentHash = now
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
