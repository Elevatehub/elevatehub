<template>
    <div class="row brand-logo-wrapper">
        <div v-for="(brand, index) in brands" :key="index" class="col-lg-2 col-md-3 col-sm-4 col-6 brand-logo wow move-up">
            <div class="brand-logo__content">
                <div class="brand-logo__image">
                    <img :src="brand.logo" class="img-fluid" :alt="brand.alt">
                </div>
                <div class="brand-logo__image-hover">
                    <img :src="brand.logoHover" class="img-fluid" :alt="brand.alt">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'BrandLogo',
    data() {
        return {
            abouts: this.data,
            brands: [
                {
                    logo: 'https://i.ibb.co/YX7nwQ9/hipmi.png',
                    logoHover: 'https://i.ibb.co/YX7nwQ9/hipmi.png',
                    alt: 'partner logo'
                },
                {
                    logo: 'https://i.ibb.co/gPtWDRZ/logo-menara-grup.png',
                    logoHover: 'https://i.ibb.co/gPtWDRZ/logo-menara-grup.png',
                    alt: 'partner logo'
                },
                {
                    logo: 'https://menaraoffice.id/wp-content/uploads/2020/03/menara-office-op1-1.png',
                    logoHover: 'https://menaraoffice.id/wp-content/uploads/2020/03/menara-office-op1-1.png',
                    alt: 'partner logo'
                },
                {
                    logo: 'https://i.ibb.co/7QD286y/Logo-ASPEBINDO-06.png',
                    logoHover: 'https://i.ibb.co/7QD286y/Logo-ASPEBINDO-06.png',
                    alt: 'partner logo'
                },
                {
                    logo: 'https://i.ibb.co/gdZR15N/304057310-469506485189549-7436211637205655916-n-removebg-preview.png',
                    logoHover: 'https://i.ibb.co/gdZR15N/304057310-469506485189549-7436211637205655916-n-removebg-preview.png',
                    alt: 'partner logo'
                }

            ]
        }
    },
    methods: {
        getData() {
            let items = []
            this.data.forEach(element => {
                items.push({
                    logo: element.icon,
                    logoHover: element.icon,
                    alt: 'partner logo'
                })
            });
            return this.brands = items
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style scoped>
.brand-logo__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    /* Ensure the content fills the available height */
}

.brand-logo__image,
.brand-logo__image-hover {
    text-align: center;
    /* Center the images horizontally */
}

/* Add any additional styling here */
</style>