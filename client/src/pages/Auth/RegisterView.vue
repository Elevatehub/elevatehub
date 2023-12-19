<template>
    <div
        style="padding: 10%; display: flex; justify-content: center; align-items: center; height: 100vh; background: radial-gradient(circle, rgba(82,9,121,1) 3%, rgba(0,212,255,1) 100%);">
        <v-card style="padding: 10%;height: 90vh;width: 100%">
            <v-sheet wdth="90%" class="mx-auto" v-if="isLogin">
                <v-form v-model="form" @submit.prevent="login" >
                    <p class="font-weight-black text-center py-3 text-h5" style="width: 20%;">
                    </p>
                    <InputComponent icon="mdi-account" model="" label="Email" pattern="email" variant="outlined" />
                    <br />
                    <InputComponent icon="mdi-wrench" model="" label="Password" pattern="password" variant="outlined" />
                    <p class="font-weight-medium text-right text-subtitle-2" v-on:click="toggleDrawer('isForget')">
                        lupa password?
                    </p>
                    <br />
                    <v-btn :disabled="!form" :loading="loading" block color="purple" size="large" type="submit"
                        variant="elevated">
                        masuk
                    </v-btn>
                    <div class="font-weight-medium text-center py-10 text-subtitle-2">
                        belum punya akun ?
                        <span class="font-weight-bold text-center text-subtitle-2" v-on:click="toggleDrawer('isRegister')">
                            Daftar
                        </span>
                    </div>
                </v-form>
            </v-sheet>
            <v-sheet :style="{ 'max-width': isLogin ? '90%' : '100%' }" class="mx-auto" v-if="isRegister">
                <v-form v-model="form" @submit.prevent="register">
                    <InputComponent model="" label="Nama Lengkap" pattern="fullName" variant="outlined" />
                    <InputComponent model="" label="Email" pattern="email" variant="outlined" />
                    <InputComponent model="" label="Password" pattern="password" variant="outlined" />
                    <InputComponent model="" label="Ulangi Password" pattern="password" variant="outlined" />
                    <br />
                    <v-btn :disabled="!form" :loading="loading" block color="purple" size="large" type="submit"
                        variant="elevated">
                        daftar
                    </v-btn>
                    <div class="font-weight-medium text-center py-10 text-subtitle-2" v-on:click="toggleDrawer('isLogin')">
                        sudah punya akun ?
                        <span class="font-weight-bold text-center text-subtitle-2">
                            Masuk
                        </span>
                    </div>
                </v-form>
            </v-sheet>
            <v-sheet :style="{ 'max-width': isLogin ? '90%' : '100%' }" class="mx-auto" v-if="isForget">
                <v-form v-model="form" @submit.prevent="forget">
                    <p class="font-weight-black text-center py-5 text-h5">
                        <img class="font-weight-black text-center text-h5" style="width: 50%;"
                            src="@assets/logo/logo-dark.png" alt="logo" />
                    </p>
                    <InputComponent model="" label="Masukkan Email" pattern="email" variant="outlined" />
                    <br />
                    <v-btn :disabled="!form" :loading="loading" block color="purple" size="large" type="submit"
                        variant="elevated">
                        atur ulang
                    </v-btn>
                    <div class="font-weight-medium text-center py-10 text-subtitle-2" v-on:click="toggleDrawer('isLogin')">
                        sudah punya akun ?
                        <span class="font-weight-bold text-center text-subtitle-2">
                            Masuk
                        </span>
                    </div>
                </v-form>
            </v-sheet>
        </v-card>
    </div>
</template>

<script>
import { authService } from '@service/auth'
import InputComponent from '@components/input/InputComponent.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'LoginScreen',
    components: {
        InputComponent
    },
    data() {
        return {
            email: '',
            password: '',
            firstName: '',
            loading: false,
            form: false,
            isLogin: true,
            isRegister: false,
            isForget: false
        }
    },
    methods: {
        async toggleDrawer(data) {
            const properties = ['isLogin', 'isRegister', 'isForget'];
            properties.forEach(property => {
                if (property === data) {
                    return this[property] = !this[property];
                } else {
                    return this[property] = false;
                }
            });
        },
        async verifySeasons() {
            try {
                await authService.authVerifySession()
            } catch (error) {
                // this.$router.push('/login')
            } finally {
                // this.loadingVer = false
            }
        },
        async login(e) {
            e.preventDefault();
            if (!this.form) return;
            this.loading = true;
            const payload = {
                email: e.target[0].value,
                password: e.target[1].value,
            };
            try {
                const response = await authService.authLogin(payload);
                if (response['role'] === 'User') {
                    window.location.reload();
                    window.location.href = '/Member/MainView/Search';
                } else if (response['role'] === 'Admin') {
                    window.location.reload();
                    window.location.href = '/Admin/MainView/Dashboard';
                }
            } catch (error) {
                console.error('Error logging in:', error);
            } finally {
                this.loading = false;
            }
        },
        async register(e) {
            e.preventDefault()
            if (!this.form) return
            this.loading = true
            const payload = {
                fullName: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value,
                imagePhoto: '-',
                balance: 0,
                isActive: true,
                idRole: '64ae4b5c8fe7d20417e6f1d8'
            }
            try {
                const response = await authService.authRegister(payload)
                if (response.message === 'Pendaftaran Berhasil Silahkan Login') {
                    this.isLogin = true
                    this.isRegister = false
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            } catch (error) {
                console.error('Error logging in:', error)
            } finally {
                this.loading = false
            }
        },
        async forget(e) {
            e.preventDefault()
            if (!this.form) return
            this.loading = true
            // const payload = {
            //     email: e.target[0].value,
            // }
            try {
                // const response = await authService.authLogin(payload)
                Swal.fire({
                    title: 'Error!',
                    text: 'Reset password sudah di kirim ke email anda, silahkan cek email anda',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } catch (error) {
                console.error('Error logging in:', error)
            } finally {
                this.loading = false
            }
        },
    },
    watch: {
        loading(val) {
            if (!val) return
            setTimeout(() => (this.loading = false), 2000)
        },
    },
    created() {
        this.verifySeasons()
    },
}
</script>

<style scoped>
.divider:after,
.divider:before {
    content: '';
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}
</style>
