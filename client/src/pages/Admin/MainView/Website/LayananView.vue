<template>
    <div>
        <h1 class="modal-title fs-5 py-5" id="exampleModalLabel">
            Layanan Fitur
        </h1>
        <v-btn class="mx-2" color="yellow" v-if="hide && !scraping" @click="addItem()">Tambah Data</v-btn>
        <br />
        <br />
        <EasyDataTable :rows-per-page="10" show-index border-cell buttons-pagination :headers="headers" :items="items">
            <template #item-operation="item">
                <div class="operation-wrapper">
                    <v-icon color="green" @click="updateItem(item)">mdi-pencil</v-icon>
                    <v-icon color="red" @click="deleteItem(item)">mdi-delete</v-icon>
                </div>
            </template>
        </EasyDataTable>
    </div>
    <v-dialog v-model="dialog" persistent width="500">
        <v-form v-model="form" @submit.prevent="postTopic">
            <v-card style="padding: 5%;">
                <v-card-title>
                    <span class="text-h5">Edit Data</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="string" v-model="fullName" label="Name" required></v-text-field>
                                <v-text-field type="number" v-model="balance" label="Price" required></v-text-field>
                                <v-text-field type="number" v-model="threads" label="Entity" required></v-text-field>
                                <v-text-field type="number" v-model="keywords" label="Keywords" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="saveChildTopic()">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
import InputComponent from '@components/input/InputComponent.vue'
import { subscriberService } from '@service/subscriber'
import { paymentService } from '@service/payment'
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
            dialog: false,
            fullName: '',
            balance: '',
            threads: '',
            keywords: '',
            headers: [
                { text: "Name", value: "fullName", sortable: true },
                { text: "Harga", value: "balance", sortable: true },
                { text: "Entity", value: "threads", sortable: true },
                { text: "Keyword", value: "keywords", sortable: true },
                { text: "Operation", value: "operation" },
            ],
            items: []
        }
    },
    methods: {
        updateItem(data) {
            this.dialog = true
            this.fullName = data.fullName
            this.balance = data.balance
            this.threads = data.threads
            this.keywords = data.keywords
            this.edit = true
            this.id = data._id
        },
        async deleteItem(id) {
            this.isLoadingTopics = true
            try {
                await subscriberService.deleteAktif(id._id)
                window.location.reload()
            } catch (error) {
                console.error('Error topic in:', error)
            } finally {
                this.isLoadingTopics = false
                window.location.reload()
            }
        },
        async addItem() {
            this.isLoadingTopics = true
            this.dialog = true
            this.fullName = ""
            this.balance = ""
            this.threads = ""
            this.keywords = ""
            this.edit = false

        },
        async getData() {
            const data = await paymentService.subscription()
            this.items = data
        },
        settingPost() {
            this.hide = !this.hide
        },
        async saveChildTopic() {
            this.isLoadingTopics = true
            try {
                const payload = {
                    fullName: this.fullName,
                    balance: Number(this.balance),
                    threads: Number(this.threads),
                    keywords: Number(this.keywords),
                    image: "-",
                    keterangan: "-",
                    isActive: true,
                }
                if (this.edit === true) {
                    await subscriberService.updatePostAktif(this.id, payload)
                }
                if (this.edit === false) {
                    await subscriberService.postAktif(payload)
                }
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
