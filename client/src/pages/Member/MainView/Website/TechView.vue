<template>
    <v-row class="sticky-bottom">
        <v-col cols="12" style="align-items: center; text-align: center;">
            <form v-on:submit="onSearch">
                <v-row style="align-items: center;">
                    <v-col>
                        <InputComponent label="Web Kompetitor cth: microsoft.com,apple.com" placeholder="Tulis disini..."
                            v-model="keyword" variant="outlined" />
                    </v-col>
                    <v-btn color="purple" type="submit" style="height: 45px" :loading="isLoading"
                        :disabled="isLoading">Search</v-btn>
                </v-row>
            </form>
        </v-col>
    </v-row>
    <v-card class="mx-auto">
        <v-container>
            <v-row v-for="data in result">
                <v-col cols="12">
                    <v-card color="#1F7087" theme="dark">
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title class="text-h5">
                                    {{ data.SiteName }}
                                </v-card-title>

                                <v-card-title>{{ data.categories[0] }}</v-card-title>
                                <v-card-subtitle>Name {{ data.name }}</v-card-subtitle>
                                <v-card-subtitle>Website Sumber {{ data.website }}</v-card-subtitle>
                            </div>

                            <v-avatar class="ma-3" size="125" rounded="0">
                                <v-img :src="data.LargeScreenshot"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import InputComponent from '@components/input/InputComponent.vue'
import { websiteService } from '@service/website'

export default {
    name: 'WebAnalyts',
    components: {
        InputComponent,
    },
    data() {
        return {
            isLoading: false,
            keyword: '',
            result: []
        }
    },
    methods: {
        async onSearch(e) {
            this.isLoading = true
            e.preventDefault()
            const payload = {
                keyword: e.target[0].value.split(',')
            }
            try {
                const response = await websiteService.websitetechup(payload)
                this.result = response
            } catch (error) {
                console.error('Error logging in:', error)
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>