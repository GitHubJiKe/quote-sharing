<script lang="ts" setup>
import { useMobileStore } from '../store';

const store = useMobileStore()
</script>

<template>
    <div class="visible-items">
        <div class="visible-item" :class="{ 'visible-item-active': item.show }" v-for="item in  store.visibleItems "
            :key="item.value" @click="item.show = !item.show">
            {{ item.name }}
        </div>
    </div>
</template>

<style lang="less" scoped>
.visible-items {
    display: flex;
    flex-direction: row;
    gap: 12px;
    height: 44px;

    .visible-item {
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

    .visible-item-active {
        color: gold;
        font-size: 16px;
        font-weight: 600;
    }
}
</style>