<template>
    <div>Data Diri</div>
    <v-form v-model="form" @submit.prevent="saveTopic">
        <v-col cols="12">
            <InputComponent :disable="hide" icon="mdi-account" :model="nama" label="Nama Lengkap" pattern="entity" />
            <InputComponent :disable="hide" icon="mdi-email" :model="email" label="Email" pattern="email" />
            <InputComponent :disable="hide" icon="mdi-phone" :model="ponsel" label="Nomor Ponsel" pattern="number" />
        </v-col>
        <br />
        <br />
        <v-row style="align-items: center; text-align: center">
            <!-- <LoadingComponent v-if="scraping" /> -->
            <!-- <div class="mx-2" v-if="scraping">Sedang Scraping Data, Mohon Menunggu</div> -->
            <v-btn color="green" v-if="!hide" type="submit" :loading="isLoadingTopics">Simpan</v-btn>
            <v-btn class="mx-2" color="" v-if="!hide" @click="settingPost(false)">Batal</v-btn>
            <v-btn class="mx-2" color="yellow" v-if="hide && !scraping" @click="settingPost()">Update</v-btn>
            <v-btn class="mx-5" color="red" v-if="!hide" @click="deleteData()">Reset Password</v-btn>
        </v-row>
    </v-form>
    <br />
    <br />
    <br />
    <div>Subscriptions</div>
</template>

<script>
import InputComponent from '@components/input/InputComponent.vue'
import { authService } from '@service/auth'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'SearchData',
    components: {
        InputComponent
    },
    data() {
        return {
            isLoadingTopics: false,
            keyword: '',
            nama: '',
            email: '',
            ponsel: '',
            hide: true,
            scraping: false
        }
    },
    methods: {
        settingPost() {
            this.hide = !this.hide
        },
        async deleteData() {
            Swal.fire({
                title: 'Segera Hadir',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
            })
        },
        async getTopics() {
            this.isLoadingTopics = true
            try {
                const data = await authService.authVerifySession()
                // this.email = data.header
                // this.nama = data.query
                // this.ponsel = data.query

            } catch (error) {
                console.error('Error topic in:', error)
            } finally {
                this.isLoadingTopics = false
            }
        },
        async saveTopic() {
        }
    },
    created() {
        this.getTopics()
    }
}
</script>