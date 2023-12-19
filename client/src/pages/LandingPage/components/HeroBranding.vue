<template>
  <section class="hero-branding bg-cover" :style="bgImg" id="home">
    <div class="container-fluid container-fluid--cp-150">
      <div class="hero-branding">
        <div class="hero-content">
          <h2 class="h1 hero-content-title">{{ data.header }}</h2>
          <h6 class="hero-content-subtitle mt-20">{{ data.description }}</h6>
          <div class="slider-button mt-30">
            <router-link to="/register" class="ht-btn ht-btn-md mt-5">Daftar Sekarang</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import aerolandBrandingBoxImage01 from '@assets/img/hero/branding/branding.jpg';

export default {
  props: ['data'],
  data() {
    return {
      bgImg: {
        backgroundImage: `url(${this.data.image})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variabls.scss';
@import '../../../assets/scss/elements/hero-branding.scss';
</style>
