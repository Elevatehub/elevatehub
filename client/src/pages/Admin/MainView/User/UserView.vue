<template>
    <!-- <v-row>
        <v-select variant="outlined" v-model="searchField" label="Filter" :items="['fullName', 'email']"></v-select>
        <div style="width: 5%;" />
        <v-text-field v-model="searchValue" label="Search" variant="outlined"></v-text-field>
    </v-row> -->
    <div>User Aktif</div>
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
                Block
                </v-btn>
                <v-btn
                    class="ma-2"
                    color="green"
                    @click="asAdmin(item)"
                >
                TO Admin
                </v-btn>
            </div>
        </template>    
    </EasyDataTable>
</template>

<script>
import { userService } from '@service/user';
export default {
    data() {
        return {
            searchField: "",
            searchValue: "",
            headers: [
                { text: "fullName", value: "fullName", sortable: true },
                { text: "email", value: "email", sortable: true },
                { text: "imagePhoto", value: "imagePhoto" },
                { text: "actions", value: "id" }

            ],
            items: []
        }
    },
    methods: {
        async deleteItem(items) {
            const payload = {
                isActive: false
            }
            try {
                await userService.disableUser(items._id, payload)
                this.getData()
            } catch (error) {
                // this.$router.push('/login')
            } finally {
                this.loadingVer = false
            }
        },
        async asAdmin(items) {
            const payload = {
                isActive: true,
                idRole: "64ae4b548fe7d20417e6f1d6"
            }
            try {
                await userService.disableUser(items._id, payload)
                this.getData()
            } catch (error) {
                // this.$router.push('/login')
            } finally {
                this.loadingVer = false
            }
        },
        async getData() {
            try {
                const data = await userService.userLogin()
                const filter = data.filter((items) => items.isActive === true && items.idRole === '64ae4b5c8fe7d20417e6f1d8')
                this.items = filter
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