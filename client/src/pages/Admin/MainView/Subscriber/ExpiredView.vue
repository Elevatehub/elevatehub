<template>
    <!-- <v-row>
        <v-select variant="outlined" v-model="searchField" label="Filter" :items="['fullName', 'email']"></v-select>
        <div style="width: 5%;" />
        <v-text-field v-model="searchValue" label="Search" variant="outlined"></v-text-field>
    </v-row> -->
    <div>Subscribtion Expired</div>
    <br />
    <EasyDataTable :rows-per-page="10" show-index border-cell buttons-pagination :headers="headers" :items="items"
        :search-field="searchField" :search-value="searchValue" />
</template>

<script>
import { subscriberService } from '@service/subscriber';
export default {
    data() {
        return {
            searchField: "",
            searchValue: "",
            headers: [
                { text: "fullName", value: "fullName", sortable: true },
                { text: "email", value: "email", sortable: true },
                { text: "subscribtion", value: "subscription", sortable: true },
                { text: "expired", value: "exp" }
            ],
            items: []
        }
    },
    methods: {
        async getData() {
            try {
                const indonesiaTimeOptions = {
                    timeZone: 'Asia/Jakarta',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                };
                const data = await subscriberService.subscriberPostNonAktif()
                let items = []
                data.forEach(element => {
                    items.push({
                        fullName: element.user.fullName,
                        email: element.user.email,
                        subscription: element.subscription.fullName,
                        exp: new Date(element.endDate).toLocaleString('en-US', indonesiaTimeOptions),
                    })
                });
                this.items = items
            } catch (error) {
                // this.$router.push('/login')
            } finally {
                this.loadingVer = false
            }
        },
    },
    created() {
        this.getData()
    }
};
</script>