<template>
    <div class="main-container">
        <Navbar />
        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example"
            tabindex="0">
            <HeroBranding :data="data[0]" />

            <div class="box-image-area section-space--ptb_120" id="about">
                <div class="container">
                    <div class="section-title-wrapper text-center section-space--mb_60 wow move-up">
                        <h2 class="section-title mb-15">{{ data[1].header }}</h2>
                        <span class="section-text">{{ data[1].description }}</span>
                    </div>
                </div>
            </div>

            <div class="feature-icon-list-area section-space--pb_120" id="products">
                <div class="container">
                    <div class="section-title-wrapper text-center section-space--mb_100">
                        <h2 class="section-title mb-30">{{ data[2].header }}</h2>
                    </div>
                </div>
                <div v-for="(feature, index) in data[2].child" :key="index">
                    <FeatureLeft :data="feature" v-if="index % 2 === 0" />
                    <br />
                    <FeatureRight :data="feature" v-if="index % 2 === 1" />
                </div>
            </div>
            <RequireList />
            <CurveShape>
                <template v-slot:bgcolor>
                    <path style="fill: #f6f5f9; stroke-miterlimit: 10" d="M3360.5,97.739c-242,0-480-48.375-480-48.375
                          S2647.5,0.5,2400.5,0.5s-480,48.375-480,48.375s-238,48.864-480,48.864s-480-48.375-480-48.375S727.5,0.5,480.5,0.5
                          S0.5,48.875,0.5,48.875V108h1920h1920V48.875C3840.5,48.875,3602.5,97.739,3360.5,97.739z" />
                </template>
            </CurveShape>
            <div class="pricing-table-area bg-gray-2 pt-30" id="pricing">
                <div class="pricing-table-title-area position-relative">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-title-wrapper text-center section-space--mb_60">
                                    <h2 class="section-title font-width-light mb-15 wow move-up">
                                        Terjangkau untuk semua orang!
                                    </h2>
                                    <span class="section-text wow move-up">Pilih sesuai kebutuhan anda, Jangkau Kebutuhan
                                        Bersama Kami</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pricing-table-content-area section-space--pb_90">
                    <div class="container">
                        <Pricing />
                    </div>
                </div>
            </div>
            <div class="testimonial-slider-area section-space--ptb_120 bg-gray" id="testimonial">
                <div class="container">
                    <div class="section-title text-center section-space--mb_60">
                        <h2 class="section-title font-weight--light wow move-up">{{ data[3].header }}</h2>
                        <span class="section-text wow move-up">{{ data[3].description }}</span>
                    </div>
                    <TestimonialList :data="data[3].child" />
                </div>
            </div>

            <div class="brand-logo-area section-space--ptb_120" id="partner">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title-wrapper text-center section-space--mb_60">
                                <h2 class="section-title mb-15 wow move-up">
                                    {{ data[4].header }}
                                </h2>
                                <span class="section-text wow move-up"></span>
                            </div>
                        </div>
                    </div>
                    <BrandLogo :data="data[4].child" />
                </div>
            </div>
            <FooterMain />
            <OffcanvasSearchBox />
        </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import HeroBranding from './components/HeroBranding.vue'
import TestimonialList from './components/TestimonialList.vue'
import FeatureRight from './components/FeatureRights.vue'
import FeatureLeft from './components/FeatureLeft.vue'
import RequireList from './components/RequireList.vue'
import CurveShape from './components/CurveShape.vue'
import Pricing from './components/Pricing.vue'
import BrandLogo from './components/BrandLogo.vue'
import FooterMain from './components/FooterMain.vue'
import OffcanvasSearchBox from './components/OffcanvasSearchBox.vue'

import { landingService } from '../../service/landing'

export default {
    name: 'HomeBranding',
    data: function () {
        return {
            data: []
        }
    },
    components: {
        Navbar,
        HeroBranding,
        FeatureLeft,
        RequireList,
        FeatureRight,
        CurveShape,
        Pricing,
        BrandLogo,
        TestimonialList,
        FooterMain,
        OffcanvasSearchBox
    },
    methods: {
        async getItems() {
            this.isLoading = true
            try {
                const data = await landingService.getData()
                this.data = data
            } catch (error) {
                console.error('Error verify in:', error)
            } finally {
                this.isLoading = false
            }
        }
    },

    created() {
        this.getItems()
    }
}
</script>
