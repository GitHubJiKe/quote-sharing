<script lang="ts" setup>
import { operations } from '../../constants.ts'
import { useMobileStore } from "../store.ts";
const store = useMobileStore()

const handleShow = (value: string) => {
    if (value === 'icons') {
        return store.temp !== 'Geek'
    }
    if (store.temp !== 'Geek') {
        return value !== 'fontColor';
    }
    return true
}
</script>

<template>
    <div class="tabs">
        <template v-for="item in operations" :key="item.value">
            <div class="tab" v-if="handleShow(item.value)" :class="{ 'tab-active': store.activeTab === item.value }"
                @click="store.activeTab = item.value">
                {{ item.name }}
            </div>
        </template>
    </div>
</template>

<style lang="less" scoped>
.tabs {
    display: flex;
    gap: 12px;

    .tab {
        padding: 4px 12px;
        border-radius: 24px;
        color: white;
        font-size: 14px;
        border: 1px solid #373538;
    }

    .tab-active {
        background-color: #373538;
    }
}
</style>