<script setup lang="ts">
import TextEditor from '../components/TextEditor.vue'
import { useMobileStore } from "../store.ts";
import { storeToRefs } from 'pinia';
import UserName from './UserName.vue';
import { globalFooterText } from '../../constants.ts';
import { useEditorAPI } from './util.ts';
import { ref } from 'vue';
const store = useMobileStore()
const { datetimeStr, count, } = storeToRefs(store);
const editor = ref();
const apiHook = useEditorAPI(editor)
defineExpose(apiHook())
const emit = defineEmits<{
    (e: 'open'): void;
}>();
</script>

<template>
    <div id="content" class="content b-white b-0.2 b-solid" :style="`background-image:${store.activeBgcolor}`">
        <div class="card text-white"
            :style="`background-image: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));`">
            <div class="datetime-bar ml-2">
                <div class="datetime text-4 text-white">
                    <span>{{ datetimeStr }}</span>
                </div>
                <i class="iconfont text-8 m-r-2 cursor-pointer" :class="`icon-${store.currentIcon}`"
                    @click="emit('open')"></i>
            </div>
            <TextEditor ref="editor" class="lighter" />
            <div class="footer">
                <UserName class="float-left text-4 text-white" />
                <label class="count float-right text-4 text-white" :data-count="count">字数：</label>
            </div>
            <div class="designer text-4 text-white"
                :style="`background-image: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));`">{{
        globalFooterText }}
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .card {
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .datetime-bar {
            padding: 12px 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header {
            height: 60px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 18px;
            margin-right: 18px;

            .icon {
                color: white;
                font-size: 34px;
            }
        }

        .dashed-divider {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .dashed-line {}
        }

        .footer {
            padding: 0 12px;

            .name {
                padding: 4px;
            }

            .count {
                padding: 4px;
            }

            .count::after {
                content: attr(data-count);
            }
        }
    }

    .designer {
        text-align: center;
        line-height: 24px;
        font-weight: 800;
        font-weight: 600;
        padding-bottom: 8px;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }


}
</style>
<style lang="less">
.lighter {

    .w-e-text-container {
        background-color: transparent !important;
        color: #fff !important;
    }

    .w-e-bar {
        background-color: transparent !important;
        color: #000 !important;
    }
}
</style>
