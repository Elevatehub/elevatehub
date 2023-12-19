<template>
    <div>
        <h1 class="modal-title fs-5 py-5" id="exampleModalLabel">
            Banner
        </h1>
        <br />
        <v-form v-model="form" @submit.prevent="saveTopic">
            <v-col cols="12">
                <InputComponent :disable="isLoadingTopics" icon="mdi-checkbox-blank-circle" :model="header" label="Header"
                    pattern="Entity" />
                <InputComponent :disable="isLoadingTopics" icon="mdi-checkbox-blank-circle" :model="description"
                    label="Description" pattern="Description" />
                <InputComponent :disable="isLoadingTopics" icon="mdi-checkbox-blank-circle" :model="image" label="Url Image"
                    pattern="URL" />
            </v-col>
            <br />
            <br />
            <v-row style="align-items: center; text-align: center">
                <LoadingComponent v-if="scraping" />
                <div class="mx-2" v-if="scraping">Sedang Scraping Data, Mohon Menunggu</div>
                <v-btn class="mx-2" color="yellow" v-if="hide && !scraping" type="submit">Update</v-btn>
            </v-row>
        </v-form>
        <br />
        <br />
        <br />
    </div>
</template>

<script>
import InputComponent from '@components/input/InputComponent.vue'
import { websiteService } from '@service/website'
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
            image: '',
            header: '',
            description: '',
            hide: true,
            scraping: false,
            id: ''
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
        async getTopics() {
            this.isLoadingTopics = true
            try {
                const data = await websiteService.websiteLogin('1')
                this.header = data.header
                this.description = data.description
                this.image = data.image
                this.id = data._id
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
                    description: e.target[1].value,
                    image: e.target[2].value,
                }
                await websiteService.websiteEdit(this.id, payload)
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
