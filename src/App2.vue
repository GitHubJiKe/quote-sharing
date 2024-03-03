<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Loading from "./Loading.vue";
import {
    fontFalimies,
    aligns,
    languageList,
    labelsLanguageMap,
    layouts,
    refreshLabels,
} from "./constants";
import {
    fetchTranslate,
    exportPic,
    dragFunc,
    unsplash,
    loadImage,
} from "./utils";
import { watchThrottled } from "@vueuse/core";
import { throttle } from "lodash-es";
/**
 * TODO:
 * 1. 中英文翻译 DONE
 * 2. 布局提供三种选择 DONE
 * 3. 上传背景图 ？PASS
 * 4. 自由画板，调整大小
 * 5. 移动端？+ 微信API：直接分享朋友圈？PASS
 */
interface PreviewStyleConf {
    color: string;
    fontSize: number;
    bgColor: string;
    bgImage: string;
    bgSearchKeyWord: string;
    padding: number;
    textAlign: "left" | "right" | "center";
    vertical: "top" | "bottom" | "center";
    fontFamily: "regular" | "italic";
    language: "zh|en" | "en|zh" | "|";
}

const txt = ref("Sharing your favorite quotes to everyone!");
const subTxt = ref(txt.value);
const authorName = ref("Peter Yuan");
const bgImageIndex = ref(0);
const bgImages = ref([]);
const loadingShown = ref(false);
const previewStyleConf = ref<PreviewStyleConf>({
    color: "#000",
    fontSize: 60,
    bgColor: "#efede9",
    bgImage: "",
    padding: 24,
    textAlign: "center",
    vertical: "center",
    fontFamily: "italic",
    language: "en|zh",
    bgSearchKeyWord: "pure color",
});

const curLang = ref<"zh" | "en">("zh");

const curLayout = ref("left|right");

const translate = async () => {
    const [from, to] = previewStyleConf.value.language.split("|");
    if (from && to) {
        try {
            const translationTxt = await fetchTranslate(txt.value, from, to);
            console.log(translationTxt);
            subTxt.value = translationTxt as string;
        } catch (error) {
            // @ts-ignore
            alert(error.message);
        }
    } else {
        subTxt.value = txt.value;
    }
};

onMounted(() => {
    fetchBgPic();
    dragFunc(document.querySelector(".authorName")!);
    translate();
});

const onTarnslateChange = () => translate();

watchThrottled(txt, translate, { throttle: 2000 });

const onDownloadPic = () => {
    loadImage(previewStyleConf.value.bgImage).then((img) => {
        const preview = document.querySelector(".preview")! as HTMLDivElement;
        preview.style.backgroundImage = `url(${img})`;
        exportPic(preview);
    });
};

const fetchBgPic = () => {
    loadingShown.value = true;
    unsplash.search
        .getPhotos({
            query: previewStyleConf.value.bgSearchKeyWord,
            contentFilter: "high",
            page: 1,
            perPage: 100,
            orientation: "landscape",
            plus: "none",
        })
        .then((res) => {
            // @ts-ignore
            if (res.response.results.length > 0) {
                bgImageIndex.value = 0;
                // @ts-ignore
                bgImages.value = res.response?.results;
                previewStyleConf.value.bgImage =
                    // @ts-ignore
                    bgImages.value[bgImageIndex.value].urls.full;
            }
        })
        .finally(() => {
            let timer = setTimeout(() => {
                loadingShown.value = false;
                clearTimeout(timer);
                // @ts-ignore
                timer = null;
            }, 1000);
        });
};

const _fetchBgImages = throttle(fetchBgPic);

const refreshBgImage = (direction: string) => {
    if (bgImages.value.length) {
        if (direction === "next") {
            if (bgImageIndex.value === bgImages.value.length - 1) {
                bgImageIndex.value = 0;
            } else {
                bgImageIndex.value = bgImageIndex.value + 1;
            }
        } else {
            if (bgImageIndex.value === 0) {
                alert(
                    `${curLang.value === "en"
                        ? "Already is the first one"
                        : "已经是第一张了"
                    }`,
                );
            } else {
                bgImageIndex.value = bgImageIndex.value - 1;
            }
        }
        previewStyleConf.value.bgImage =
            // @ts-ignore
            bgImages.value[bgImageIndex.value].urls.full;
    }
};

const showSubTxt = computed(() => {
    return previewStyleConf.value.language !== "|";
});

const layoutStyle = computed(() => {
    if (curLayout.value === "left|right") {
        return "flex-direction:row";
    }
    if (curLayout.value === "right|left") {
        return "flex-direction:row-reverse";
    }
    return "";
});

const labelMap = computed(() => {
    return labelsLanguageMap[curLang.value];
});

const previewStyleObj = computed(() => {
    const { color, bgColor, fontSize, padding, textAlign, vertical, bgImage } =
        previewStyleConf.value;
    return {
        color,
        "background-color": bgColor,
        "background-image": `url(${bgImage})`,
        "font-size": `${fontSize}px`,
        padding: `${padding}px`,
        "align-items": vertical,
        "justify-content": textAlign,
    };
});

const txtClass = computed(() =>
    previewStyleConf.value.fontFamily === "italic"
        ? "im-fell-english-regular-italic"
        : "im-fell-english-regular",
);
</script>

<template>
    <div class="quote-sharing" :style="layoutStyle">
        <div class="title" id="first" v-if="curLayout !== 'fullscreen'"></div>
        <div class="content" id="second">
            <Loading v-if="loadingShown"></Loading>
            <div class="conf">
                <div>
                    <label for="layout">{{ labelMap["layout"] }}</label>
                    <select name="layout" id="layout" v-model="curLayout">
                        <option :value="item.value" v-for="item in layouts" :key="item.value">
                            {{ item[curLang] }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="lang">{{ labelMap["language"] }}</label>
                    <select name="lang" id="lang" v-model="curLang">
                        <option value="zh">中文</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div>
                    <label for="bgImage">
                        {{ labelMap["backgroundImage"] }}
                    </label>
                    <input id="bgImage" type="text" v-model="previewStyleConf.bgSearchKeyWord"
                        @change="_fetchBgImages" />
                    <div v-show="bgImages.length">
                        <label v-for="item in refreshLabels" :key="item.value" @click="refreshBgImage(item.value)"
                            style="
                                width: fit-content;
                                color: blue;
                                cursor: pointer;
                            " :title="item[curLang]">
                            {{ item.value === "next" ? "->" : "<-" }} </label>
                    </div>
                </div>
                <div>
                    <label for="color">{{ labelMap["textColor"] }}</label>
                    <input type="color" name="color" id="color" v-model="previewStyleConf.color" style="width: 147px" />
                </div>
                <div>
                    <label for="fontSize">{{ labelMap["fontSize"] }}</label>
                    <input type="range" name="fontSize" id="fontSize" v-model="previewStyleConf.fontSize" min="20"
                        max="100" step="2" />
                    <em>{{ previewStyleConf.fontSize }}</em>
                </div>
                <div>
                    <label for="fontFamily">{{ labelMap["fontFamily"] }}</label>
                    <select name="fontFamily" id="fontFamily" v-model="previewStyleConf.fontFamily">
                        <option :value="item.value" v-for="item in fontFalimies" :key="item[curLang]">
                            {{ item[curLang] }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="textAlign">{{ labelMap["textAlign"] }}</label>
                    <select name="textAlign" id="textAlign" v-model="previewStyleConf.textAlign">
                        <option :value="item.value" v-for="item in aligns" :key="item[curLang]">
                            {{ item[curLang] }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="translate">{{ labelMap["translate"] }}</label>
                    <select name="translate" id="translate" v-model="previewStyleConf.language"
                        @change="onTarnslateChange">
                        <option :value="item.value" v-for="item in languageList" :key="item[curLang]">
                            {{ item[curLang] }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="authorName">{{ labelMap["author"] }}</label>
                    <input id="authorName" type="text" v-model="authorName" />
                </div>
                <div class="last-button">
                    <button type="button" id="downloadBtn" @click="onDownloadPic">
                        {{ labelMap["download"] }}
                    </button>
                </div>
            </div>
            <textarea id="textarea" placeholder="Typein something and press Key Enter" v-model="txt"></textarea>
            <div class="preview" :style="previewStyleObj" id="preview">
                <div>
                    <div class="main-txt" :class="txtClass">
                        {{ txt }}
                    </div>
                    <div v-if="showSubTxt" class="sub-txt" :class="txtClass"
                        :style="`font-size:${previewStyleConf.fontSize / 2}px`">
                        {{ subTxt }}
                    </div>
                </div>
                <label id="author" v-show="authorName" class="authorName" :class="txtClass" :style="`color: ${previewStyleConf.color};font-size:${previewStyleConf.fontSize / 2.5
        }px`">
                    {{ authorName }}
                </label>
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
    background-color: #e9e5ca;

    .title {
        background-image: url(./title.svg);
        background-repeat: no-repeat;
        background-position: left;
        background-size: 100%;
        background-origin: padding-box;
        height: 100vh;
        width: 20%;
        min-width: 20%;
    }

    .content {
        width: 100%;
        height: 100vh;
        padding: 0 12px;
        display: flex;
        flex-direction: column;

        textarea {
            height: 40px;
            resize: none;
            margin-bottom: 12px;
            font-size: 16px;
            padding: 6px;
            border-radius: 6px;
        }

        .conf {
            border-radius: 6px;
            margin-top: 12px;
            flex: 2;
            background-color: #d4dae8;
            margin-bottom: 12px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            padding: 12px;
            grid-template-rows: repeat(3, 1fr);
            position: relative;

            div {
                display: flex;
                gap: 6px;
                align-items: center;

                label {
                    display: block;
                    width: 140px;
                    text-align: right;
                }

                select {
                    width: 147px;
                }
            }

            .last-button {
                grid-column-start: 3;
                display: flex;
                justify-content: flex-end;
            }
        }

        .preview {
            flex: 8;
            background-color: #efede9;
            margin-bottom: 12px;
            display: flex;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            background-origin: padding-box;
            position: relative;
            user-select: none;

            .authorName {
                font-size: 30px;
                cursor: grab;
                position: absolute;
                bottom: 30px;
                right: 30px;
            }

            .authorName::before {
                content: "——";
                display: inline-block;
                margin-right: 12px;
                resize: both;
            }

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
