<template>
    <v-main>
        <v-container style="padding: 5%;">
            <p class="font-weight-medium text-center text-h3 px-1">
                Terjangkau untuk semua orang!
            </p>
            <p class="font-weight-medium text-center text-h8 py-5">
                Pilih sesuai kebutuhan anda, Jangkau Kebutuhan Bersama
                Kami
            </p>
            <v-row>
                <v-col v-for="(pricing, index) in pricingTable" :key="index">
                    <v-card style="padding: 10%;width: fit-content;justify-content: center; align-items: center;">
                        <v-col class="font-weight-medium text-center ">
                            <p class="font-weight-medium text-center text-h5">
                                {{ pricing.fullName }}
                            </p>
                            <p class="font-weight-bold text-center text-h4 py-3">
                                {{ 'IDR ' + pricing.balance / 1000 + ' K' }}
                            </p>
                            <v-col class="d-flex align-center justify-center">
                                <v-row color="primary" class="center-item">
                                    <v-icon icon="mdi-face-agent" size="20"></v-icon>
                                    <p class="font-weight-medium text-center text-subtitle-2 px-1">
                                        24/7 Dukungan Ahli
                                    </p>
                                </v-row>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                                <v-row color="primary" class="center-item">
                                    <v-icon icon="mdi-select-group" size="20"></v-icon>
                                    <p class="font-weight-medium text-center text-subtitle-2 px-1">
                                        Mendukung Hingga {{ pricing.threads }} Entity
                                    </p>
                                </v-row>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                                <v-row color="primary" class="center-item">
                                    <v-icon icon="mdi-clipboard-text-search" size="20"></v-icon>
                                    <p class="font-weight-medium text-center text-subtitle-2 px-1">
                                        Mendukung Hingga {{ pricing.keywords }} Keyword
                                    </p>
                                </v-row>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                                <v-row color="primary" class="center-item">
                                    <v-icon icon="mdi-access-point" size="20"></v-icon>
                                    <p class="font-weight-medium text-center text-subtitle-2 px-1">
                                        Bebas akses kapan saja
                                    </p>
                                </v-row>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                                <v-row color="primary" class="center-item">
                                    <v-icon icon="mdi-wrench" size="20"></v-icon>
                                    <p class="font-weight-medium text-center text-subtitle-2 px-1">
                                        Berlaku 1 Bulan
                                    </p>
                                </v-row>
                            </v-col>
                            <v-col cols="auto">
                                <v-dialog transition="dialog-top-transition" max-width="900">
                                    <template v-slot:activator="{ props }">
                                        <v-btn color="purple" v-bind="props"
                                            @click="openModal(pricing.title, pricing.nominal, pricing._id)">Beli
                                            Sekarang</v-btn>
                                    </template>
                                    <template v-slot:default="{ isActive }" v-if="!loadingPayment">
                                        <v-toolbar color="primary" title="Pilih Metoda Pembayaran"></v-toolbar>
                                        <v-card style="width: 100%;">
                                            <v-divider></v-divider>
                                            <v-card-text style="height: 300px;">
                                                <v-radio-group v-model="selector" column
                                                    v-for="(pricings, index) in getPayment" :key="index">
                                                    <v-radio :label="pricings.paymentName"
                                                        :value="pricings.paymentMethod"></v-radio>
                                                </v-radio-group>
                                            </v-card-text>
                                        </v-card>
                                        <v-toolbar color="white">
                                            <v-card-actions class="justify-end">
                                                <v-btn variant="tonal" color="purple"
                                                    @click="pushSubscribe();">Lanjut</v-btn>
                                            </v-card-actions>
                                        </v-toolbar>
                                    </template>
                                    <template v-if="loadingPayment">
                                        <v-card class="center-item py-10">
                                            <Loading />
                                            <p class="font-weight-medium text-center text-subtitle-2 px-1">
                                                Mohon Menunggu Sampai
                                            </p>
                                            <p class="font-weight-medium text-center text-subtitle-2 px-1">
                                                Invoice Pembayaran Muncul
                                            </p>
                                            <p class="font-weight-medium text-center text-subtitle-2 px-1">
                                                (Pembayaran berhasil? Silahkan refresh halaman ini)
                                            </p>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </v-col>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { paymentService } from '../../service/payment'
import Loading from '../../components/loading/LoadingComponent.vue'
export default {
    components: {
        Loading
    },
    data() {
        return {
            pricingTable: [],
            pricingText: {
                title: String,
                value: String,
                id: String
            },
            getPayment: [],
            selectedPayment: '',
            phonenumber: '-',
            errors: {
                selectedPayment: '',
                phonenumber: ''
            },
            loading: false,
            isActiveModal: true,
            selector: '',
            loadingPayment: false
        }
    },
    methods: {
        async openModal(title, value, id) {
            this.pricingText.title = title
            this.pricingText.value = value
            this.pricingText.id = id
            this.loadingPayment = false
        },
        async getPayments() {
            try {
                const data = await paymentService.subscription()
                this.pricingTable = data
            } catch (error) {
                this.$router.push('/login')
            } finally {
                this.loadingMem = false
            }
        },
        async pushSubscribe() {
            this.loadingPayment = true
            const payload = {
                paymentMethod: this.selector,
                phoneNumber: this.phonenumber,
                idSubscription: this.pricingText.id
            }
            try {
                const data = await paymentService.paymentOrder(payload)
                if (data && data.paymentUrl) {
                    const url = data.paymentUrl
                    window.open(url, '_blank')
                }
            } catch (error) {
                console.error('Error logging in:', error)
            } finally {
                this.isLoading = false
            }
        },

        async getPaymentMethod() {
            this.isLoading = true
            try {
                const data = await paymentService.getPaymentMethod()
                this.getPayment = data.paymentFee

            } catch (error) {
                console.error('Error verify in:', error)
            } finally {
                this.isLoading = false
            }
        },
    },
    created() {
        this.getPayments()
        this.getPaymentMethod()
    }
}
</script>

<style>
.center-item {
    display: flex;
    align-items: center;
    justify-content: center;
}

.fullscreen-center {
}
</style>
