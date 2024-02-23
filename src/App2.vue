<script setup lang="ts">
import { computed, ref, } from 'vue';
import { fontFalimies, aligns, languageList, bgImgList } from './constants';
import { fetchTranslate, exportPic } from './utils'
import { watchThrottled } from '@vueuse/core'
interface PreviewStyleConf {
    color: string;
    fontSize: number;
    bgColor: string;
    bgImage: string;
    padding: number;
    textAlign: 'left' | 'right' | 'center';
    vertical: 'top' | 'bottom' | 'center';
    fontFamily: 'regular' | 'italic';
    language: 'zh|en' | 'en|zh' | '|'
}

const txt = ref('Welcome Sharing Quotes!')
const subTxt = ref(txt.value);
const previewStyleConf = ref<PreviewStyleConf>({
    color: '#000',
    fontSize: 80,
    bgColor: '#efede9',
    bgImage: '',
    padding: 24,
    textAlign: 'center',
    vertical: 'center',
    fontFamily: 'regular',
    language: '|'
})


const generatePreviewStyleObj = () => {
    const { color, bgColor, fontSize, padding, textAlign, vertical, bgImage } = previewStyleConf.value;
    return {
        color,
        'background-color': bgColor,
        'background-image': `url(${bgImage})`,
        'font-size': `${fontSize}px`,
        padding: `${padding}px`,
        'align-items': vertical,
        'justify-content': textAlign
    }
}

const getTxtClass = () => previewStyleConf.value.fontFamily === 'italic' ? 'im-fell-english-regular-italic' : 'im-fell-english-regular';

const translate = async () => {
    const [from, to] = previewStyleConf.value.language.split('|');
    if (from && to) {
        try {
            const translationTxt = await fetchTranslate(txt.value, from, to);
            console.log(translationTxt);
            subTxt.value = translationTxt as string;
        } catch (error) {
            // @ts-ignore
            alert(error.message)
        }
    } else {
        subTxt.value = txt.value;
    }
}


watchThrottled(txt, translate, { throttle: 2000 })

const onDownloadPic = () => {
    exportPic(document.querySelector('.preview')!)
}
const showSubTxt = computed(() => {
    return previewStyleConf.value.language !== '|'
})
</script>

<template>
    <div class="quote-sharing">
        <div class="title"></div>
        <div class="content">
            <div class="conf">
                <div>
                    <label for="bgColor">background:</label>
                    <input type="color" name="bgColor" id="bgColor" v-model="previewStyleConf.bgColor">
                </div>
                <div>
                    <label for="bgImage">background image:</label>
                    <select name="bgImage" id="bgImage" v-model="previewStyleConf.bgImage">
                        <option :value="item.value" v-for="item in bgImgList" :key="item.name">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="color">text color:</label>
                    <input type="color" name="color" id="color" v-model="previewStyleConf.color">
                </div>
                <div>
                    <label for="fontSize">font size:</label>
                    <input type="range" name="fontSize" id="fontSize" v-model="previewStyleConf.fontSize" min="20" max="100"
                        step="2">
                    <label>{{ previewStyleConf.fontSize }}</label>
                </div>
                <div>
                    <label for="fontFamily">font family:</label>
                    <select name="fontFamily" id="fontFamily" v-model="previewStyleConf.fontFamily">
                        <option :value="item.value" v-for="item in fontFalimies" :key="item.name">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="textAlign">textAlign:</label>
                    <select name="textAlign" id="textAlign" v-model="previewStyleConf.textAlign">
                        <option :value="item" v-for="item in aligns" :key="item">
                            {{ item }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="language">language:</label>
                    <select name="language" id="language" v-model="previewStyleConf.language">
                        <option :value="item.value" v-for="item in languageList" :key="item.name">
                            {{ item.name }}
                        </option>
                    </select>
                </div>

                <div class="last-button">
                    <button type="button" @click="onDownloadPic">Download Picture</button>
                </div>
            </div>
            <textarea placeholder="Typein something and press Key Enter" v-model="txt"></textarea>
            <div class="preview" :style="generatePreviewStyleObj()">
                <div>
                    <div class="main-txt" :class="getTxtClass()">
                        {{ txt }}
                    </div>
                    <div v-if="showSubTxt" class="sub-txt" :class="getTxtClass()"
                        :style="`font-size:${previewStyleConf.fontSize / 2}px`">
                        {{ subTxt }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="less" scoped>
.quote-sharing {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;

    .title {
        background-image: url(./title.svg);
        background-repeat: no-repeat;
        background-position: left;
        background-size: 100%;
        background-origin: padding-box;
        height: 100vh;
        flex: 4;
    }

    .content {
        flex: 8;
        height: 100vh;
        border-left: 1px dashed #6b706f;
        padding: 0 20px;
        display: flex;
        flex-direction: column;

        textarea {
            height: 200px;
            resize: none;
            margin-bottom: 20px;

            font-size: 16px;
            padding: 4px;
        }

        .conf {
            margin-top: 20px;
            flex: 2;
            background-color: #d4dae8;
            margin-bottom: 20px;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            padding: 20px;
            grid-template-rows: repeat(2, 1fr);

            div {
                text-align: center;
            }

            .last-button {
                grid-column-start: 5;
            }
        }

        .preview {
            flex: 8;
            background-color: #efede9;
            margin-bottom: 20px;
            display: flex;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            background-origin: padding-box;

            .main-txt {
                text-align: center;
                font-weight: 900;
            }

            .sub-txt {
                font-weight: 600;
                text-align: center;
            }
        }
    }
}
</style>