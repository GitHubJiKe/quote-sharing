<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '../../store';
import { fakeNames, isMobileDevice } from '../../utils';
import { NImage } from "naive-ui";


defineProps<{ isDark: boolean; item: { content: string; picURL: string; } }>()
const userStore = useUserStore()
const showAll = ref(false);

const getNames = () => fakeNames(Math.floor(Math.random() * 30));

const names = getNames()

const toogleShowAll = () => {
    showAll.value = !showAll.value;
}

const isMobile = isMobileDevice()

const fakerComment = computed(() => {
    return ['真酷！😎', '真棒！👍🏻', '真帅！🐴'][Math.floor(Math.random() * 3)]
})

const contentRef = ref();
const showToggleAll = ref(false);

onMounted(() => {
    const textContainer = (contentRef.value as HTMLDivElement)
    const computedStyle = window.getComputedStyle(textContainer);
    showToggleAll.value = Math.ceil(parseFloat(computedStyle.height) / parseFloat(computedStyle.lineHeight)) >= 4;
})

</script>

<template>
    <div class="flex gap-3">
        <div>
            <div class="rounded bg-cover bg-center w-12 h-12" :style="`background-image: url(${userStore.avatar});`">

            </div>
        </div>
        <div class="flex-1 flex gap-1 flex-col">
            <div class="fw-500 text-4 color-wechat-primary">
                {{ userStore.username }}
            </div>
            <div v-html="item.content" class="wechat-content-box" ref="contentRef"
                :class="{ 'wechat-content': !showAll, 'text-black': !isDark, 'text-white': isDark }">
            </div>
            <div class="color-wechat-primary cursor-pointer " @click="toogleShowAll" v-if="showToggleAll">
                {{ showAll ? '收起' : '全文' }}
            </div>
            <div>
                <NImage :src="item.picURL" :width="isMobile ? 280 : 340"></NImage>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex gap-3">
                    <div class="text-gray">
                        1小时前
                    </div>
                    <div class="color-wechat-primary cursor-pointer">
                        删除
                    </div>
                </div>
                <div :class="{ 'bg-wechat-gray-dark': isDark, 'bg-wechat-gray': !isDark }"
                    class="w-10 h-5 rounded flex justify-center items-center gap-1 cursor-pointer">
                    <div class="w-1 h-1 rounded-50% bg-wechat-primary"></div>
                    <div class="w-1 h-1 rounded-50% bg-wechat-primary"></div>
                </div>
            </div>
            <div class="rounded-0.4 flex-1 mt-2 px-3 py-2"
                :class="{ 'bg-wechat-gray-dark': isDark, 'bg-wechat-gray': !isDark }">
                <div class="flex flex-wrap items-center">
                    <i class="iconfont icon-heart color-wechat-primary text-6 mr-2"></i>
                    <label class="color-wechat-primary heart-name cursor-pointer" v-for="name in names" :key="name">
                        {{ name }}
                    </label>
                </div>
                <div class="mt-2">
                    <label class="color-wechat-primary comment-name cursor-pointer">{{ names[0] }}</label>
                    {{ fakerComment }}
                </div>
            </div>
        </div>
    </div>
</template>