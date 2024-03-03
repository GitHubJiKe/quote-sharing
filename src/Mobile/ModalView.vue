<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import qrcode from '../qrcode.jpg';


const emit = defineEmits<{
    (e: 'confirm'): void
}>()
</script>

<template>
    <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <h1>打赏 </h1>
        <img :src="qrcode" width="50%" height="50%" alt="qrcode" />
        <p>反馈：<a href="mailto:ypf9319@gmail.com">ypf9319@gmail.com</a></p>
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
    color: gold;
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