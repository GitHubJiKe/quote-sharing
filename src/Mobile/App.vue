<script setup lang="ts">
import { exportPic } from "../utils";
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalView from './ModalView.vue'
import Header from './Header.vue';
import Opeartor from "./Operator/Opeartor.vue";
import { useMobileStore } from './store'
import { storeToRefs } from 'pinia'
import Template1 from './Template/Template1.vue';

const store = useMobileStore()
const { authorLineShow } = storeToRefs(store)
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
</script>

<template>
    <div class="quote-sharing">
        <ModalsContainer />
        <div>
            <Header @help="open" @share="onShare" />
            <Template1 />
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
</style>