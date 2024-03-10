<script setup lang="ts">
import { fontColors } from '../../constants.ts'
import { useMobileStore } from '../store.ts';

const store = useMobileStore()

const onChangeFontColor = (color: string) => {
    store.fontColor = color
}

</script>

<template>
    <div class="font-colors">
        <div @click="onChangeFontColor(item)" class="font-color" v-for="(item, idx) in fontColors" :key="idx"
            :class="{ 'font-color-active': item === store.fontColor }">
            <div :style="`background-color:${item}`"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.font-colors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: space-between;

    .font-color {
        border: 3px solid #fff;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;

        div {
            border-radius: 50%;
            width: 30px;
            height: 30px;
        }
    }

    .font-color-active {
        border: 3px solid gold;
    }
}
</style>