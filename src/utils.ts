// @ts-ignore
import CryptoJS from 'crypto-js';
// @ts-ignore
import html2canvas from 'html2canvas';

export function jsonp(url: string, callbackName = 'callback') {
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
        const script = document.createElement('script');
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
const APP_ID = '20240219001966997', SECRET = 'wihILJ4pkBH6h1aQg3rK';
const createSign = (txt: string) => {
    const signStr = APP_ID + txt + Date.now() + SECRET;
    return CryptoJS.MD5(signStr).toString();
}
const encodeQueryContent = (c: string) => encodeURIComponent(c)
const queryStr = (txt: string, from: string, to: string) => {
    return `?q=${encodeQueryContent(txt)}&from=${from}&to=${to}&appid=${APP_ID}&salt=${Date.now()}&sign=${createSign(txt)}`
}
export const fetchTranslate = (txt: string, from = 'zh', to = 'en') => {
    if (!txt) {
        return
    }

    return new Promise((resolve, reject) => {
        jsonp(`https://api.fanyi.baidu.com/api/trans/vip/translate/api${queryStr(txt, from, to)}`, 'callback'
        ).then(res => {
            // @ts-ignore
            if (res.error_msg) {
                // @ts-ignore
                reject(new Error(res.error_msg))
            }
            // @ts-ignore
            resolve(res.trans_result[0].dst)
        }).catch(err => {
            reject(err)
        })
    })

}

export function exportPic(ele: HTMLDivElement) {
    // 假设你想要将ID为"domElement"的DOM元素转换为图片
    html2canvas(ele).then(canvas => {
        // 将canvas转换为图片
        const image = canvas.toDataURL("image/png");

        // 创建一个链接元素用于下载
        const downloadLink = document.createElement('a');
        downloadLink.href = image;
        downloadLink.download = 'dom-image.png';

        // 触发下载
        downloadLink.click();
    });
}