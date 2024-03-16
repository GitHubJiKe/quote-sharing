<script setup lang="ts">
import { computed, ref } from 'vue';
import { isMobileDevice, useAuthJudge, useRandomBgColorIndex } from '../../utils';
import { getAuthUser, queryDocument } from '../../firebase';
import { useRouter } from "vue-router";
import { bgcolors } from '../../constants'
import { useUserStore } from '../../store';
interface DocItem { email: string; datetime: string; picURL: string; content: string; id: string }
const bgColorIndex = useRandomBgColorIndex();
const isMobile = isMobileDevice()
const list = ref<Array<DocItem>>([])
const router = useRouter()

const bg = computed(() => {
    return bgcolors[bgColorIndex.value]
})

const fetchList = async () => {
    const user = getAuthUser()
    if (user) {
        const result = await queryDocument('quotes', [
            {
                op: '',
                conditions: [
                    {
                        field: 'email',
                        op: '==',
                        value: user?.email!
                    }
                ]
            }
        ])
        if (result) {
            list.value = result.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                } as DocItem
            })
            console.log(list);
        }
    }
}


useAuthJudge(async () => {
    // logined
    await fetchList()
}, () => {
    router.replace('/')
})

const userStore = useUserStore()

const gotoShare = () => {
    router.push('/writing')
}
</script>

<template>
    <div class="p-4  card-box h-full bg-black">
        <div class="fixed bottom-20 right-6">
            <header class="flex bg-white p-2 header-bar items-center flex-col" style="z-index: 9999;">
                <div class="flex flex-col items-center justify-center m-b-4">
                    <img :src="userStore.avatar" alt="avatar" srcset="" class="avatar">
                    <label>
                        {{ userStore.username }}
                    </label>
                </div>
                <div @click="gotoShare" class="btn p-4 cursor-pointer flex items-center "
                    :style="`background-image:${bg}`">
                    返回分享
                </div>
            </header>
        </div>
        <div class="flex m-t-8  flex-col justify-center " style="gap: 12px;" :class="{ 'p-x-140': !isMobile }">
            <div v-for="item in list" :key="item.id"
                class="shining-card p-3 bg-white flex justify-center items-center m-b-4">
                <img :src="item.picURL" alt="shining card" srcset="" class="shining-img flex-1">
            </div>
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
        border-radius: 4px;
    }

    .btn {
        border-radius: 4px;
        color: #fff;
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