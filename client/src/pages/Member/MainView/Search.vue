<template>
    <div class="main-content" v-if="content">
        <div style="padding: 50;">
            <div class="card-container">
                <div class="typewriter">
                    <p class="typewriter-text" v-html="displayText.replace(/\n/g, '<br />')"></p>
                </div>
            </div>
            <div v-if="content && showResetButton" class="reset-button my-3">
                <v-btn color="purple" prepend-icon="mdi-sync" @click="resetContent">Reset</v-btn>
            </div>
        </div>
    </div>
    <v-row class="main-footer" v-if="isLoading">
        <v-col />
        <LoadingComponent />
        <v-col />
    </v-row>
    <v-row class="main-footer" v-if="!content && !isLoading">
        <v-col />
        <LoadingComponent2 />
        <v-col />
    </v-row>
    <v-footer>
        <v-row v-if="!isLoading && !content" class="sticky-bottom">
            <v-col cols="12" style="align-items: center; text-align: center;">
                <form v-on:submit="onSearch">
                    <v-row style="align-items: center;">
                        <v-col>
                            <InputComponent label="Scraping Keyword ex: Jagung,Bakar,Enak" placeholder="Tulis disini..."
                                v-model="keyword" :required="content.length === 0" variant="outlined" />
                        </v-col>
                        <v-btn color="purple" type="submit" style="height: 45px" :disabled="isLoading">Search</v-btn>
                    </v-row>
                </form>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import InputComponent from '@components/input/InputComponent.vue'
import LoadingComponent from '@components/loading/LoadingComponent.vue'
import LoadingComponent2 from '@components/loading/LoadingComponent2.vue'
import { topicService } from '@service/topic'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { openaiService } from '@service/openai'

export default {
    name: 'Comparison Analyst BII',
    components: {
        InputComponent,
        LoadingComponent,
        LoadingComponent2

    },
    data() {
        return {
            isLoading: false,
            keyword: '',
            content: '',
            displayText: '',
            cursorVisible: false,
            showResetButton: false
        }
    },
    methods: {
        startTypewriter() {
            let i = 0
            const interval = setInterval(() => {
                this.displayText += this.content[i]
                i++
                if (i === this.content.length) {
                    clearInterval(interval)
                    this.showResetButton = true
                }
            }, 30)
        },
        resetContent() {
            this.keyword = ''
            this.content = ''
            this.displayText = ''
            this.showResetButton = false
        },
        async onSearch(e) {
            Swal.fire({
                title: 'Sedang Scraping Data',
                allowOutsideClick: false,
                html: 'Kami sedang mengambil informasi dari internet sesuai dengan keyword anda. Mohon tetap di halaman ini hingga scraping selesai',
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                }
            })
            e.preventDefault()
            const result = e.target[0].value.split(',');
            try {
                const payload = {
                    keyword: result
                }
                const data = await topicService.startEngine(payload)
                this.header = data.header
                this.query = data.query
                this.scraping = false
            } catch (error) {
                Swal.fire('Berhasil Scraping Data', '', 'info')
            } finally {
                this.scraping = false
                Swal.fire('Berhasil Scraping Data', '', 'Sekarang anda sudah bisa melihat hasilnya di menu Topik')
            }
        }
    }
}
</script>

<style scoped>
.sticky-header {
    position: sticky;
    top: 0;
    z-index: 100;
    /* Additional styling for the header */
}

.main-content {
    /* Adjust margin-top to accommodate the header height */
    /* margin-top: 64px; */
    /* Assuming header height is 64px */
    padding-bottom: 100%;
}

.main-footer {
    /* Adjust margin-top to accommodate the header height */
    margin-top: 64px;
    height: 50vh;
    box-shadow: none !important;
    /* Assuming header height is 64px */
}

.sticky-footer {
    position: sticky;
    bottom: 0;
    z-index: 100;
    /* Additional styling for the footer */
}

.fullscreen-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.no-shadow.v-app-bar {
    box-shadow: none !important;
}

.sticky-bottom {
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 10px;
    z-index: 100;
}

.form-group {
    position: relative;
    margin-bottom: 10px;
}

.powered {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: -55px;
}

.googleAI {
    height: 100px;
}

.logoEleveted {
    height: 300px;
    width: 300px;
    background-size: cover;
}

.card-container {
    background-color: #dfdfdfd2;
    padding: 10px;
    border-radius: 10px;
}

.typewriter-text {
    overflow: hidden;
    white-space: pre-wrap;
    /* Allow line breaks */
    word-wrap: break-word;
    margin: 0;
    /* Remove default margin */
}

.typing-cursor {
    display: inline-block;
    vertical-align: bottom;
    width: 0.3em;
    height: 1.1em;
    background-color: #000;
    animation: blinking-cursor 1s infinite;
}

@keyframes typing {
    from {
        width: 0;
    }
}

@keyframes blinking-cursor {
    0% {
        background-color: transparent;
    }

    50% {
        background-color: #000;
    }

    100% {
        background-color: transparent;
    }
}

.typewriter-text::after {
    content: '|';
    animation: blink 0.7s infinite;
}

.reset-button {
    display: flex;
    justify-content: center;
}
</style>
