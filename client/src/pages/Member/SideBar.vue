<template>
    <v-navigation-drawer class="no-shadow" :color="color" v-model="topics" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Trend & Topic">
                <template v-slot:append>
                    <v-dialog v-model="dialog" persistent width="500">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" size="large" variant="text" icon="mdi-plus-circle"
                                color="#FF0303"></v-btn>
                        </template>
                        <v-form v-model="form" @submit.prevent="postTopic">
                            <v-card style="padding: 5%;">
                                <v-card-title>
                                    <span class="text-h5">Tambah Entity Data</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field label="Nama Entity ( cth: Makanan )" required></v-text-field>
                                                <v-text-field label="Keywords ( cth: Jagung,Bakar )"
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                        Close
                                    </v-btn>
                                    <v-btn type="submit" color="blue-darken-1" variant="text" @click="dialog = false">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>
                </template>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list v-if="this.topicData.length <= 0">
            <div style="text-align: center;color: aliceblue;">Topic Tidak Tersedia</div>
            <div style="text-align: center;color: aliceblue;">Silahkan Menambahkan Entity Keyword</div>
        </v-list>
        <v-list v-model:opened="open" v-for="(topic) in topicData" :key="topic.id">
            <v-list-group :value="topic.id">
                <template v-slot:activator="{ props }">
                    <v-list-item :style="headerStyle" v-bind="props" :title="topic.header"></v-list-item>
                </template>
                <v-list>
                    <v-list-item :style="headerStyle" title="Dashboard"
                        @click="openLink(topic.id, 'Member/MainView/Topic/DashboardView')"></v-list-item>
                    <v-list-item :style="headerStyle" title="News"
                        @click="openLink(topic.id, 'Member/MainView/Topic/NewsView')"></v-list-item>
                    <v-list-item :style="headerStyle" title="Analysis"
                        @click="openLink(topic.id, 'Member/MainView/Topic/AnalysisView')"></v-list-item>
                    <v-list-item :style="headerStyle" title="Linimasa"
                        @click="openLink(topic.id, 'Member/MainView/Topic/LinimasaView')"></v-list-item>
                    <v-list-item :style="headerStyle" title="Setting"
                        @click="openLink(topic.id, 'Member/MainView/Topic/SettingView')"></v-list-item>
                </v-list>
            </v-list-group>
        </v-list>

        <template v-slot:append>
            <div class="pa-2">
                <v-btn v-if="this.topicData.length > 0" @click="scrapingData()" :loading="scraping" block color="purple"
                    size="large" variant="elevated">
                    SCRAPE
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>

    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="comparisons" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Comparison">
                <template v-slot:append>
                    <v-dialog v-model="dialogComparison" persistent width="500">
                        <!-- <template v-slot:activator="{ props }">
                            <v-btn disabled v-bind="props" size="large" variant="text" icon="mdi-plus-circle"
                                color="#FF0303"></v-btn>
                        </template> -->
                        <!-- <v-form v-model="form" @submit.prevent="postTopic">
                            <v-card style="padding: 5%;">
                                <v-card-title>
                                    <span class="text-h5">Tambah Entity Data</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field label="Nama Entity ( cth: Makanan )" required></v-text-field>
                                                <v-text-field label="Keywords ( cth: Jagung,Bakar )"
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                        Close
                                    </v-btn>
                                    <v-btn type="submit" color="blue-darken-1" variant="text" @click="dialog = false">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form> -->
                    </v-dialog>
                </template>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list v-if="this.topicData.length > 0">
            <v-list-item @click="openLink('', 'Member/MainView/Comparison/DashboardView')" title="Dashboard"
                value="dashboard"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Comparison/ShareView')" title="Share of Voice"
                value="sov"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Comparison/TrendsView')" title="Trends"
                value="trends"></v-list-item>
        </v-list>
        <v-list v-if="this.topicData.length <= 0">
            <div style="text-align: center;">Comparison Tidak Tersedia</div>
            <div style="text-align: center;">Silahkan Menambahkan Entity Keyword</div>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="analytics" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Analytic" />
        </v-list>
        <v-divider></v-divider>
        <v-list v-if="this.topicData.length > 0">
            <v-list-item @click="openLink('', 'Member/MainView/Analytic/TopicView')" title="Topic"
                value="dashboard"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Analytic/IssueView')" title="Issue"
                value="sov"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Analytic/HashtagView')" title="Hashtag"
                value="trends"></v-list-item>
        </v-list>
        <v-list v-if="this.topicData.length <= 0">
            <div style="text-align: center;">Analysis Tidak Tersedia</div>
            <div style="text-align: center;">Silahkan Menambahkan Entity Keyword</div>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="biis" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="AI Bussiness Analyst" />
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item @click="openLink('', 'Member/MainView/Bussiness/CompetitorAnalyst')" title="Competitor Analyst"
                value="Competitor"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Bussiness/PricingPage')" value="Pricing"
                title="Pricing Strategy"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Bussiness/DifferentiationPage')" value="Differentiation"
                title="Differentiation Product"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Bussiness/AdsPage')" value="Ads"
                title="Ads Campaign Strategy"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Bussiness/AnalisaProblemPage')" value="Analisa"
                title="Analisa Problem Market"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Bussiness/AnalisaMarketPage')" value="Market"
                title="Analisa Market Share"></v-list-item>
            <v-list-item @click="openLink('', 'Member/MainView/Bussiness/CompetitorBusinessPage')" value="Business"
                title="Competitor Business"></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="websites" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Website Analyst">
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item @click="openLink(website.id, 'Member/MainView/Website/WebanalystView')" title="Web Analyst"
                value="WebAnalyst"></v-list-item>
            <!-- <v-list-item @click="openLink(website.id, 'Member/MainView/Website/BussinessView')" value="BussinessEkstract"
                title="Bussiness Ekstract"></v-list-item> -->
            <v-list-item @click="openLink(website.id, 'Member/MainView/Website/TechView')" value="TechnologyLookup"
                title="Technology Lookup"></v-list-item>
            <!-- <v-list-item @click="openLink(website.id, 'Member/MainView/Website/SeoView')" value="SEOAudit"
                title="SEO Audit"></v-list-item> -->
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="settings" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Member Area" />
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item @click="openLink(website.id, 'Member/MainView/Pengaturan/Profile')" title="Profile"
                value="Profile"></v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn @click="logout()" :loading="scraping" block color="purple" size="large" variant="elevated">
                    Logout
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import { topicService } from '@service/topic'
import { websiteService } from '@service/website'

import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    props: {
        'topic': Boolean,
        'comparison': Boolean,
        'analytic': Boolean,
        'bii': Boolean,
        'website': Boolean,
        'setting': Boolean,
        'color': String
    },
    data() {
        return {
            topics: false,
            comparisons: false,
            analytics: false,
            biis: false,
            search: false,
            websites: false,
            settings: false,
            dialog: false,
            dialogWebsite: false,
            dialogComparison: false,
            topicData: [],
            websiteData: [],
            isLoadingTopics: false,
            isLoadingWebsite: false,
            scraping: false,
            header: '',
            query: '',
            expanded: true,
            OpenNav: '',
            open: ['Users'],
        };
    },
    computed: {
        headerStyle() {
            return {
                color: 'white', // Change this to your desired text color
            };
        },
    },
    methods: {
        openLink(id, route) {
            this.OpenNav = this.OpenNav === id ? '' : id
            const currentPath = this.$route.path
            const newPath = currentPath.replace(currentPath, '')
            this.$router.push(`${newPath}/${route}#${id}`)
            localStorage.setItem('id',id)
        },
        async getTopics() {
            this.isLoadingTopics = true
            try {
                const data = await topicService.topicGet()
                this.topicData = data
            } catch (error) {
                console.error('Error topic in:', error)
            } finally {
                this.isLoadingTopics = false
            }
        },
        async getWebsite() {
            this.isLoadingWebsite = true
            try {
                const data = await websiteService.websiteGet()
                this.websiteData = data
            } catch (error) {
                console.error('Error topic in:', error)
            } finally {
                this.isLoadingWebsite = false
            }
        },
        async postTopic(e) {
            e.preventDefault()
            this.isLoadingTopics = true
            this.dialog = false
            try {
                const payload = {
                    header: e.target[0].value,
                    query: e.target[1].value.toLowerCase(),
                    isActive: true
                }
                await topicService.topicPost(payload)
                window.location.reload()
            } catch (error) {
                console.error('Error topic in:', error)
            } finally {
                this.isLoadingTopics = false
            }
        },
        async postWebsite(e) {
            e.preventDefault()
            this.isLoadingWebsite = true
            this.dialogWebsite = false
            try {
                const payload = {
                    header: e.target[0].value,
                    query: e.target[1].value.toLowerCase(),
                    isActive: true
                }
                await websiteService.websitePost(payload)
                window.location.reload()
            } catch (error) {
                console.error('Error topic in:', error)
            } finally {
                this.isLoadingWebsite = false
            }
        },
        async scrapingData() {
            this.scraping = true
            const data = this.topicData
            const result = data.map((items) => items.query).join(',').split(',');
            Swal.fire({
                title: 'Sedang Scrape Data',
                allowOutsideClick: false,
                html: 'Kami sedang mengambil informasi dari internet sesuai dengan keyword anda. Mohon tetap di halaman ini hingga scrape selesai',
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                }
            })
            try {
                const payload = {
                    keyword: result
                }
                const data = await topicService.startEngine(payload)
                this.header = data.header
                this.query = data.query
                this.scraping = false
            } catch (error) {
                Swal.fire('Berhasil Scraping Data', '', 'info')
            } finally {
                this.scraping = false
                Swal.fire('Berhasil Scraping Data', '', 'Sekarang anda sudah bisa melihat hasilnya di menu Topik')
            }
        },
        async scrapingDataWeb() {
            this.scraping = true
            const data = this.websiteData
            const result = data.map((items) => items.query).join(',').split(',');
            Swal.fire({
                title: 'Sedang Scraping Data',
                allowOutsideClick: false,
                html: 'Kami sedang mengambil informasi dari internet sesuai dengan keyword anda. Mohon tetap di halaman ini hingga scraping selesai',
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                }
            })
        },
        async logout() {
            Swal.fire({
                title: 'Keluar Aplikasi ?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('access_token')
                    window.location.href = '/login'
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        },
    },
    watch: {
        topic(newVal) {
            this.topics = newVal
        },
        comparison(newVal) {
            this.comparisons = newVal
        },
        analytic(newVal) {
            this.analytics = newVal
        },
        bii(newVal) {
            this.biis = newVal
        },
        website(newVal) {
            this.websites = newVal
        },
        setting(newVal) {
            this.settings = newVal
        }
    },
    created() {
        this.getTopics()
        this.getWebsite()
        // this.interval = setInterval(() => {
        //     var urlParts = window.location.href.split('/');
        //     var topicId = urlParts[urlParts.length - 3];
        //     console.log(topicId)
        // }, 500)
    }
};
</script>

<style scoped>
.no-shadow ::v-deep .v-expansion-panel {
    box-shadow: none;
    /* Remove the shadow */
    border-top: 1px solid #ccc;
    /* Optionally add a border for separation */
}

.no-shadow.v-navigation-drawer {
    box-shadow: none !important;
    border-bottom-color: grey;
    border: none;
    /* Menghapus border */
    box-shadow: none;
    /* Menghapus shadow */
}
</style>