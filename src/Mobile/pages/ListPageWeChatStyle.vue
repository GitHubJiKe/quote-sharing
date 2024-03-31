<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { CurrentUser, isMobileDevice, useAuthJudge, useFetchCardList, useQueryCurrentUser } from "../../utils";
import { useUserStore } from "../../store";
import { useRouter } from "vue-router";
import WeChatCard from "../components/WeChatCard.vue";
import { ArrowUpCircleSharp, ArrowUpCircleOutline } from '@vicons/ionicons5'
import { NIcon } from "naive-ui";
const bgImg = 'https://images.unsplash.com/photo-1489861408921-2f6a1e6c1155?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const userStore = useUserStore()
const currentUser = ref<CurrentUser>();

const isDark = useDark({
    'selector': 'body',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
})

const toggleDark = useToggle(isDark)

const isMobile = isMobileDevice()

const { fetchList, list } = useFetchCardList()


onMounted(() => {
    fetchList()
})


const router = useRouter()
const query = useQueryCurrentUser()

useAuthJudge(async () => {
    // logined
    currentUser.value = await query()!
    await fetchList()
    // levelObj.value = VIP_LEVEL_MAP[currentUser.value!.vipLevel]
}, () => {
    router.replace('/')
})

const toTop = () => {
    document.body.scrollTo({
        behavior: 'smooth',
        top: 0
    })
}

const showToTop = ref(false)

const handleBodyScroll = () => {
    if (document.body.scrollTop > 0) {
        showToTop.value = true
    } else {
        showToTop.value = false;
    }
}

document.body.addEventListener('scroll', handleBodyScroll)

onBeforeUnmount(() => {
    document.body.removeEventListener('scroll', handleBodyScroll)
})



</script>

<template>
    <div class="mx-auto" :class="{ 'w-full': isMobile, 'w-140': !isMobile }">
        <div class="h-76 bg-cover bg-center flex flex-col justify-between pt-2 mb-10"
            :style="`background-image:url(${bgImg})`">
            <div class="p-b-3 px-5 flex justify-between items-center">
                <div class="flex gap-2">
                    <div class="w-3 h-3 rounded-50% bg-red">

                    </div>
                    <div class="w-3 h-3 rounded-50% bg-yellow">

                    </div>
                    <div class="w-3 h-3 rounded-50% bg-green">

                    </div>
                </div>

                <div class="flex gap-3 text-white">
                    <i class="iconfont icon-refresh text-5 icons px-3 py-1 rounded"></i>
                    <i class="iconfont icon-bell text-5 icons  px-3 py-1 rounded"></i>
                    <i class="iconfont icon-camera text-5 icons  px-3  py-1 rounded"></i>
                </div>
            </div>
            <div class="flex justify-end p-r-6">
                <div class="flex items-center gap-3 relative top-3">
                    <label class="text-white text-4.8">{{ userStore.username }}</label>
                    <div class="rounded bg-cover bg-center w-15 h-15"
                        :style="`background-image: url(${userStore.avatar});`">

                    </div>
                </div>
            </div>
        </div>
        <div class="px-5 mb-10" :class="{ 'bg-white': !isDark, 'dark': isDark }" v-for="item in list" :key="item.id">
            <WeChatCard :item="item" :is-dark="isDark"></WeChatCard>
        </div>
        <i class="absolute right-4 bottom-4 iconfont cursor-pointer text-yellow text-6"
            :class="{ 'icon-moon': !isDark, 'icon-sun': isDark, }" @click="() => toggleDark()"></i>
        <NIcon :component="isDark ? ArrowUpCircleOutline : ArrowUpCircleSharp" @click="toTop" v-if="showToTop"
            class="absolute bottom-18 right-3 text-8 cursor-pointer">
        </NIcon>
    </div>
</template>

<style lang="less">
.wechat-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}

.wechat-content-box {
    ol {
        margin-top: 0px;
        margin-bottom: 0px;
    }
}

.icons:hover {
    background-color: rgba(0, 0, 0, 0.2);
}

.color-wechat-primary {
    color: #406088;
}

.bg-wechat-primary {
    background-color: #406088;
}

.heart-name::after {
    content: "，";
    color: #303030;
}

.heart-name:last-child::after {
    content: "";
}

.comment-name::after {
    content: "：";
    color: #303030;
}

.bg-wechat-gray {
    background-color: #f7f7f7;
}

.bg-wechat-gray-dark {
    background-color: rgba(20, 20, 20, 1)
}
</style>