<script setup lang="ts">
import { computed, ref } from 'vue';
import { CurrentUser, useFetchCardList, isMobileDevice, useAuthJudge, useBodyBgColor, useQueryCurrentUser, useRandomBgColorIndex } from '../../utils';
import { useRouter } from "vue-router";
import { SHINING_TEXT, VIP_LEVEL_MAP, bgcolors } from '../../constants'
import { useUserStore } from '../../store';
import { NImage } from 'naive-ui';

const bgColorIndex = useRandomBgColorIndex();
const isMobile = isMobileDevice()
const router = useRouter()

useBodyBgColor()


const { fetchList, list } = useFetchCardList()
const bg = computed(() => {
    return bgcolors[bgColorIndex.value]
})

const queryCurrentUser = useQueryCurrentUser()

useAuthJudge(async () => {
    // logined
    await fetchList()
    currentUser.value = (await queryCurrentUser())!
    levelObj.value = VIP_LEVEL_MAP[currentUser.value.vipLevel]
}, () => {
    router.replace('/')
})

const userStore = useUserStore()

const gotoShare = () => {
    router.push('/writing')
}



const levelObj = ref({
    maxContentLength: 40,
    listMaxCount: 0,
    templateCount: 1,
    money: 0,
})

const currentUser = ref<CurrentUser>()

const getUserNameClass = () => {
    if (!currentUser.value) {
        return ''
    }

    switch (currentUser.value.vipLevel) {
        case -1:
            return ''
        case 0:
            return 'text-red fw-900'
        case 1:
            return 'text-green fw-400'
        case 2:
            return 'text-blue fw-600'
        case 3:
            return 'text-yellow fw-800'
        default:
            return ''
    }
}

const userNameClass = computed(() => {
    return getUserNameClass();
})

const getUserLevel = () => {
    if (levelObj.value.listMaxCount < Number.MAX_VALUE) {
        return levelObj.value.listMaxCount - list.value.length;
    }

    return '∞'
}

const gotoPay = () => {
    router.push('/payment')
}

</script>

<template>
    <div class="px-2 py-0  card-box h-full bg-black">
        <div class="flex absolute bottom-20 info-card right-0">
            <header class="flex bg-white p-2 header-bar items-center flex-col relative" style="z-index: 9999;">
                <div class="flex flex-col items-center justify-center">
                    <img :src="userStore.avatar" alt="avatar" srcset="" class="avatar">
                    <label class="username" :class="userNameClass">
                        {{ userStore.username }}
                    </label>
                    <i class="iconfont icon-vip" :class="userNameClass"></i>
                    <label class="m-b-1">
                        剩余： {{ getUserLevel() }} 卡片
                    </label>
                </div>
                <div class="flex" :class="{ 'flex-col': isMobile }" style="gap:4px">
                    <div @click="gotoShare"
                        class="btn py-1 px-2 cursor-pointer flex items-center text-black bg-gray-100">
                        返回分享
                    </div>
                    <div @click="gotoPay" class="btn py-1 px-2 cursor-pointer flex items-center"
                        :style="`background-image:${bg}`">
                        立即充值
                    </div>
                </div>
            </header>
        </div>

        <div class="flex m-t-2  flex-col justify-center items-center" style="gap: 12px;"
            :class="{ 'p-x-140': !isMobile }">
            <div v-if="list.length === 0" class="text-white text-6 absolute top-100">
                空空荡荡~~，快去{{ SHINING_TEXT }}
            </div>
            <template v-else>
                <div v-for="(item, idx) in list" :key="item.id"
                    class="shining-card p-x-3 p-t-3 bg-white flex justify-center items-center m-b-4">
                    <div class="flex-1 flex flex-col">
                        <NImage lazy :src="item.picURL" alt="shining card" :width="`100%`" class="flex-1" />
                        <p class="p-y-1 m-0 b-0 text-center text-gray-300">{{ idx + 1 }}</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="less">
.card-box {
    flex-wrap: wrap;

    label {
        font-size: 24px;
    }

    .header-bar {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .info-card {}

    .btn {
        border-radius: 4px;
    }


    .avatar {
        width: 30px;
        border-radius: 50%;
    }

    label {
        font-size: 10px;
    }

    .shining-card {

        border-radius: 4px;
        border: 1px solid #eee;
        height: fit-content;

        .shining-img {
            width: 90%;
            height: max-content;
        }
    }
}
</style>