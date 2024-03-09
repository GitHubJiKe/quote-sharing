<script setup lang="ts">
import { bgcolors } from '../../constants.ts'
import { useMobileStore } from '../store.ts';

const store = useMobileStore()

const onChangeBgColor = (color: string) => {
    store.activeBgcolor = color
}

</script>

<template>
    <div class="bg-colors">
        <div @click="onChangeBgColor(item)" class="bg-color" v-for="(item, idx) in bgcolors" :key="idx"
            :class="{ 'bg-color-active': item === store.activeBgcolor }">
            <div :style="`background-image:${item}`"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.bg-colors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: space-between;

    .bg-color {
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

    .bg-color-active {
        border: 3px solid gold;
    }
}
</style>