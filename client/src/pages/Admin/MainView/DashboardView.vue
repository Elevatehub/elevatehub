<script setup>
    import { ref } from 'vue'
    const color = ref('indigo')
</script>

<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col
                v-for="(variant, i) in variants"
                :key="i"
                cols="auto"
            >
                <v-card
                class="mx-auto"
                max-width="344"
                :color="color"
                :variant="variant.color"
                width="300"
                >
                <v-card-item>
                    <div class="text-overline mb-1" >
                        {{ variant.title }}
                    </div>
                    <div class="text-h6 mb-1">
                        {{variant.jumlah}}
                    </div>
                </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>



<script>
    import { subscriberService } from '@service/subscriber';
    import { userService } from '@service/user';
    import { topicService } from '@service/topic'
    import { paymentService } from '@service/payment'

    export default {
        data() {
            return {
                variants:[]
            }
        },
        methods: {
            async getData() {
                try {
                    
                    const subsAktif = await subscriberService.subscriberPostAktif()
                    const subsNonAktif = await subscriberService.subscriberPostNonAktif()
                    const user = await userService.userLogin()
                    const allKeyword = await topicService.topicAllKeyword()
                    const allEntity = await topicService.topicAllEntity()
                    const payment = await paymentService.getPaymentAllUser()
                    var totalpayment = 0;
                    for (var i = 0; i < payment.length; i++) {
                        var amount = parseInt(payment[i].amount);
                        if (!isNaN(amount)) {
                            totalpayment += amount;
                        }
                    }


                    const NonAktif = subsNonAktif.filter((items) => new Date(items.endDate) < new Date())
                    this.variants = [
                        {   
                            color: 'elevated',
                            title: 'User Terdaftar',
                            jumlah: this.formatNumberWithCommas(user.length)
                        },
                        {   
                            color: 'elevated',
                            title: 'Total Pendapatan',
                            jumlah: "Rp " + this.formatNumberWithCommas(totalpayment)
                        }  ,
                        {   
                            color: 'elevated',
                            title: 'Subscriber Aktif',
                            jumlah: this.formatNumberWithCommas(subsAktif.length)
                        },
                        {   
                            color: 'elevated',
                            title: 'Subscriber Non-Aktif',
                            jumlah: this.formatNumberWithCommas(NonAktif.length)
                        },
                        {   
                            color: 'elevated',
                            title: 'Total Entity',
                            jumlah: this.formatNumberWithCommas(allEntity.length)
                        },
                        {   
                            color: 'elevated',
                            title: 'Total Keyword',
                            jumlah: this.formatNumberWithCommas(allKeyword.length)
                        }    
                    ]
                } catch (error) {
                    // this.$router.push('/login')
                } finally {
                    this.loadingVer = false
                }
            },
            formatNumberWithCommas(number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        },
        created() {
            this.getData()
        }
    };
</script>

<style>
.centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    /* Adjust to your needs */
}
</style>