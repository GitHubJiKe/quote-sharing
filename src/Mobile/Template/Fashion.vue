<script setup lang="ts">
import TextEditor from "../components/TextEditor.vue";
import { useMobileStore } from "../store.ts";
import { storeToRefs } from 'pinia';
import UserName from "./UserName.vue";
import { globalFooterText } from '../../constants.ts';
import { useEditorAPI } from "./util.ts";
import { ref } from "vue";
const store = useMobileStore()
const { datetimeStr, count } = storeToRefs(store);
const editor = ref();
const apiHook = useEditorAPI(editor)
defineExpose(apiHook())
const emit = defineEmits<{
    (e: 'open'): void;
}>();
</script>

<template>
    <div id="content" class="content" :style="`background-image:${store.activeBgcolor}`">
        <div class="card">
            <div class="header py-1" :style="`background-image:${store.activeBgcolor}`">
                <i class="iconfont icon cursor-pointer" :class="`icon-${store.currentIcon}`" @click="emit('open')"></i>
            </div>
            <div class="dashed-divider">
                <div class="dashed-line"></div>
            </div>
            <div class="datetime text-4">
                <span>{{ datetimeStr }}</span>
            </div>
            <TextEditor ref="editor" />
            <div class="dashed-divider dashed-divider-2">
                <div class="dashed-line"></div>
            </div>
            <div class="footer">
                <UserName class="float-left text-4" />
                <label class="count float-right text-4" :data-count="count">字数：</label>
            </div>
        </div>
        <div class="designer text-4">{{ globalFooterText }}</div>
    </div>
</template>

<style lang="less" scoped>
.content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .card {
        background-color: #fff;
        padding: 18px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;

        .header {
            height: 60px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 14px;

            .icon {
                color: white;
                font-size: 34px;
            }
        }

        .datetime {
            color: #bbb;
            margin: 12px 0 12px 0;
        }

        .dashed-divider {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .dashed-line {
                border: 1px dashed #bbb;
            }
        }

        .dashed-divider-2 {
            margin-top: 12px;
        }

        .footer {
            margin: 12px 0 0 0;
            color: #bbb;

            .name {
                padding: 4px;
            }

            .count {
                padding: 4px;
            }

            .count::after {
                color: #000;
                content: attr(data-count);

            }
        }
    }

    .designer {
        color: white;
        text-align: center;
        line-height: 24px;
        font-weight: 800;
    }
}
</style>