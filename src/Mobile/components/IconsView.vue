<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
// import { isMobileDevice } from '../../utils';
import { funIcons } from '../../constants'

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'select', icon: string): void;
}>()

// const isMobile = isMobileDevice()
</script>

<template>
    <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <div class="grid px-4 grid-box gap-10 h-50 overflow-auto">
            <div v-for="item in funIcons" :key="item.value" :class="`icon-${item.value}`"
                class="iconfont text-black text-8" @click="emit('select', item.value)">
            </div>
        </div>
        <div @click="emit('close')" class="rounded px-4 py-1 bg-sky">
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

.grid-box {
    grid-template-columns: repeat(5, 1fr);
}
</style>