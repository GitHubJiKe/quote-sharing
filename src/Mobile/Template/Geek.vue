<script setup lang="ts">
import TextEditor from '../components/TextEditor.vue'
import { useMobileStore } from "../store.ts";
import { storeToRefs } from 'pinia';
import UserName from './UserName.vue';
import { globalFooterText } from '../../constants.ts';
import { ref } from 'vue';

const store = useMobileStore()
const { datetimeStr, count, } = storeToRefs(store);
const editor = ref()

const doRest = () => {
    if (editor) {
        editor.value.reset()
    }
}
const doToogleToolbar = () => {
    if (editor) {
        editor.value.toogleToolbar()
    }
}

defineExpose({
    reset: doRest,
    toogleToolbar: doToogleToolbar
})
</script>

<template>
    <div id="content" class="content" :style="`background-image:${store.activeBgcolor}`">
        <div class="card" :style="`color:${store.fontColor}`">
            <div class="header py-1 text-4">
                >>> <label class="datetime">{{ datetimeStr }}</label>
            </div>
            <UserName />
            <TextEditor ref="editor" class="text-area" :style="`color:${store.fontColor}`" />
            <footer class="text-4">
                {{ count }}
            </footer>
            <div class="designer text-4">
                {{ globalFooterText }}
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    padding: 24px;
    display: flex;
    flex-direction: column;


    .card {
        background-color: #1a1b25;
        display: flex;
        flex-direction: column;
        border-radius: 2px;

        .text-area {
            background-color: #1a1b25;
            outline: none;

        }


        .header {
            display: flex;
            justify-content: space-between;
            padding: 8px 20px;
            color: #aab1d3;
            font-family: 'Times New Roman', Times, serif;
            font-style: italic;
        }

        .author {
            color: #53597a;
            padding: 4px 12px;
            font-size: 14px;
            width: fit-content;
        }

        .author::before {
            content: '//';
            margin-right: 8px;
            font-style: italic;
        }

        footer {
            color: #53597a;
            display: flex;
            justify-content: flex-end;
            padding-right: 12px;
        }

        footer::before {
            content: "字数：";
        }
    }

    .designer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 12px;
        font-weight: 600;
        background-color: #1a1b25;
        color: #aab1d3;
    }
}
</style>
