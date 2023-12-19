<template>
  <v-container>
    <v-row>
      <v-col v-for="(pricing, index) in pricingTable" :key="index">
        <v-card
          style="padding: 10%;display: flex; justify-content: center; align-items: center;width: fit-content">
          <v-col class=" font-weight-medium text-center ">
            <p class=" font-weight-medium text-center text-h5">
              {{ pricing.fullName }}
            </p>
            <p class="font-weight-bold text-center text-h4 py-3">
              {{ 'IDR ' + pricing.nominal / 1000 + ' K' }}
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
                  <v-btn color="purple" v-bind="props" @click="goTo()">Beli
                    Sekarang</v-btn>
                </template>
                <template v-slot:default="{ isActive }" v-if="!loadingPayment">
                  <v-toolbar color="primary" title="Pilih Metoda Pembayaran"></v-toolbar>
                  <v-card style="width: 100%;">
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;">
                      <v-radio-group v-model="selector" column v-for="(pricings, index) in getPayment" :key="index">
                        <v-radio :label="pricings.paymentName" :value="pricings.paymentMethod"></v-radio>
                      </v-radio-group>
                    </v-card-text>
                  </v-card>
                  <v-toolbar color="white">
                    <v-card-actions class="justify-end">
                      <v-btn variant="tonal" color="purple" @click="pushSubscribe();">Lanjut</v-btn>
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

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Lengkapi Data</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="">
            <!-- <Input
                class="form-control phone"
                label="Phone Number"
                type="number"
                placeholder="Enter phone number"
                v-model="phonenumber"
              />
              <label class="form-label">Phone Number</label> -->
            <div class="form-group">
              <label class="form-label">Payment Method</label>
              <select class="form-control mySelect" v-model="selectedPayment">
                <option value="" disabled>Select an option</option>
                <option v-for="option in getPayment" :key="option.paymentMethod" :value="option.paymentMethod"
                  class="select-option" style="background-image: url(option.paymentImage)">
                  <span class="option-text">{{ option.paymentName }}</span>
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
            Close
          </button>

          <button type="button" class="btn btn-primary" @click="pushSubscribe()">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentService } from '../../../service/payment'
export default {
  name: 'pricingTwo',
  components: {
    // eslint-disable-next-line vue/no-unused-components
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
      loading: false
    }
  },
  methods: {
    goTo() {
      window.location.href = 'Member'
    },
    async getData() {
      this.isLoading = true
      try {
        const data = await paymentService.subscription()
        const item = []
        data.forEach((element) => {
          item.push({
            id: element._id,
            title: element.fullName,
            value: element.balance / 1000000 + ' Jt',
            nominal: element.balance,
            alt: 'Unlimited Fitur',
            button: 'Coba Sekarang',
            isPopular: false,
            active: false,
            price: ['Hubungi Kami', 'Sesuaikan Kebutuhan Anda', '24/7 phone and email support'],
            threads: element.threads,
            keywords: element.keywords
          })
        })
        this.pricingTable = item
      } catch (error) {
        console.error('Error verify in:', error)
      } finally {
        this.isLoading = false
      }
    },
    openModal(title, value, id) {
      this.pricingText.title = title
      this.pricingText.value = value
      this.pricingText.id = id
    },
    closeModal() {
      this.selectedPayment = ''
    },
    async pushSubscribe() {
      this.loading = true
      const payload = {
        paymentMethod: this.selectedPayment,
        phoneNumber: this.phonenumber,
        idSubscription: this.pricingText.id
      }
      try {
        const data = await paymentService.paymentOrder(payload)
        if (data && data.paymentUrl) {
          const url = data.paymentUrl
          window.open(url, '_blank')
          window.location.href = '/Member'
          return window.location.reload()
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
    formattedAmount(amount) {
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(amount)
      return formatted
    }
  },
  created() {
    this.getData()
    this.getPaymentMethod()
  }
}
</script>

<style scoped>
.custom-select {
  position: relative;
}

.custom-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 25px;
}

.option-image {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
}
</style>
