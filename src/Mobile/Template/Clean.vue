<script setup lang="ts">
import TextEditor from '../TextEditor.vue'
import { useMobileStore } from "../store.ts";
import { storeToRefs } from 'pinia';
const store = useMobileStore()
const { authorLineShow, datetimeStr, count, } = storeToRefs(store);
</script>

<template>
    <div id="content" class="content" :style="`background-image:${store.activeBgcolor}`">
        <div class="card">
            <div class="datetime-bar">
                <div class="datetime">
                    <span>{{ datetimeStr }}</span>
                </div>
                <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                </div>
            </div>
            <div class="header" :style="`background-image:${store.activeBgcolor}`">
                <i class="iconfont icon" :class="`icon-${store.currentIcon}`"></i>
            </div>
            <TextEditor />
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
    background-color: #fff;

    .card {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 5px 5px 0px rgba(0, 0, 0);
        border: 2px solid #000;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .datetime-bar {
            padding: 12px 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #000;

            .datetime {
                color: #000;
            }

            .circles {
                display: flex;

                gap: 2px;

                .circle {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: 2px solid #000;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
                }

                .circle:nth-child(2) {
                    background-color: #000;
                }
            }

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

            .dashed-line {
                border: 1px dashed #bbb;
            }
        }

        .footer {
            padding: 8px;
            color: #000;
            border-top: 2px solid #000;

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
        color: #000;
        text-align: center;
        line-height: 24px;
        font-weight: 800;
        background-color: #fff;
        border-radius: 12px;
        padding: 8px 0;
        border: 2px solid #000;
        font-weight: 600;
        box-shadow: 5px 5px 0px rgba(0, 0, 0);
    }
}
</style>