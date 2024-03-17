<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { NImage } from 'naive-ui'
import { isMobileDevice } from '../../utils';

const emit = defineEmits<{
    (e: 'confirm'): void
}>()
const { type } = defineProps<{
    type: number;
}>()
const typePicNameMap = {
    1: '10_yuan',
    2: '30_yuan',
    3: '50_yuan'
}
const qrcodeUrl = () => {
    // @ts-ignore
    return `https://firebasestorage.googleapis.com/v0/b/talk-is-cheap-6695e.appspot.com/o/quotes%2F${typePicNameMap[type]}.jpg?alt=media&token=34c49950-8916-4de9-9af6-9266e87926b3`
}

const isMobile = isMobileDevice()

const getW = () => {
    if (isMobile) {
        return '100%'

    } else {
        return '300px'
    }
}
const getH = () => {
    if (isMobile) {
        return '100%'

    } else {
        return '400px'
    }
}
</script>

<template>
    <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <h1>反馈 </h1>
        <div class="flex justify-center" style="gap:12px">
            <NImage :src="qrcodeUrl()" :width="getW()" :height="getH()" alt="qrcode" class="flex-1" />
            <NImage class="flex-1"
                src="https://firebasestorage.googleapis.com/v0/b/talk-is-cheap-6695e.appspot.com/o/quotes%2Fpeteryuan.jpg?alt=media&token=cf85a75a-b23b-4d3f-a137-59d77fb4f085"
                :width="getW()" :height="getH()" alt="wechat" />
        </div>
        <p>付费成功，添加微信，备注邮箱及金额</p>
        <div @click="emit('confirm')" class="rounded px-4 py-2 bg-sky">
            关闭
        </div>
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