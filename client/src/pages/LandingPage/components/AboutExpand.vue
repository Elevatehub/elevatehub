<template>
    <div class="row box-image-wrapper">
      <div v-for="(about, index) in abouts" :key="index" class="col-md-4 box-image position-relative text-center wow move-up">
        <div class="box-image__media">
          <img :src="about.icon" class="img-fluid" alt="about icon">
        </div>
        <div class="box-image__content">
          <h6 class="box-image__title"><a href="#" class="stretched-link">{{ about.header }}</a></h6>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import aerolandBrandingBoxImage01 from '@assets/img/box-image/aeroland-branding-box-image-01-180x180.png';
  // import aerolandBrandingBoxImage02 from '@assets/img/box-image/aeroland-branding-box-image-02-180x180.png';
  // import aerolandBrandingBoxImage03 from '@assets/img/box-image/aeroland-branding-box-image-03-180x180.png';
  
  export default {
    props: ['data'],
    name: 'AboutExpand',
    data() {
      return {
        abouts: this.data.child
      }
    }
  }
  </script>
  