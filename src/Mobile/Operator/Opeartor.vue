<script setup lang="ts">
import { useMobileStore } from '../store.ts';
import BgColors from "./BgColors.vue";
import VisibleItems from "./VisibleItems.vue";
import FunIcons from "./FunIcons.vue";
import Tabs from './Tabs.vue'
import { ref, computed } from 'vue';
const store = useMobileStore()
const opened = ref(false)
const clicked = ref(false)
const toggle = () => {
    opened.value = !opened.value;
    clicked.value = true
}

const className = computed(() => {
    if (!clicked.value) {
        return ''
    }

    return opened.value ? 'open' : 'close'
})
</script>

<template>
    <div class="panel" :class="className">
        <div class="line-bar">
            <div class="line" @click="toggle"></div>
        </div>
        <div v-show="opened">
            <div class="top">
                <Tabs />
            </div>
            <div class="selectors">
                <BgColors v-show="store.activeTab === 'bgColor'" />
                <VisibleItems v-show="store.activeTab === 'visible'" />
                <FunIcons v-show="store.activeTab === 'icons'" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@keyframes shrink {
    from {
        height: 152px;
    }

    to {
        height: 20px;
    }
}

@keyframes unshrink {
    from {
        height: 20px;
    }

    to {
        height: 152px;
    }
}

.close {
    animation: shrink 1s;
}

.open {
    animation: unshrink 1s;
}

.panel {
    background-color: #131113;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 12px;
    display: flex;
    flex-direction: column;


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
    }
}
</style>../../constants.ts