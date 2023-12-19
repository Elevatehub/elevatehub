<script setup lang="ts">
import { onMounted, ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import loading from "../../assets/anim/loading2.json"

let anim = ref()

onMounted(() => {
    setTimeout(() => {
        anim.value
    }, 500)
})
</script>
<template>
    <LottieAnimation style="width: 20%;" :animation-data="loading" :auto-play="true" :loop="true" :speed="1" ref="anim" />
</template>