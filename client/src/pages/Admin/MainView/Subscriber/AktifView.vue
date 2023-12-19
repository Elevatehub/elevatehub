<template>
    <div>Subscribtion Aktif</div>
    <br />
    <EasyDataTable :rows-per-page="10" show-index border-cell buttons-pagination :headers="headers" :items="items"
        :search-field="searchField" :search-value="searchValue">
        <template #item-id="item">
            <div class="operation-wrapper">
                <v-btn
                    class="ma-2"
                    color="red"
                    @click="deleteItem(item)"
                >
                Disable
                </v-btn>
            </div>
        </template>
    </EasyDataTable>
</template>

<script>
import { subscriberService } from '@service/subscriber';
import { paymentService } from '@service/payment';

export default {
    data() {
        return {
            searchField: "",
            searchValue: "",
            headers: [
                { text: "fullName", value: "fullName", sortable: true },
                { text: "email", value: "email", sortable: true },
                { text: "subscribtion", value: "subscription", sortable: true },
                { text: "expired", value: "exp" },
                { text: "actions", value: "id" },

            ],
            items: []
        }
    },
    methods: {
        async deleteItem(items) {
            try {
                await paymentService.disableUser(items.id)
                this.getData()
            } catch (error) {
                // this.$router.push('/login')
            } finally {
                this.loadingVer = false
            }
        },
        async getData() {
            try {
                const indonesiaTimeOptions = {
                    timeZone: 'Asia/Jakarta',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                };
                const data = await subscriberService.subscriberPostAktif()
                const filter = data.filter((items) => new Date(items.endDate) < new Date())
                let items = []
                filter.forEach(element => {
                    items.push({
                        fullName: element.user.fullName,
                        email: element.user.email,
                        subscription: element.subscription.fullName,
                        exp: new Date(element.endDate).toLocaleString('en-US', indonesiaTimeOptions),
                        idUser: element.idUser,
                        id: element.id,
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