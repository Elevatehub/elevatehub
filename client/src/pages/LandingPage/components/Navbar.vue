<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="header-area navbar-light fixed-top" :class="{ 'is-sticky': isSticky }">
    <div class="container-fluid container-fluid--cp-150">
      <nav class="navbar navbar-expand-lg" id="navbar-example2">
        <router-link to="/">
          <img width="100" src="@assets/img/logo/logo-dark.png" alt="logo" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="header-config-wrapper btn-group">
          <!-- <button class="header-config btn" @click="toggleClass('addClass', 'active')">
                        <i class="far fa-search"></i>
                    </button> -->
          <router-link to="/register" class="ht-btn ht-btn--outline hire-btn d-none d-xl-block"
            >Daftar Sekarang</router-link
          >
        </div>

        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="nav main-menu">
            <li class="nav-item">
              <a class="nav-link" href="#home" @click="menuCollapseOnLinkClick">
                <span>Beranda</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about" @click="menuCollapseOnLinkClick">
                <span>Tentang Kami</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#products" @click="menuCollapseOnLinkClick">
                <span>Kebutuhan</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#pricing" @click="menuCollapseOnLinkClick">
                <span>Harga</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#testimonial" @click="menuCollapseOnLinkClick">
                <span>Testimoni</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#partner" @click="menuCollapseOnLinkClick">
                <span>PARTNERS</span>
              </a>
            </li>
            <li class="nav-item d-lg-none">
              <router-link to="/login" class="ht-btn ht-btn--outline hire-btn"
              >Masuk Sekarang</router-link
            >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isSticky: false
    }
  },

  mounted() {
    window.addEventListener('scroll', () => {
      let scroll = window.scrollY
      if (scroll >= 200) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    })
  },

  methods: {
    // offcanvas searchbox
    toggleClass(addRemoveClass, className) {
      const el = document.querySelector('#search-overlay')
      if (addRemoveClass === 'addClass') {
        el.classList.add(className)
      } else {
        el.classList.remove(className)
      }
    },
    menuCollapseOnLinkClick() {
      document.getElementById('navbarSupportedContent').classList.remove('show')
    }
  }
}
</script>
