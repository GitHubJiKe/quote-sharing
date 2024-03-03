<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { bgcolors, visibleItems, funIcons } from "./constants";
import { exportPic } from "./utils";
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalView from './ModalView.vue'

const visibleList = ref(visibleItems)
const defaultText = '点击此处输入您想分享的内容...'
const text = ref(defaultText)
const resetText = () => {
    text.value = '';
    (document.querySelector('.texts') as HTMLDivElement).focus()
}
const count = computed(() => {
    return text.value.length;
});

const activeBgcolor = ref(bgcolors[0]);

const onBgColorChange = (color: string) => {
    activeBgcolor.value = color;
};
const panelShow = ref(false)
const tooglePanel = () => {
    panelShow.value = !panelShow.value
}
const activeTab = ref('icons')

const onTabChange = (tab: string) => {
    activeTab.value = tab
}

watchEffect(() => {
    if (panelShow.value) {
        let timer = setTimeout(() => {
            window.document.body.scrollTo({
                top: window.innerHeight + 1000,
                behavior: 'smooth'
            })
            clearTimeout(timer)
        }, 800)
    } else {
        let timer = setTimeout(() => {
            window.document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            clearTimeout(timer)
        }, 800);
    }
})
const dividerLineShow = computed(() => {
    return visibleList.value.find(v => v.value === 'divider')
})
const datetimeLineShow = computed(() => {
    return visibleList.value.find(v => v.value === 'datetime')
})
const authorLineShow = computed(() => {
    return visibleList.value.find(v => v.value === 'author')
})
const wordsLineShow = computed(() => {
    return visibleList.value.find(v => v.value === 'words')
})

const onVisibleItemClick = (item: { show: boolean; }) => {
    item.show = !item.show;
}

const currentDateTime = ref(new Date());

const datetimeStr = computed(() => {
    return currentDateTime.value.toLocaleString()
})

const currentIcon = ref('bike');

const onIconClick = (icon: string) => {
    currentIcon.value = icon
}

const onContentChange = (e: unknown) => {
    // @ts-ignore
    text.value = e.target.innerText;
}

const onShare = () => {
    const preview = document.querySelector("#content")! as HTMLDivElement;
    const nameEl = document.querySelector('.name')! as HTMLDivElement;
    if (authorLineShow.value?.show && nameEl?.innerHTML === '点击输入') {
        nameEl.style.display = "none"
    }
    exportPic(preview).then(() => {
        nameEl.style.display = ""
    });

}

const { open, close } = useModal({
    component: ModalView,
    attrs: {
        onConfirm() {
            close()
        },
    },
})
const onHelpClick = () => {
    open()
}
</script>

<template>
    <div class="quote-sharing">
        <ModalsContainer />
        <div>
            <div class="header">
                <div class="left">
                    <label class="iconfont icon-dot" @click="onHelpClick"></label>
                </div>
                <div class="right">
                    <label class="iconfont icon-eraser" @click="resetText"></label>
                    <label class="iconfont icon-share" @click="onShare"></label>
                </div>
            </div>
            <div id="content" class="content" :style="`background-image:${activeBgcolor}`">
                <div class="card">
                    <div class="header" :style="`background-image:${activeBgcolor}`">
                        <i class="iconfont icon" :class="`icon-${currentIcon}`"></i>
                    </div>
                    <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut">
                        <div class="dashed-divider" v-if="dividerLineShow?.show">
                            <div class="dashed-line"></div>
                        </div>
                    </Transition>
                    <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut">
                        <div class="datetime" v-if="datetimeLineShow?.show">
                            <span>{{ datetimeStr }}</span>
                        </div>
                    </Transition>
                    <div class="texts" contenteditable @input="e => onContentChange(e)">
                        {{ text }}
                    </div>
                    <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut">
                        <div class="dashed-divider" v-if="dividerLineShow?.show">
                            <div class="dashed-line"></div>
                        </div>
                    </Transition>
                    <div class="footer">
                        <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
                            leave-active-class="animate__animated animate__fadeOut">
                            <label class="name float-left" v-show="authorLineShow?.show" contenteditable>点击输入</label>
                        </Transition>
                        <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
                            leave-active-class="animate__animated animate__fadeOut">
                            <label class="count float-right" :data-count="count"
                                v-show="wordsLineShow?.show">字数：</label>
                        </Transition>
                    </div>
                </div>
                <div class="designer">Designed with Quote Sharing</div>
            </div>
        </div>

        <div class="panel">
            <div class="line-bar" @click="tooglePanel">
                <div class="line"></div>
            </div>
            <Transition name="custom-classes" enter-active-class="animate__animated animate__slideInUp"
                leave-active-class="animate__animated animate__slideOutDown">
                <div v-show="panelShow">
                    <div class="top">
                        <div class="tabs">
                            <div class="tab" :class="{ 'tab-active': activeTab === 'icons' }"
                                @click="onTabChange('icons')">
                                图标
                            </div>
                            <div class="tab" :class="{ 'tab-active': activeTab === 'bgColor' }"
                                @click="onTabChange('bgColor')">
                                背景色
                            </div>
                            <div class="tab" :class="{ 'tab-active': activeTab === 'visible' }"
                                @click="onTabChange('visible')">
                                显示/隐藏
                            </div>
                        </div>
                    </div>
                    <div class="selectors">
                        <div class="bg-colors" v-show="activeTab === 'bgColor'">
                            <div @click="onBgColorChange(item)" class="bg-color" v-for="(item, idx) in bgcolors"
                                :key="idx" :class="{ 'bg-color-active': item === activeBgcolor }">
                                <div :style="`background-image:${item}`"></div>
                            </div>
                        </div>
                        <div class="visible-items" v-show="activeTab === 'visible'">
                            <div class="visible-item" :class="{ 'visible-item-active': item.show }"
                                v-for="item in  visibleList " :key="item.value" @click="onVisibleItemClick(item)">
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="fun-icon-items" v-show="activeTab === 'icons'">
                            <div class="fun-icon-item" :class="{ 'fun-icon-item-active': currentIcon === item.value }"
                                v-for="item in  funIcons " :key="item.value" @click="onIconClick(item.value)">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>



    </div>
</template>

<style lang="less" scoped>
html,
body {

    overflow-y: auto;
    overflow-x: hidden;
}


/* This changes all the animations globally */
:root {
    --animate-duration: 100ms;
    --animate-delay: 0s;

}

.float-left {
    float: left;
}

.float-right {
    float: right;
}

.flex-x-space-between {
    display: flex;
    justify-content: space-between;
}

.flex-x-end {
    display: flex;
    justify-content: flex-end;
}

.flex-x-start {
    display: flex;
    justify-content: flex-start;
}

.flex-all-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.quote-sharing {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 40px;
    background-color: #000;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        padding: 12px;

        label {
            font-size: 24px;
        }

        .right {
            display: flex;
            gap: 24px;
        }
    }

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

    .panel {
        background-color: #131113;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        padding: 0 12px 12px 12px;
        display: flex;
        flex-direction: column;

        .line-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 20px;

            .line {
                width: 50px;
                height: 3px;
                border-radius: 8px;
                background-color: #373538;
            }
        }

        .top {
            padding: 12px;



            .tabs {
                display: flex;
                gap: 12px;

                .tab {
                    padding: 4px 12px;
                    border-radius: 24px;
                    color: white;

                    font-size: 14px;
                }

                .tab-active {
                    background-color: #373538;
                }
            }

            .arrow {
                color: white;
                font-weight: 600;
            }

            .arrow-up {
                color: white;
                font-weight: 600;
                rotate: 180deg;
            }
        }


        .selectors {
            padding: 12px;
            overflow-y: auto;

            .bg-colors {
                display: grid;
                grid-template-rows: 1fr;
                grid-template-columns: repeat(60, 1fr);
                gap: 12px;
                overflow-x: auto;

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

            .visible-items {
                display: flex;
                flex-direction: row;
                gap: 12px;
                height: 44px;

                .visible-item {
                    padding: 8px;
                    border-radius: 4px;
                    color: white;
                    font-size: 16px;
                    font-weight: 600;
                    background-color: #272429;
                    .flex-all-center();
                }

                .visible-item-active {
                    color: gold;
                    font-size: 16px;
                    font-weight: 600;
                }
            }

            .fun-icon-items {
                display: flex;
                flex-direction: row;
                gap: 12px;
                height: 44px;

                .fun-icon-item {
                    padding: 8px;
                    border-radius: 4px;
                    color: white;
                    font-size: 16px;
                    font-weight: 600;
                    background-color: #272429;
                    .flex-all-center();
                    width: 34px;
                }

                .fun-icon-item-active {
                    color: gold;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>
