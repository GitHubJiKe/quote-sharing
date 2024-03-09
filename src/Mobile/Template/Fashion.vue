<script setup lang="ts">
import { useMobileStore } from "../store.ts";
import { storeToRefs } from 'pinia';
const store = useMobileStore()
const { authorLineShow, datetimeStr, count } = storeToRefs(store);
const onTxtChange = (e: unknown) => {
    // @ts-ignore
    store.text = e?.target['innerText']
}
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
            <div class="texts" contenteditable @input="e => onTxtChange(e)">
                {{ store.text }}
            </div>
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

        .texts {
            font-size: 14px;
            margin: 12px 0;
            font-weight: 400;
            letter-spacing: 2px;
            min-height: 100px;
            padding: 4px;
            white-space: pre-wrap;
            line-height: 24px;
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