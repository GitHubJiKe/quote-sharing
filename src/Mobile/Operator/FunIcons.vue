<script lang="ts" setup>
import { useMobileStore } from "../store.ts";
import { funIcons } from "../../constants.ts";
const store = useMobileStore()
</script>

<template>
    <div class="fun-icon-items" v-show="store.activeTab === 'icons'">
        <div class="fun-icon-item" :class="{ 'fun-icon-item-active': store.currentIcon === item.value }"
            v-for="item in  funIcons " :key="item.value" @click="store.currentIcon = item.value">
            {{ item.name }}
        </div>
    </div>
</template>

<style lang="less" scoped>
.fun-icon-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    justify-content: space-between;

    .fun-icon-item {
        flex: 0 1 15%;
        padding: 8px;
        border-radius: 4px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        background-color: #272429;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fun-icon-item-active {
        color: gold;
        font-size: 16px;
        font-weight: 600;
    }
}
</style>