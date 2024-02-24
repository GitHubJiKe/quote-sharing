<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Loading from "./Loading.vue";
import {
    fontFalimies,
    aligns,
    languageList,
    labelsLanguageMap,
    layouts,
} from "./constants";
import {
    fetchTranslate,
    exportPic,
    dragFunc,
    unsplash,
    loadImage,
} from "./utils";
import { watchThrottled } from "@vueuse/core";
/**
 * TODO:
 * 1. 中英文翻译
 * 2. 布局提供三种选择
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

const generatePreviewStyleObj = () => {
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
};

const getTxtClass = () =>
    previewStyleConf.value.fontFamily === "italic"
        ? "im-fell-english-regular-italic"
        : "im-fell-english-regular";

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
const showSubTxt = computed(() => {
    return previewStyleConf.value.language !== "|";
});

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

const refreshBgImage = () => {
    if (bgImages.value.length) {
        if (bgImageIndex.value === bgImages.value.length - 1) {
            bgImageIndex.value = 0;
        } else {
            bgImageIndex.value = bgImageIndex.value + 1;
        }
        previewStyleConf.value.bgImage =
            // @ts-ignore
            bgImages.value[bgImageIndex.value].urls.full;
    }
};

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
                        <option
                            :value="item.value"
                            v-for="item in layouts"
                            :key="item.value"
                        >
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
                    <input
                        id="bgImage"
                        type="text"
                        v-model="previewStyleConf.bgSearchKeyWord"
                    />
                    <button @click="fetchBgPic" style="width: 60px">
                        {{ labelMap["search"] }}
                    </button>
                    <div
                        class="refresh-icon"
                        @click="refreshBgImage"
                        v-show="bgImages.length"
                        id="refreshIcon"
                    >
                        <svg
                            t="1708748137868"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="1680"
                            id="mx_n_1708748137868"
                            data-spm-anchor-id="a313x.search_index.0.i6.676a3a81xaxbWH"
                            width="30"
                            height="30"
                        >
                            <path
                                d="M733.04 379.104a264.112 264.112 0 0 0-468.112 41.76 14.336 14.336 0 0 1-17.968 8.16l-20.256-7.008a12.352 12.352 0 0 1-7.456-16.192 312.112 312.112 0 0 1 556.736-48.56l12.704-44.352a16 16 0 0 1 7.632-9.584l24.752-13.712a14.464 14.464 0 0 1 20.912 16.64l-38.128 132.96a11.136 11.136 0 0 1-13.76 7.632l-132.96-38.128a14.464 14.464 0 0 1-3.04-26.56l24.752-13.712a16 16 0 0 1 12.16-1.392l42.032 12.048z m-447.52 280.352a264.112 264.112 0 0 0 468.112-41.76 14.336 14.336 0 0 1 17.968-8.16l20.256 7.008a12.352 12.352 0 0 1 7.44 16.176c-46.368 118.032-160.8 199.072-290.432 199.072-110.96 0-210.768-59.296-266.304-150.432l-12.704 44.288a16 16 0 0 1-7.616 9.584l-24.752 13.712a14.464 14.464 0 0 1-20.928-16.64l38.128-132.96a11.136 11.136 0 0 1 13.76-7.632l132.976 38.128a14.464 14.464 0 0 1 3.04 26.56l-24.768 13.712a16 16 0 0 1-12.16 1.392l-42.016-12.048z"
                                p-id="1681"
                                data-spm-anchor-id="a313x.search_index.0.i8.676a3a81xaxbWH"
                                class=""
                            ></path>
                        </svg>
                    </div>
                </div>
                <div>
                    <label for="color">{{ labelMap["textColor"] }}</label>
                    <input
                        type="color"
                        name="color"
                        id="color"
                        v-model="previewStyleConf.color"
                        style="width: 147px"
                    />
                </div>
                <div>
                    <label for="fontSize">{{ labelMap["fontSize"] }}</label>
                    <input
                        type="range"
                        name="fontSize"
                        id="fontSize"
                        v-model="previewStyleConf.fontSize"
                        min="20"
                        max="100"
                        step="2"
                    />
                    <em>{{ previewStyleConf.fontSize }}</em>
                </div>
                <div>
                    <label for="fontFamily">{{ labelMap["fontFamily"] }}</label>
                    <select
                        name="fontFamily"
                        id="fontFamily"
                        v-model="previewStyleConf.fontFamily"
                    >
                        <option
                            :value="item.value"
                            v-for="item in fontFalimies"
                            :key="item[curLang]"
                        >
                            {{ item[curLang] }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="textAlign">{{ labelMap["textAlign"] }}</label>
                    <select
                        name="textAlign"
                        id="textAlign"
                        v-model="previewStyleConf.textAlign"
                    >
                        <option
                            :value="item.value"
                            v-for="item in aligns"
                            :key="item[curLang]"
                        >
                            {{ item[curLang] }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="translate">{{ labelMap["translate"] }}</label>
                    <select
                        name="translate"
                        id="translate"
                        v-model="previewStyleConf.language"
                        @change="onTarnslateChange"
                    >
                        <option
                            :value="item.value"
                            v-for="item in languageList"
                            :key="item[curLang]"
                        >
                            {{ item[curLang] }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="authorName">{{ labelMap["author"] }}</label>
                    <input id="authorName" type="text" v-model="authorName" />
                </div>

                <div class="last-button">
                    <button
                        type="button"
                        id="downloadBtn"
                        @click="onDownloadPic"
                    >
                        {{ labelMap["download"] }}
                    </button>
                </div>
            </div>
            <textarea
                id="textarea"
                placeholder="Typein something and press Key Enter"
                v-model="txt"
            ></textarea>

            <div
                class="preview"
                :style="generatePreviewStyleObj()"
                id="preview"
            >
                <div>
                    <div class="main-txt" :class="getTxtClass()">
                        {{ txt }}
                    </div>
                    <div
                        v-if="showSubTxt"
                        class="sub-txt"
                        :class="getTxtClass()"
                        :style="`font-size:${previewStyleConf.fontSize / 2}px`"
                    >
                        {{ subTxt }}
                    </div>
                </div>
                <label
                    id="author"
                    v-show="authorName"
                    class="authorName"
                    :class="getTxtClass()"
                    :style="`color: ${previewStyleConf.color};font-size:${
                        previewStyleConf.fontSize / 2.5
                    }px`"
                >
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
        .refresh-icon {
            width: 30px;
            height: 30px;
            cursor: pointer;
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
