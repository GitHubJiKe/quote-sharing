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

export function dragFunc(draggable: HTMLElement) {
    // 获取需要拖拽的元素及其父元素
    let container = draggable.parentNode!;
    // 初始化用于存储鼠标开始拖拽时的坐标
    let startX: number, startY: number;

    // 鼠标按下事件
    draggable.addEventListener('mousedown', function (e) {
        // 获取鼠标在页面中的位置，并记录下来
        startX = e.clientX;
        startY = e.clientY;

        // 监听鼠标移动事件
        document.addEventListener('mousemove', mouseMove);

        // 监听鼠标松开事件
        document.addEventListener('mouseup', mouseUp);
    });

    // 鼠标移动事件
    function mouseMove(e: { clientX: number; clientY: number; }) {
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
        draggable.style.left = newLeft + 'px';
        draggable.style.top = newTop + 'px';

        // 更新鼠标的开始位置
        startX = e.clientX;
        startY = e.clientY;
    }

    // 鼠标松开事件
    function mouseUp() {
        // 移除鼠标移动和松开事件的监听
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }

}