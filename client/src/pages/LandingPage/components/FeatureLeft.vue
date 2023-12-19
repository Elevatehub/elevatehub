<template>
    <div class="feature-icon-list">
        <div class="row">
            <div class="col-lg-6">
                <div class="feature-icon-list__media wow move-up">
                    <img :src="data.icon" class="img-fluid" alt="">
                </div>
            </div>
            <div class="col-lg-6">
                <div class="feature-icon-list__content">
                    <div class="feature-icon-list-wrapper">
                        <div class="single-feature-icon wow move-up">
                            <div class="single-feature-icon__media">
                                <!-- <img :src="data.icon" class="img-fluid" alt=""> -->
                            </div>
                            <div class="single-feature-icon__content">
                                <h6 class="title">{{ data.header }}</h6>
                                <div class="text">{{ data.value }}</div>
                            </div>
                        </div>
                    </div>
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
            features: this.data
        }
    }
}
</script>
