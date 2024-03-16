<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'


const emit = defineEmits<{
    (e: 'confirm'): void
}>()

const githubLogo = 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png'
</script>

<template>
    <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <h1>反馈 </h1>
        <a href="https://github.com/GitHubJiKe/quote-sharing" target="_blank" rel="noopener noreferrer"
            class="flex justify-center">
            <img :src="githubLogo" width="50%" height="50%" alt="qrcode" />
        </a>
        <p>电邮：<a href="mailto:ypf9319@gmail.com">ypf9319@gmail.com</a></p>
        <button @click="emit('confirm')" class="btn-close">
            关闭
        </button>
    </VueFinalModal>
</template>

<style lang="less">
.confirm-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
}

.confirm-modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background: #fff;
    border-radius: 12px;
}

.confirm-modal-content>*+* {
    margin: 12px 0;
}

.confirm-modal-content h1 {
    font-size: 18px;
}

.confirm-modal-content button {
    margin: 12px 0 0 auto;
    padding: 0 8px;
    border: 1px solid;
    border-radius: 12px;
}

.dark .confirm-modal-content {
    background: #000;
}
</style>