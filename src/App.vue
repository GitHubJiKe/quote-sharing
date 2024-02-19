<script setup lang="ts">
import { ref, watchEffect } from 'vue';
// @ts-ignore
import CryptoJS from 'crypto-js';
// @ts-ignore
import html2canvas from 'html2canvas';
import fanyiConf from '../fanyi.json'
import blackSmoke from './assets/black-smoke.jpeg'
import blueWall from './assets/blue-wall.jpeg'
import brickWall from './assets/brick-wall.jpeg'
import grayWall from './assets/gray-wall.jpeg'
import whiteWall from './assets/white-wall.jpeg'
import woodStrip from './assets/wood-strip.jpeg'
import woodWall from './assets/wood-wall.jpeg'
import yellowWall from './assets/yellow-wall.jpeg'
import whiteBlueBrick from './assets/white-blue-brick.jpeg'
import flowerWall from './assets/flower-wall.jpeg'
import pinkWall from './assets/pink-wall.jpeg'
import avatarPic from './assets/avatar.png';

function jsonp(url: string, callbackName: string) {
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
const bgList = [
  {
    bg: blackSmoke,
    name: '深色烟雾',
  },
  {
    bg: blueWall,
    name: '蓝色石灰'
  },
  {
    bg: brickWall,
    name: '红色砖墙'
  },
  {
    bg: grayWall,
    name: '大理石板'
  },
  {
    bg: whiteWall,
    name: '白色砖墙'
  },
  {
    bg: woodStrip,
    name: '深色木条'
  },
  {
    bg: woodWall,
    name: '黄色木墙'
  },
  {
    bg: yellowWall,
    name: '黄色水泥'
  },
  {
    bg: whiteBlueBrick,
    name: '蓝色砖墙'
  },
  {
    bg: flowerWall,
    name: '花墙'
  },
  {
    bg: pinkWall,
    name: '粉色砖墙'
  }
]
const languageList = [
  {
    label: '汉译英',
    value: 'zh|en'
  },
  {
    label: '英译汉',
    value: 'en|zh'
  }
]

const APP_ID = fanyiConf.APPID
const SECRET = fanyiConf.SECRET
const FROM = ref('zh'), TO = ref('en');
const translatedContent = ref('')
const origonalContent = ref('')
const salt = (new Date).getTime();
const selectedBg = ref(blackSmoke);
const fontSize = ref('4')
const textColor = ref('white');
const language = ref('zh|en');
const avatar = ref(avatarPic);

const createSign = () => {
  const signStr = APP_ID + origonalContent.value + salt + SECRET;
  return CryptoJS.MD5(signStr).toString();
}

const encodeQueryContent = (c: string) => encodeURIComponent(c)

const queryStr = () => {
  return `?q=${encodeQueryContent(origonalContent.value)}&from=${FROM.value}&to=${TO.value}&appid=${APP_ID}&salt=${salt}&sign=${createSign()}`
}

watchEffect(() => {
  const [from, to] = language.value.split('|');
  FROM.value = from;
  TO.value = to;
})

watchEffect(() => {
  translatedContent.value = origonalContent.value;
})

const fetchTranslate = () => {
  if (!origonalContent.value) {
    return alert('Please type in something')
  }

  jsonp(`https://api.fanyi.baidu.com/api/trans/vip/translate/api${queryStr()}`, 'callback'
  ).then(res => {
    // @ts-ignore
    translatedContent.value = res.trans_result[0].dst;
  })

}

// @ts-ignore
const onBgChange = e => {
  selectedBg.value = e.target.value;
}
// @ts-ignore
const onFontSizeChange = e => {
  fontSize.value = (e.target.value);
}

// @ts-ignore
const onTextColorChnage = e => {
  textColor.value = e.target.value;
}

// @ts-ignore
const onLanguageChange = e => {
  language.value = e.target.value
}

const download = () => {
  if (!translatedContent.value) {
    return;
  }
  // 假设你想要将ID为"domElement"的DOM元素转换为图片
  html2canvas(document.getElementById("downloadContent")!).then(canvas => {
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

const onUploadAvatar = () => {
  const uploadInput = document.getElementById('avatar')!;
  uploadInput.click()
}
// @ts-ignore
const onAvatarChange = e => {
  avatar.value = URL.createObjectURL(e.target.files[0])
}

</script>

<template>
  <main style="position: relative;">
    <h1 class="im-fell-english-regular title">Quote Sharing</h1>
    <section class="operate-pane">
      <div class="operate-pane-item">
        <label for="bg">background：</label>
        <select name="bg" id="bg" @change="onBgChange">
          <option :value="item.bg" v-for="item in bgList" :key="item.name">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div style="margin-left: 1rem;" class="operate-pane-item">
        <label for="fontSize">font size:</label>
        <input type="range" name="fontSize" id="fontSize" v-model="fontSize" min="1" max="10" step="0.2"
          @change="onFontSizeChange">
        <label>{{ fontSize }}</label>
      </div>
      <div style="margin-left: 1rem;" class="operate-pane-item">
        <label for="textColor">text color:</label>
        <input type="color" name="textColor" id="textColor" v-model="textColor" @change="onTextColorChnage">
      </div>
      <div style="margin-left: 1rem;" class="operate-pane-item">
        <label for="language">language:</label>
        <select name="language" id="language" @change="onLanguageChange">
          <option :value="item.value" v-for="item in languageList" :key="item.label">
            {{ item.label }}
          </option>
        </select>
      </div>
    </section>
    <textarea class="quote-input" rows="4" v-model="origonalContent" placeholder="input your quote"></textarea>
    <div style="margin-top: 1.2rem;">
      <button type="button" @click="fetchTranslate">translate</button>
      <button type="button" @click="download" style="margin-left: 2rem;">download pic</button>
    </div>
    <div class="translated-content" id="downloadContent" :style="`background-image: url(${selectedBg});`">
      <p class="im-fell-english-regular inner-content" :style="`font-size:${fontSize}rem;color:${textColor}`">
        {{ translatedContent }}
      </p>
      <div class="avatar" :style="`background-image: url(${avatar});`" @click="onUploadAvatar">
      </div>
    </div>
    <input type="file" name="avatar" id="avatar" accept="image/png, image/jpeg" style="display: none;"
      @change="onAvatarChange">
  </main>
</template>

<style scoped>
.title {
  font-size: 6rem;
  margin-top: 0;
}


.operate-pane {
  padding: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.operate-pane-item {
  display: flex;
  align-items: center;
}

#bg {
  width: 10rem;
  padding: 0.4rem;
  border-radius: 0.4rem;
}

#fontSize {
  width: 10rem;
  margin-left: 1rem;
}

#textColor {
  margin-left: 1rem;
}

#language {
  margin-left: 1rem;
  width: 10rem;
  padding: 0.4rem;
  border-radius: 0.4rem;
}

.quote-input {
  border-radius: 0.8rem;
  width: 80vw;
  padding: 0.8rem;
  font-size: 1.5rem;
  resize: none;
}

.translated-content {
  margin-top: 1.2rem;
  font-size: 4rem;
  font-weight: 900;
  padding: 0.8rem;
  width: 80vw;
  min-height: 40vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-origin: border-box;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-content {
  margin-left: 5rem;
}

.avatar {
  width: 6.6rem;
  height: 6.6rem;
  border-radius: 50%;
  border: .2rem solid white;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  bottom: 4rem;
  right: 28rem;
  cursor: pointer;
}
</style>
