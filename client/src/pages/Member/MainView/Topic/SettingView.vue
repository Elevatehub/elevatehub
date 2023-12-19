<template>
  <div style="padding: 10%">
    <h1 style="text-align: center" class="modal-title fs-5 py-5" id="exampleModalLabel">
      Data Scraper
    </h1>
    <br />
    <v-form v-model="form" @submit.prevent="saveTopic">
      <v-col cols="12">
        <InputComponent :disable="hide" icon="mdi-account" :model="header" label="Entity ex: (Bahan Makanan)"
          pattern="entity" />
        <InputComponent :disable="hide" icon="mdi-account" :model="query" label="Keywords ex: (jagung,bakar,cabe,merah)"
          pattern="keyword" />
      </v-col>
      <br />
      <br />
      <v-row style="align-items: center; text-align: center">
        <v-btn color="blue" v-if="hide && !scraping" @click="scrapingData()">Scrape Data</v-btn>
        <!-- <LoadingComponent v-if="scraping" /> -->
        <!-- <div class="mx-2" v-if="scraping">Sedang Scraping Data, Mohon Menunggu</div> -->
        <v-btn color="green" v-if="!hide" type="submit" :loading="isLoadingTopics">Simpan</v-btn>
        <v-btn class="mx-2" color="" v-if="!hide" @click="settingPost(false)">Batal</v-btn>
        <v-btn class="mx-2" color="yellow" v-if="hide && !scraping" @click="settingPost()">Update</v-btn>
        <v-btn class="mx-5" color="red" v-if="!hide" @click="deleteData()">Hapus Entity</v-btn>
      </v-row>
    </v-form>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import InputComponent from '@components/input/InputComponent.vue'
import { topicService } from '@service/topic'
import LoadingComponent from '@components/loading/LoadingComponent.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'SearchData',
  components: {
    InputComponent,
    LoadingComponent
  },
  data() {
    return {
      isLoadingTopics: false,
      keyword: '',
      header: '',
      query: '',
      hide: true,
      scraping: false,
      currentHash: window.location.hash.replace('#', ''),
    }
  },
  methods: {
    getData() {
      const idPath = window.location.hash.replace('#', '')
      this.getTopics(idPath)
    },
    settingPost() {
      this.hide = !this.hide
    },
    async deleteData() {
      Swal.fire({
        title: 'Ingin hapus data?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Hapus',
        denyButtonText: `Tidak`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const idPath = window.location.hash.replace('#', '')
          this.isLoadingTopics = true
          try {
            await topicService.deleteId(idPath)
          } catch (error) {
            console.error('Error topic in:', error)
          } finally {
            this.isLoadingTopics = false
            window.location.href = '/Member'
          }
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    },
    async scrapingData() {
      this.scraping = true
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
          keyword: this.query.split(',')
        }
        const data = await topicService.startEngine(payload)
        this.header = data.header
        this.query = data.query
        this.scraping = false
        Swal.fire('Berhasil Scraping Data', '', 'Sekarang anda sudah bisa melihat hasilnya di menu Topik')
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.scraping = false
        window.location.reload()
      }
    },
    async getTopics(idPath) {
      this.isLoadingTopics = true
      try {
        const data = await topicService.topicGetId(idPath)
        this.header = data.header
        this.query = data.query
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
      }
    },
    async saveTopic(e) {
      e.preventDefault()
      this.isLoadingTopics = true
      try {
        const payload = {
          header: e.target[0].value,
          query: e.target[1].value,
          isActive: true
        }
        const idPath = window.location.hash.replace('#', '')
        await topicService.topicUpdateId(idPath, payload)
        window.location.reload()
      } catch (error) {
        console.error('Error topic in:', error)
      } finally {
        this.isLoadingTopics = false
        window.location.reload()
      }
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
      }
    }, 1000);
  }
}
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 10px;
}

.powered {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: -55px;
}

.googleAI {
  height: 100px;
}

.logoEleveted {
  height: 300px;
  width: 300px;
  background-size: cover;
}
</style>

<style scoped>
.main {
  flex: 1 1 auto;
  /* Allow the main content area to grow and take available space */
  display: grid;
  grid-template-columns: 250px 1fr;
  /* Sidebar and body column */
  gap: 10px;
  overflow-y: auto;
  /* Enable scrolling for the main content */
  padding-top: 10px;
  padding-bottom: 10px;
}

.sidebar {
  min-height: 90vh;
  width: 250px;
  padding: 6px 14px;
  background-color: whitesmoke;
  transition: all 0.5s ease;
  color: black;
  border: 1px solid rgb(214, 213, 213);
}

.top-menu {
  margin-top: 5px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  padding-left: 10px;
  font-size: 18px;
  font-weight: 500;
}

.box-plus {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #5945e6;
  font-size: 8px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

i {
  height: 60px;
  line-height: 60px;
  min-width: 50px;
  font-size: 20px;
  text-align: center;
}

#link-arrow {
  font-size: 14px;
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}

.fa-arrow-up {
  opacity: 0.5;
  transform: rotate(180deg);
}

#link-arrow:hover {
  cursor: pointer;
}

.link-items {
  transition: 0.2s;
}

.submenu {
  list-style: none;
  margin-left: 2rem;
  font-size: 12px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.submenu.active {
  max-height: 500px;
}

.submenu i {
  font-size: 16px;
}

.submenu .nav-link.active {
  color: #5945e6;
}

.submenu .nav-link:hover {
  color: #5945e6;
}

.skeletonTopics {
  padding: 10px;
  margin-top: 10px;
}
</style>
