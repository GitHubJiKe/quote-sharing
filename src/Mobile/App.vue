<script setup lang="ts">
import { exportPic } from "../utils";
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalView from './ModalView.vue'
import Header from './Header.vue';
import Opeartor from "./Operator/Opeartor.vue";
import { useMobileStore } from './store'
import { storeToRefs } from 'pinia'
import Clean from './Template/Clean.vue';
import Fashion from './Template/Fashion.vue';

const store = useMobileStore()
const { authorLineShow } = storeToRefs(store)
const onShare = () => {
    const preview = document.querySelector("#content")! as HTMLDivElement;
    const textareaEl = preview.querySelector('textarea')!
    const preEl = document.createElement('pre')!
    const textsStyleStr = `font-size: 14px;
            margin-top:0;
            margin-bottom:0;
            font-weight: 400;
            letter-spacing: 2px;
            min-height: 100px;
            padding: 4px;
            white-space: pre-wrap; 
            overflow-wrap: break-word;
            line-height: 24px;
            margin-left: 18px;
            margin-right: 18px;
            border: none;
            resize: none;`
    preEl.style.cssText = textsStyleStr;
    preEl.innerHTML = textareaEl.value.replace(/\n/g, '<br>');
    textareaEl.insertAdjacentElement('beforebegin', preEl);
    textareaEl.style.display = 'none';
    const nameEl = document.querySelector('.name')! as HTMLDivElement;
    if (authorLineShow.value?.show && nameEl?.innerHTML === '点击输入') {
        nameEl.style.display = "none"
    }
    exportPic(preview).then(() => {
        nameEl.style.display = ""
        preEl.remove()
        textareaEl.style.display = ""
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

</script>

<template>
    <div class="quote-sharing">
        <ModalsContainer />
        <div>
            <Header @help="open" @share="onShare" />
            <Clean v-if="store.temp === 'Clean'" />
            <Fashion v-if="store.temp === 'Fashion'" />
        </div>
        <Opeartor />
    </div>
</template>

<style lang="less" scoped>
.quote-sharing {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 40px;
    background-color: #000;




}
</style>

<style>
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
</style>./Template/Clean.vue./Template/Fasion.vue