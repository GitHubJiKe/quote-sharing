<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMobileStore } from "./store";
const textareaRef = ref(null)
const store = useMobileStore()

const adjustHeight = () => {
    // @ts-ignore
    textareaRef.value.style.height = 'auto'; // 先将高度设为自动，以便获取完整内容的高度
    // @ts-ignore
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
}

onMounted(() => {
    adjustHeight()
})
</script>
<template>
    <textarea ref="textareaRef" class="texts" v-model="store.text" @input="adjustHeight"></textarea>
</template>

<style lang="less" scoped>
    .texts {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 2px;
        min-height: 100px;
        padding: 4px;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        line-height: 24px;
        margin-left: 18px;
        margin-right: 18px;
        border: none;
        resize: none;
    }
</style>