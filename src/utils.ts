// @ts-ignore
import CryptoJS from "crypto-js";
// @ts-ignore
import html2canvas from "html2canvas";
import { UNSPLASH, BAIDU_FANYI } from "../conf.json";
import { createApi } from "unsplash-js";
import { debounce } from "lodash-es";
import { useMediaQuery } from "@vueuse/core";
import { getAuthUser, queryDocument, uploadFileByBytes } from "./firebase";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { bgcolors } from "./constants";
import { useUserStore } from "./store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLoading } from "vue-loading-overlay";
import { orderBy } from "firebase/firestore";

export const unsplash = createApi({ accessKey: UNSPLASH.ACCESS_KEY });

export function jsonp(url: string, callbackName = "callback") {
    return new Promise((resolve, reject) => {
        // 创建全局回调函数
        // @ts-ignore
        window[callbackName] = function (data) {
            resolve(data);
            // 清理
            document.body.removeChild(script);
            // @ts-ignore
            delete window[callbackName];
        };

        // 创建 script 标签并添加到页面
        const script = document.createElement("script");
        script.src = `${url}&callback=${callbackName}`;
        document.body.appendChild(script);

        // 设置超时处理
        script.onerror = function () {
            reject(new Error(`JSONP request to ${url} failed`));
            // 清理
            document.body.removeChild(script);
            // @ts-ignore
            delete window[callbackName];
        };
    });
}
const APP_ID = BAIDU_FANYI.APP_ID,
    SECRET = BAIDU_FANYI.SECRET;
const createSign = (txt: string) => {
    const signStr = APP_ID + txt + Date.now() + SECRET;
    return CryptoJS.MD5(signStr).toString();
};
const encodeQueryContent = (c: string) => encodeURIComponent(c);
const queryStr = (txt: string, from: string, to: string) => {
    return `?q=${encodeQueryContent(
        txt
    )}&from=${from}&to=${to}&appid=${APP_ID}&salt=${Date.now()}&sign=${createSign(
        txt
    )}`;
};
export const fetchTranslate = (txt: string, from = "zh", to = "en") => {
    if (!txt) {
        return;
    }

    return new Promise((resolve, reject) => {
        jsonp(
            `https://api.fanyi.baidu.com/api/trans/vip/translate/api${queryStr(
                txt,
                from,
                to
            )}`,
            "callback"
        )
            .then((res) => {
                // @ts-ignore
                if (res.error_msg) {
                    // @ts-ignore
                    reject(new Error(res.error_msg));
                }
                // @ts-ignore
                resolve(res.trans_result[0].dst);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export function exportPic(ele: HTMLDivElement) {
    // 假设你想要将ID为"domElement"的DOM元素转换为图片
    return html2canvas(ele, {
        allowTaint: true,
        logging: true,
        width: ele.clientWidth,
        height: ele.clientHeight - 2,
        useCORS: true,
    }).then((canvas) => {
        // 将canvas转换为图片
        const image = canvas.toDataURL("image/png");

        // 创建一个链接元素用于下载
        const downloadLink = document.createElement("a");
        downloadLink.href = image;
        downloadLink.download = "分享.png";

        // 触发下载
        downloadLink.click();
        Promise.resolve("OK");
    });
}

function dataURLToBlob(dataURL: string) {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
}

export function genFileAndUpload(ele: HTMLDivElement, datetime: string) {
    return new Promise((resolve, reject) => {
        html2canvas(ele, {
            allowTaint: true,
            logging: true,
            width: ele.clientWidth,
            height: ele.clientHeight,
            useCORS: true,
        })
            .then(async (canvas) => {
                // Convert canvas to data URL
                const dataURL = canvas.toDataURL();
                // Convert data URL to Blob
                const blob = dataURLToBlob(dataURL);

                // Upload Blob to Google Cloud Storage
                const result = await uploadFileByBytes({
                    file: blob,
                    filename: datetime,
                    path: "quotes",
                });

                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export const genPIic2Download = (element: HTMLDivElement) => {
    // 创建一个 Canvas 元素
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    // 设置 Canvas 尺寸为元素尺寸
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;

    // 将 DOM 元素绘制到 Canvas 上
    const html =
        "<svg xmlns='http://www.w3.org/2000/svg' width='" +
        element.offsetWidth +
        "' height='" +
        element.offsetHeight +
        "'>" +
        "<foreignObject width='100%' height='100%'>" +
        "<div xmlns='http://www.w3.org/1999/xhtml'>" +
        element.innerHTML +
        "</div>" +
        "</foreignObject>" +
        "</svg>";

    const DOMURL = window.URL || window.webkitURL || window;
    const img = new Image();
    const svg = new Blob([html], { type: "image/svg+xml;charset=utf-8" });
    const url = DOMURL.createObjectURL(svg);

    img.onload = function () {
        context.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        // 将 Canvas 转换为 Base64 图片数据
        const imageData = canvas.toDataURL("image/png");

        // 创建一个下载链接并设置图片数据
        const link = document.createElement("a");
        link.href = imageData;
        link.download = "element_image.png";

        // 触发点击下载
        link.click();
    };

    img.src = url;
};

export function dragFunc(draggable: HTMLElement) {
    // 获取需要拖拽的元素及其父元素
    let container = draggable.parentNode!;
    // 初始化用于存储鼠标开始拖拽时的坐标
    let startX: number, startY: number;

    // 鼠标按下事件
    draggable.addEventListener("mousedown", function (e) {
        // 获取鼠标在页面中的位置，并记录下来
        startX = e.clientX;
        startY = e.clientY;

        // 监听鼠标移动事件
        document.addEventListener("mousemove", mouseMove);

        // 监听鼠标松开事件
        document.addEventListener("mouseup", mouseUp);
    });

    // 鼠标移动事件
    function mouseMove(e: { clientX: number; clientY: number }) {
        // 计算鼠标的新位置与初始位置的差值
        let deltaX = e.clientX - startX;
        let deltaY = e.clientY - startY;

        // 计算元素的新位置
        let newLeft = draggable.offsetLeft + deltaX;
        let newTop = draggable.offsetTop + deltaY;

        // 获取父元素的宽度和高度
        // @ts-ignore
        let containerWidth = container.clientWidth;
        // @ts-ignore
        let containerHeight = container.clientHeight;
        // 获取可拖拽元素的宽度和高度
        let draggableWidth = draggable.offsetWidth;
        let draggableHeight = draggable.offsetHeight;

        // 确保元素不会移出父元素的左边界
        newLeft = Math.max(newLeft, 0);
        // 确保元素不会移出父元素的右边界
        newLeft = Math.min(newLeft, containerWidth - draggableWidth);

        // 确保元素不会移出父元素的上边界
        newTop = Math.max(newTop, 0);
        // 确保元素不会移出父元素的下边界
        newTop = Math.min(newTop, containerHeight - draggableHeight);

        // 设置元素的新位置
        draggable.style.left = newLeft + "px";
        draggable.style.top = newTop + "px";

        // 更新鼠标的开始位置
        startX = e.clientX;
        startY = e.clientY;
    }

    // 鼠标松开事件
    function mouseUp() {
        // 移除鼠标移动和松开事件的监听
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    }
}

export function loadImage(url: string) {
    return new Promise(function (resolve, reject) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function () {
            resolve(imageToBase64(img));
        };
        img.onerror = function () {
            reject(new Error("Failed to load image"));
        };
        img.src = url;
    });
}
function imageToBase64(img: HTMLImageElement) {
    // 创建一个 Canvas 元素
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    // 设置 Canvas 元素的大小与图像大小相同
    canvas.width = img.width;
    canvas.height = img.height;

    // 在 Canvas 上绘制图像
    ctx.drawImage(img, 0, 0);

    // 将 Canvas 中的图像转换为 Base64 字符串
    const base64 = canvas.toDataURL("image/jpeg"); // 指定图片格式，如 'image/png' 或 'image/jpeg'

    return base64;
}

// 以1920px 底图为准开发页面
export const setDomFontSize = (): void => {
    let width =
        document.documentElement.clientWidth || document.body.clientWidth;
    let fontsize = (width <= 1200 ? 1200 : width) / 100 + "px";
    (document.getElementsByTagName("html")[0].style as any)["font-size"] =
        fontsize;
};

let setDomFontSizeDebounce = debounce(setDomFontSize, 400);
window.addEventListener("resize", setDomFontSizeDebounce); // 浏览器加入收缩监听防抖，重新计算rem配置

export function isMobileDevice() {
    const res = useMediaQuery("(max-width: 480px)");
    return res.value.valueOf();
}

export function useRandomBgColorIndex(time: number = 5000) {
    const bgColorIndex = ref(1);
    let timer;
    const autoSwitchBgColor = () => {
        const len = bgcolors.length;
        bgColorIndex.value = Math.floor(Math.random() * len);
    };
    onMounted(() => {
        timer = setInterval(() => {
            autoSwitchBgColor();
        }, time);
    });
    onBeforeUnmount(() => {
        clearInterval(timer!);
        timer = null;
    });

    return bgColorIndex;
}

export function useAuthJudge(logined: () => void, logouted: () => void) {
    const userStore = useUserStore();

    const syncUserInfo = () => {
        const user = getAuthUser()!;
        if (user) {
            userStore.username = user.displayName!;
            userStore.avatar = user.photoURL!;
            userStore.email = user.email!;
        }
    };

    onMounted(() => {
        onAuthStateChanged(getAuth(), async (user) => {
            if (user) {
                // logined
                logined();
                syncUserInfo();
            } else {
                logouted();
            }
        });
    });
}

export function useBodyBgColor() {
    const setBodyBlack = () => {
        document.body.style.backgroundColor = "#000000";
    };

    const setBodyWhite = () => {
        document.body.style.backgroundColor = "#FFFFFF";
    };

    onMounted(() => {
        setBodyBlack();
    });

    onBeforeUnmount(() => {
        setBodyWhite();
    });
}

export interface CurrentUser {
    accessToken: string;
    displayName: string;
    email: string;
    isAnonymous: boolean;
    phoneNumber: string;
    photoURL: string;
    refreshToken: string;
    token: string;
    uid: string;
    vipLevel: number;
    exteraCardCount: number;
}
export function useQueryCurrentUser() {
    return async () => {
        const user = getAuthUser()!;
        const result = await queryDocument("user", [
            {
                op: "",
                conditions: [
                    {
                        field: "email",
                        op: "==",
                        value: user?.email!,
                    },
                ],
            },
        ]);
        if (result && !result?.empty) {
            return result.docs.map((doc) => {
                return doc.data();
            })[0] as CurrentUser;
        }
    };
}

export interface DocItem {
    email: string;
    datetime: string;
    picURL: string;
    content: string;
    id: string;
}
export function useFetchCardList() {
    const loading = useLoading();
    const list = ref<DocItem[]>([]);
    const fetchList = async () => {
        const user = getAuthUser();
        if (user) {
            const loader = loading.show();
            const isTest = location.href.includes("localhost");
            const conditions = isTest
                ? [
                      {
                          field: "email",
                          op: "==",
                          value: user?.email!,
                      },
                      {
                          field: "env",
                          op: "==",
                          value: "test",
                      },
                  ]
                : [
                      {
                          field: "email",
                          op: "==",
                          value: user?.email!,
                      },
                  ];
            const result = await queryDocument(
                "quotes",
                [
                    // @ts-ignore
                    { op: isTest ? "and" : "", conditions },
                ],
                orderBy("datetime", "desc")
            );
            if (result) {
                list.value = result.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    } as DocItem;
                });
            }
            loader.hide();
        }
    };

    return { fetchList, list };
}
