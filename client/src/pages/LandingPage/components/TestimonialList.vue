<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="testimonial-slider">
                <div class="testimonial-slider__container">
                    <div class="testimonial-slider__wrapper">
                        <swiper :speed="800" :loop="true" :slidesPerView="1" :spaceBetween="30"
                            :pagination="swiperOptions.pagination" :breakpoints="swiperOptions.breakpoints">
                            <swiper-slide v-for="item in abouts" :key="item.id">
                                <v-card style="display: flex; justify-content: center; align-items: center; height: 40vh;">
                                    <v-col class=" font-weight-medium text-center ">
                                        <img :src="item.image" class="img rounded-circle p-1" alt="image"
                                            style="width: 10vh" />
                                        <p class=" font-weight-medium text-center">
                                            {{ item.header }}
                                        </p>
                                        <div style="font-size: 10px">
                                            {{ item.value }}
                                        </div>
                                    </v-col>
                                </v-card>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-1 section-space--mt_60 text-center"></div>
            </div>
        </div>
    </div>
</template>

<script>
import SwiperCore, { Pagination } from 'swiper/core'
import { Swiper, SwiperSlide } from 'swiper/vue';
SwiperCore.use([Pagination])

export default {
    props: ['data'],
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            abouts: this.data,
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    1499: {
                        slidesPerView: 1
                    },

                    991: {
                        slidesPerView: 1
                    },

                    767: {
                        slidesPerView: 1

                    }
                }
            }
        }
    }
}
</script>
