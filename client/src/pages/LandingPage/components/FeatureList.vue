<template>
    <div class="feature-icon-list">
        <div class="row">
            <div class="col-lg-6">
                <div class="feature-icon-list__content">
                    <div class="feature-icon-list-wrapper">
                        <div v-for="(feature, index) in features" :key="index" class="single-feature-icon wow move-up">
                            <div class="single-feature-icon__media">
                                <img :src="feature.icon" class="img-fluid" alt="">
                            </div>
                            <div class="single-feature-icon__content">
                                <h6 class="title">{{ feature.header }}</h6>
                                <div class="text">{{ feature.value }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="feature-icon-list__media wow move-up">
                    <img src="@assets/img/hero/hero-sass/sass-thumb-1.png" class="img-fluid" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import aerolandBrandingBoxImage01 from '@assets/img/icons/aeroland-branding-box-image-01-1.png';
// import aerolandBrandingBoxImage02 from '@assets/img/icons/aeroland-branding-box-image-02-1.png';
// import aerolandBrandingBoxImage03 from '@assets/img/icons/aeroland-app-showcase-box-icon-image-02.png';
export default {
    props:['data'],
    data() {
        return {
            features: this.data.child
        }
    }
}
</script>
