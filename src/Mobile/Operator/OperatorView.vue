<script lang="ts" setup>
import BgColors from "./BgColors.vue";
import FunIcons from "./FunIcons.vue";
import Tabs from './Tabs.vue'
import { useMobileStore } from '../store.ts';
import { VueFinalModal } from 'vue-final-modal'
import ChooseTemps from "./ChooseTemps.vue";
import FontColors from "./FontColors.vue";
const store = useMobileStore()

const emit = defineEmits<{
    (e: 'toggle'): void
}>()
</script>

<template>
    <VueFinalModal content-class="view" swipe-to-close="down" content-transition="vfm-slide-down"
        overlay-transition="vfm-fade">
        <div class="line-bar">
            <div class="line" @click="emit('toggle')"></div>
        </div>
        <div class="top">
            <Tabs />
        </div>
        <div class="selectors">
            <ChooseTemps v-show="store.activeTab === 'template'" />
            <BgColors v-show="store.activeTab === 'bgColor'" />
            <FunIcons v-show="store.activeTab === 'icons' && store.temp !== 'Geek'" />
            <FontColors v-show="store.activeTab === 'fontColor'" />
        </div>
    </VueFinalModal>
</template>

<style lang="less">
.view {
    position: absolute;
    bottom: 0;
    width: 100dvw;
    background-color: #666666;

    .line-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;

        .line {
            width: 50px;
            height: 3px;
            border-radius: 8px;
            background-color: #373538;
        }
    }

    .top {
        padding: 12px;
    }

    .selectors {
        padding: 12px;
        overflow-y: auto;
        height: 300px;
        display: flex;
        justify-content: center;
    }
}
</style>