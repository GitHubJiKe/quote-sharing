<script setup lang="ts">
import { useMobileStore } from '../store.ts';
type TempItem = {
    name: string;
    value: string;
    isPending?: boolean;
}
const temps: TempItem[] = [
    {
        name: '简洁',
        value: 'Clean'
    }, {
        name: '时尚',
        value: 'Fashion'
    },
    {
        name: '极客',
        value: 'Geek'
    },
    {
        name: '包豪斯',
        value: 'Bauhaus',
        isPending: true
    },
]

const store = useMobileStore()


const choose = (item: TempItem) => {
    if (item.isPending) {
        return alert("开发中")
    }
    store.temp = item.value
}

</script>
<template>
    <div class="temps">
        <div :class="{ ready: !item.isPending, pending: item.isPending, active: item.value === store.temp }"
            @click="choose(item)" v-for="item in temps" :key="item.value">
            {{ item.name }}
        </div>
    </div>
</template>
<style lang="less" scoped>
.temps {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    justify-content: flex-start;
    width: 100dvw;

    .ready {
        padding: 12px;
        background-color: #272429;
        padding: 8px;
        border-radius: 4px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
    }

    .pending {
        padding: 12px;
        cursor: not-allowed;
        background-color: #272429;
        opacity: 0.3;
        padding: 8px;
        border-radius: 4px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;

    }

    .active {
        color: gold;
        font-size: 16px;
        font-weight: 600;
    }
}
</style>