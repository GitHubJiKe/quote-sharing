<script lang="ts" setup>
import { operations } from '../../constants.ts'
import { useMobileStore } from "../store.ts";
const store = useMobileStore()
</script>

<template>
    <div class="tabs">
        <div class="tab" v-for="item in operations" :key="item.value"
            :class="{ 'tab-active': store.activeTab === item.value }" @click="store.activeTab = item.value">
            {{ item.name }}
        </div>
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
    }

    .tab-active {
        background-color: #373538;
    }
}
</style>