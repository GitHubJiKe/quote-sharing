<script setup lang="ts">
import TextEditor from "../TextEditor.vue";
import { useMobileStore } from "../store.ts";
import { storeToRefs } from 'pinia';
const store = useMobileStore()
const { authorLineShow, datetimeStr, count } = storeToRefs(store);
</script>

<template>
    <div id="content" class="content" :style="`background-image:${store.activeBgcolor}`">
        <div class="card">
            <div class="header" :style="`background-image:${store.activeBgcolor}`">
                <i class="iconfont icon" :class="`icon-${store.currentIcon}`"></i>
            </div>
            <div class="dashed-divider">
                <div class="dashed-line"></div>
            </div>
            <div class="datetime">
                <span>{{ datetimeStr }}</span>
            </div>
            <TextEditor />
            <div class="dashed-divider">
                <div class="dashed-line"></div>
            </div>
            <div class="footer">
                <label class="name float-left" v-show="authorLineShow?.show" contenteditable>点击输入</label>
                <label class="count float-right" :data-count="count">字数：</label>
            </div>
        </div>
        <div class="designer">Designed with Quote Sharing</div>
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
            margin: 12px 0 0 0;
        }


        .dashed-divider {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .dashed-line {
                border: 1px dashed #bbb;
            }
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