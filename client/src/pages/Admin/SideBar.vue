<template>
    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="subscribers" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Subscriber" />
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item @click="openLink('', 'Admin/MainView/Subscriber/Request')" title="Request"
                value="Permintaan"></v-list-item>
            <v-list-item @click="openLink('', 'Admin/MainView/Subscriber/Aktif')" title="Aktif" value="Aktif"></v-list-item>
            <v-list-item @click="openLink('', 'Admin/MainView/Subscriber/NonAktif')" title="Ekspired"
                value="NonAktif"></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="users" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Pengguna" />
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item @click="openLink('', 'Admin/MainView/User/Pengguna')" title="Pengguna"
                value="Pengguna"></v-list-item>
            <v-list-item @click="openLink('', 'Admin/MainView/User/Prohibited')" title="Pengguna Prohibited"
                value="Prohibited"></v-list-item>
            <v-list-item @click="openLink('', 'Admin/MainView/User/Admin')" title="Administrator"
                value="Admin"></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="websites" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Website Editor" />
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item value="WebAnalyst" title="Banner"
                @click="openLink('', 'Admin/MainView/Website/Banner')"></v-list-item>
            <v-list-item value="Tentang Kami" title="AboutUs"
                @click="openLink('', 'Admin/MainView/Website/AboutUs')"></v-list-item>
            <v-list-item value="Produk dan Layanan" title="Produk dan Layanan"
                @click="openLink('', 'Admin/MainView/Website/Produk')"></v-list-item>
            <v-list-item value="Layanan" title="Layanan"
                @click="openLink('', 'Admin/MainView/Website/Layanan')"></v-list-item>
            <v-list-item value="Testimoni Pelanggan" title="Testimoni Pelanggan"
                @click="openLink('', 'Admin/MainView/Website/Testimoni')"></v-list-item>
            <v-list-item value="Partner" title="Partner"
                @click="openLink('', 'Admin/MainView/Website/Partner')"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer :style="headerStyle" class="no-shadow" :color="color" v-model="settings" permanent>
        <v-list>
            <v-list-item :style="headerStyle" title="Pengaturan" />
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item title="Profile" value="Profile"></v-list-item>
            <v-list-item value="Password" title="Password"></v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn @click="logout()" :loading="scraping" block color="purple" size="large" variant="elevated">
                    Logout
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import { topicService } from '../../service/topic'
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    props: {
        'subscriber': Boolean,
        'user': Boolean,
        'website': Boolean,
        'setting': Boolean,
        'color': String
    },
    data() {
        return {
            subscribers: false,
            users: false,
            search: false,
            websites: false,
            settings: false,
            dialog: false,
            dialogComparison: false,
            topicData: [],
            isLoadingTopics: false,
            scraping: false,
            header: '',
            query: '',
            expanded: true,
            OpenNav: '',
            open: ['Users'],
        };
    },
    computed: {
        headerStyle() {
            return {
                color: 'white', // Change this to your desired text color
            };
        },
    },
    methods: {
        openLink(id, route) {
            this.OpenNav = this.OpenNav === id ? '' : id
            const currentPath = this.$route.path
            const newPath = currentPath.replace(currentPath, '')
            this.$router.push(`${newPath}/${route}#${id}`)
        },
        async getTopics() {
            this.isLoadingTopics = true
            try {
                const data = await topicService.topicGet()
                this.topicData = data
            } catch (error) {
                console.error('Error topic in:', error)
            } finally {
                this.isLoadingTopics = false
            }
        },
        async logout() {
            Swal.fire({
                title: 'Keluar Aplikasi ?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('access_token')
                    window.location.reload()
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        },
    },
    watch: {
        subscriber(newVal) {
            this.subscribers = newVal
        },
        user(newVal) {
            this.users = newVal
        },
        website(newVal) {
            this.websites = newVal
        },
        setting(newVal) {
            this.settings = newVal
        }
    },
    created() {
        this.getTopics()
        // this.interval = setInterval(() => {
        //     var urlParts = window.location.href.split('/');
        //     var topicId = urlParts[urlParts.length - 3];
        //     console.log(topicId)
        // }, 500)
    }
};
</script>

<style scoped>
.no-shadow ::v-deep .v-expansion-panel {
    box-shadow: none;
    /* Remove the shadow */
    border-top: 1px solid #ccc;
    /* Optionally add a border for separation */
}

.no-shadow.v-navigation-drawer {
    box-shadow: none !important;
    border-bottom-color: grey;
    border: none;
    /* Menghapus border */
    box-shadow: none;
    /* Menghapus shadow */
}
</style>