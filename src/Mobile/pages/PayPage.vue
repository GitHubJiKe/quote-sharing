<script setup lang="ts">
import { VIP_LEVEL_MAP, bgcolors } from '../../constants'
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { isMobileDevice, useRandomBgColorIndex } from '../../utils';
import Title from './Title.vue';
import { useRouter } from "vue-router";
import { SHINING_TEXT } from '../../constants';
// import { toast } from 'vue3-toastify';
import QrcodeView from '../components/QrcodeView.vue'
import { ModalsContainer, useModal } from 'vue-final-modal'

const bgColorIndex = useRandomBgColorIndex();

const isMobile = isMobileDevice()

const bg = computed(() => {
    return bgcolors[bgColorIndex.value]
})
const type = ref(1);


const router = useRouter()

const onPay = (t: 1 | 2 | 3) => {
    type.value = t;
    const { open, close } = useModal({
        component: QrcodeView,
        attrs: {
            onConfirm() {
                close()
            },
            type: type.value
        },

    })
    open()
}


const goBack = () => {
    router.back()
}

onBeforeMount(() => {
    document.body.style.backgroundImage = `url(https://githubjike.github.io/images/uPic/pay_bg.jpg)`
    document.body.style.backgroundSize = 'cover'
})

onBeforeUnmount(() => {
    document.body.style.backgroundImage = ''
    document.body.style.backgroundSize = ''
})

const VIP1 = VIP_LEVEL_MAP[1]
const VIP2 = VIP_LEVEL_MAP[2]
const VIP3 = VIP_LEVEL_MAP[3]

</script>

<template>
    <div class="w-full flex flex-col h-full select-none h-dvh pay-page">
        <ModalsContainer />
        <header class="px-8 py-0 flex justify-between items-center b-b-0.5 b-solid b-white b-t-0 b-x-0 text-white">
            <h3 :style="`background-image:${bg}`" class="p-4 header-title cursor-pointer" @click="goBack">{{
                SHINING_TEXT }}
            </h3>
            <Title :bg="bg"></Title>
        </header>
        <main class="flex-1 content flex justify-center items-center p-x-4">
            <div class="flex justify-between" :style="`${isMobile ? 'gap:12px' : 'gap:60px'}`"
                :class="{ 'flex-col': isMobile }">
                <div class="rounded p-4 bg-neutral paycard">
                    <h1 class="text-white my-0">
                        白银
                    </h1>
                    <p class="text-5 text-white">
                        功能：
                    </p>
                    <ul class="text-3">
                        <li>最多可保存<b class="text-6 p-x-1 text-white">{{ VIP1.listMaxCount }}</b>个在线卡片</li>
                        <li>可选择<b class="text-6 p-x-1 text-white">{{ VIP1.templateCount }}</b>种模板</li>
                    </ul>
                    <div class="btn text-white bg-sky text-center p-y-2 cursor-pointer paybtn" @click="onPay(1)">
                        选择
                    </div>
                </div>
                <div class="rounded p-4 paycard"
                    style="background-image: linear-gradient(135deg, rgb(253, 235, 113) 10%, rgb(248, 216, 0) 100%);">
                    <h1 class="text-white my-0">
                        黄金
                    </h1>
                    <p class="text-5 text-white">
                        功能：
                    </p>
                    <ul class="text-3">
                        <li>最多可保存<b class="text-6 p-x-1 text-white">{{ VIP2.listMaxCount }}</b>个在线卡片</li>
                        <li>可选择<b class="text-6 p-x-1 text-white">{{ VIP2.templateCount }}</b>种模板</li>
                    </ul>
                    <div class="btn text-white bg-sky text-center p-y-2 cursor-pointer paybtn" @click="onPay(2)">
                        选择
                    </div>
                </div>
                <div class="rounded p-4 paycard"
                    :style="`background-image:linear-gradient(135deg, rgb(255, 150, 249) 10%, rgb(195, 43, 172) 100%)`">
                    <h1 class="text-white my-0">
                        铂金
                    </h1>
                    <p class="text-5 text-white">
                        功能：
                    </p>
                    <ul class="text-3">
                        <li>最多可保存<b class="text-6 p-x-1 text-white">{{ VIP3.listMaxCount }}</b>个在线卡片</li>
                        <li>可选择<b class="text-6 p-x-1 text-white">{{ VIP3.templateCount }}</b>种模板</li>
                    </ul>
                    <div class="btn text-white bg-sky text-center p-y-2 cursor-pointer paybtn" @click="onPay(3)">
                        选择
                    </div>
                </div>
            </div>
        </main>
        <footer class="text-center py-2 text-black text-3 bg-white">
            @{{ SHINING_TEXT }}
        </footer>
    </div>
</template>

<style lang="less" scoped>
.github {
    width: 30px;
}

.header-title {
    border-radius: 24px;
}

.btn {
    border-radius: 4px;
    color: #fff;
}

.wobble-hor-bottom {
    -webkit-animation: wobble-hor-bottom 0.8s both;
    animation: wobble-hor-bottom 0.8s both;
}

/* ----------------------------------------------
 * Generated by Animista on 2024-3-17 15:2:5
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation wobble-hor-bottom
 * ----------------------------------------
 */
@-webkit-keyframes wobble-hor-bottom {

    0%,
    100% {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
    }

    15% {
        -webkit-transform: translateX(-30px) rotate(-6deg);
        transform: translateX(-30px) rotate(-6deg);
    }

    30% {
        -webkit-transform: translateX(15px) rotate(6deg);
        transform: translateX(15px) rotate(6deg);
    }

    45% {
        -webkit-transform: translateX(-15px) rotate(-3.6deg);
        transform: translateX(-15px) rotate(-3.6deg);
    }

    60% {
        -webkit-transform: translateX(9px) rotate(2.4deg);
        transform: translateX(9px) rotate(2.4deg);
    }

    75% {
        -webkit-transform: translateX(-6px) rotate(-1.2deg);
        transform: translateX(-6px) rotate(-1.2deg);
    }
}

@keyframes wobble-hor-bottom {

    0%,
    100% {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
    }

    15% {
        -webkit-transform: translateX(-30px) rotate(-6deg);
        transform: translateX(-30px) rotate(-6deg);
    }

    30% {
        -webkit-transform: translateX(15px) rotate(6deg);
        transform: translateX(15px) rotate(6deg);
    }

    45% {
        -webkit-transform: translateX(-15px) rotate(-3.6deg);
        transform: translateX(-15px) rotate(-3.6deg);
    }

    60% {
        -webkit-transform: translateX(9px) rotate(2.4deg);
        transform: translateX(9px) rotate(2.4deg);
    }

    75% {
        -webkit-transform: translateX(-6px) rotate(-1.2deg);
        transform: translateX(-6px) rotate(-1.2deg);
    }
}


.shadow-pop-tr {
    -webkit-animation: shadow-pop-tr 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
    animation: shadow-pop-tr 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2024-3-17 14:58:57
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation shadow-pop-tr
 * ----------------------------------------
 */
@-webkit-keyframes shadow-pop-tr {
    0% {
        -webkit-box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
        box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
        -webkit-transform: translateX(0) translateY(0);
        transform: translateX(0) translateY(0);
    }

    100% {
        -webkit-box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e, 4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e, 8px -8px #3e3e3e;
        box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e, 4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e, 8px -8px #3e3e3e;
        -webkit-transform: translateX(-8px) translateY(8px);
        transform: translateX(-8px) translateY(8px);
    }
}

@keyframes shadow-pop-tr {
    0% {
        -webkit-box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
        box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
        -webkit-transform: translateX(0) translateY(0);
        transform: translateX(0) translateY(0);
    }

    100% {
        -webkit-box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e, 4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e, 8px -8px #3e3e3e;
        box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e, 4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e, 8px -8px #3e3e3e;
        -webkit-transform: translateX(-8px) translateY(8px);
        transform: translateX(-8px) translateY(8px);
    }
}

.paycard {}

.paycard:hover {
    .shadow-pop-tr()
}

.paybtn:hover {
    .wobble-hor-bottom()
}
</style>