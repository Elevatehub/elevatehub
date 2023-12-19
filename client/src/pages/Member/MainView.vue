<template>
  <v-card>
    <v-layout v-if="main && !loadingMem && !loadingVer">

      <v-navigation-drawer class="no-shadow" theme="light" rail v-model="main" permanent color="#2E3840">
        <img width="50" src="@assets/logo/logo-dark.png" alt="logo" />

        <v-list density="compact" nav>
          <v-tooltip text="Search">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" v-on:click="toggleDrawer('search')">
                <v-icon color="white">mdi-nfc-search-variant</v-icon></v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="Trend and Topic">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" @click="toggleDrawer('topic')"><v-icon
                  color="white">mdi-newspaper</v-icon></v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="Comparison">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" @click="toggleDrawer('comparison')"><v-icon
                  color="white">mdi-scale-balance</v-icon></v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="Analytic">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" @click="toggleDrawer('analytic')"><v-icon
                  color="white">mdi-chart-line</v-icon></v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="Bisnis Insight & Intelegence">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" @click="toggleDrawer('bii')">
                <v-icon color="white">mdi-domain</v-icon></v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="Website Analytic">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" @click="toggleDrawer('website')"><v-icon
                  color="white">mdi-web-sync</v-icon></v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="Member Area">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" @click="toggleDrawer('setting')"><v-icon
                  color="white">mdi-wrench</v-icon></v-list-item>
            </template>
          </v-tooltip>
        </v-list>
      </v-navigation-drawer>

      <SideBar :color="color" :topic="topic" :comparison="comparison" :analytic="analytic" :bii="bii" :website="website"
        :setting="setting" />
      <v-app-bar scroll-threshold="0" class="no-shadow" color="#4E6E81">
        <a class="px-5 text-white">Hai, {{ JSON.parse(username) }}</a>
      </v-app-bar>

      <v-main>
        <div class="fullscreen">
          <keep-alive>
            <router-view :key="$route.path" />
          </keep-alive>
        </div>
      </v-main>
    </v-layout>
    <v-layout v-if="!main">
      <v-app-bar scroll-threshold="0">
        <img width="50" src="@assets/logo/logo-dark.png" alt="logo" />
        <a class="px-5">Hai, {{ JSON.parse(username) }}</a>
      </v-app-bar>
      <MemberShip />
    </v-layout>
    <v-layout v-if="loadingMem || loadingVer">
      <v-main class="fullscreen-center">
        <Loading />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style>
.no-shadow {
  box-shadow: none;
}

.fullscreen-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.fullscreen {
  /* background-color: #F9DBBB; */
  border: none;
  box-shadow: none;
  padding: 5%;
}
</style>

<style>
.content {
  text-align: left;
  padding: 2%;
}
</style>

<script>
import SideBar from './SideBar.vue'
import Loading from '@components/loading/LoadingComponent.vue'
import MemberShip from '@components/membership/MembershipComponent.vue'

import { authService } from '@service/auth'
import { paymentService } from '@service/payment'
export default {
  components: {
    SideBar,
    Loading,
    MemberShip
  },
  data() {
    return {
      main: true,
      search: false,
      topic: false,
      comparison: false,
      analytic: false,
      website: false,
      bii: false,
      loadingVer: true,
      loadingMem: true,
      setting: false,
      pricingTable: [],
      color: '#4E6E81',
      username: localStorage.getItem('username')
    }
  },
  methods: {
    async toggleDrawer(data) {
      const properties = ['search', 'topic', 'comparison', 'analytic', 'website', 'bii', 'setting']
      properties.forEach((property) => {
        if (property === data) {
          if (property === 'search') {
            const currentPath = this.$route.path
            const newPath = currentPath.replace(currentPath, '')
            this.$router.push(`${newPath}/${'Member/MainView/Search'}#`)
          }
          return (this[property] = !this[property])
        } else {
          return (this[property] = false)
        }
      })
    },
    async verifySeasons() {
      try {
        await authService.authVerifySession()
      } catch (error) {
        // this.$router.push('/login')
      } finally {
        this.loadingVer = false
      }
    },
    async memberShip() {
      try {
        const data = await paymentService.membership()
        if (data.response.data.message === 'Not have payment') {
          return (this.main = false)
        }
        return data
      } catch (error) {
        // console.log(error)
        // this.$router.push('/login')
      } finally {
        this.loadingMem = false
      }
    },
    async routing() {
      var urlParts = window.location.href.split('/')
      var topicId = urlParts[urlParts.length - 3]
      this.toggleDrawer(topicId)
      this.loadingVer = false
    }
  },
  created() {
    this.memberShip()
    setTimeout(() => {
      // this.verifySeasons()
      this.routing()
    }, 2000)
  },
}
</script>

<style scoped>
.no-shadow.v-app-bar {
  box-shadow: none !important;
  border-bottom-color: grey;
}

.no-shadow.v-navigation-drawer {
  box-shadow: none !important;
  /* border-bottom-color: grey; */
  border: none;
  /* Menghapus border */
  box-shadow: none;
  /* Menghapus shadow */
}

.no-shadow.v-main {
  box-shadow: none !important;
  /* border-bottom-color: grey; */
  border: none;
  /* Menghapus border */
  box-shadow: none;
  /* Menghapus shadow */
}
</style>
