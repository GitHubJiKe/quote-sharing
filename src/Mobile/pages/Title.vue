<script setup lang="ts">
defineProps<{
    bg: string,
}>()
</script>

<template>
    <h1 class="text-center">
        释放你的
        <label class="shining" :style="`background-image:${bg}`">
            灵光✨一闪✨
        </label>
        ，分享到你喜欢的地方
    </h1>
</template>

<style lang="less" scoped>
.shining {
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 24px;
}
</style>