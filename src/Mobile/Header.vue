<script setup lang="ts">
import { useMobileStore } from './store'

const emit = defineEmits<{
    (e: 'help'): void;
    (e: 'share'): void;
}>()

const store = useMobileStore()

const onReset = () => {
    store.text = '';
    (document.querySelector('.texts') as HTMLDivElement).focus()
}
</script>

<template>
    <div class="header">
        <div class="left">
            <label class="iconfont icon-dot" @click="emit('help')"></label>
        </div>
        <div class="right">
            <label class="iconfont icon-eraser" @click="onReset"></label>
            <label class="iconfont icon-share" @click="emit('share')"></label>
        </div>
    </div>
</template>


<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 12px;

    label {
        font-size: 24px;
    }

    .right {
        display: flex;
        gap: 24px;
    }
}
</style>