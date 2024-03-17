<script setup lang="ts">
import { isMobileDevice } from '../../utils';

defineProps<{
    bg: string,
}>()
const isMobile = isMobileDevice()
</script>

<template>
    <h1 class="text-center title" :class="{ 'text-4': isMobile }">
        释放你的
        <label class="shining" :style="`background-image:${bg}`">
            灵光✨一闪✨
        </label>
        <label v-if="!isMobile">分享到你喜欢的地方</label>
        <p v-else>
            分享到你喜欢的地方
        </p>
    </h1>
</template>

<style lang="less" scoped>
.title {

    .shining {
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-size: 24px;
    }

    p {
        padding: 0;
        margin: 0;
    }
}
</style>