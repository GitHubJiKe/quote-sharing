<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { NImage } from "naive-ui";
import { onMounted, ref } from "vue";
import { CurrentUser, fakeNames, isMobileDevice, useAuthJudge, useFetchCardList, useQueryCurrentUser } from "../../utils";
import { useUserStore } from "../../store";
import { useRouter } from "vue-router";
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

const getNames = () => fakeNames(Math.floor(Math.random() * 30))
</script>

<template>
    <div class="w-140 mx-auto" :class="{ 'w-full': isMobile, 'w-140': !isMobile }">
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
            <div class="flex gap-3">
                <div>
                    <div class="rounded bg-cover bg-center w-12 h-12"
                        :style="`background-image: url(${userStore.avatar});`">

                    </div>
                </div>
                <div class="flex-1 flex gap-1 flex-col">
                    <div class="fw-500 text-4 color-wechat-primary">
                        {{ userStore.username }}
                    </div>
                    <div v-html="item.content">
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
                            <label class="color-wechat-primary heart-name" v-for="name in getNames()" :key="name">
                                {{ name }}
                            </label>
                        </div>
                        <!-- <div class="mt-2">
                            <label class="color-wechat-primary comment-name">小明</label>
                            真帅！
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <i class="absolute right-4 bottom-4 iconfont cursor-pointer text-yellow text-6"
            :class="{ 'icon-moon': !isDark, 'icon-sun': isDark, }" @click="() => toggleDark()"></i>
    </div>
</template>

<style lang="less" scoped>
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