<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal'
import OperatorView from './OperatorView.vue';
import { useMobileStore } from '../store';

const store = useMobileStore()

const { open, close, options } = useModal({
    component: OperatorView,
    attrs: {
        onToggle() {
            options.modelValue ? close() : open()
        },
    },
})
</script>

<template>
    <div class="panel">
        <button @click="open" class="float-btn" :style="`background-image:${store.activeBgcolor}`">
            <i class="iconfont icon-config"></i>
        </button>
        <ModalsContainer />
    </div>
</template>

<style lang="less" scoped>
.panel {
    .float-btn {
        position: absolute;
        right: 12px;
        bottom: 12px;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        i {
            font-size: 24px;
        }
    }
}
</style>