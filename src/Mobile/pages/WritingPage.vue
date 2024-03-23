<script setup lang="ts">
import { CurrentUser, exportPic, genFileAndUpload, isMobileDevice, useAuthJudge, useBodyBgColor, useFetchCardList, useQueryCurrentUser } from "../../utils";
import Header from '../components/Header.vue';
import Opeartor from "../Operator/Opeartor.vue";
import { useMobileStore } from '../store'
import Clean from '../Template/Clean.vue';
import Fashion from '../Template/Fashion.vue';
import Geek from '../Template/Geek.vue';
import { addDocument, } from "../../firebase";
import { useUserStore } from "../../store";
import { useLoading } from 'vue-loading-overlay'
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";
import { computed, nextTick, onBeforeMount, ref } from "vue";
import { VIP_LEVEL_MAP } from "../../constants";


const PICTURE_HOST = `https://firebasestorage.googleapis.com/v0/b/talk-is-cheap-6695e.appspot.com/o/quotes${encodeURIComponent("/")}`

const $loading = useLoading();
const userStore = useUserStore()
const store = useMobileStore()
const cleanTemp = ref()
const fashionTemp = ref()
const geekTemp = ref()

const refMap = computed(() => {
    return {
        Clean: cleanTemp,
        Fashion: fashionTemp,
        Geek: geekTemp
    }
})
const { fetchList, list } = useFetchCardList()

const currentUser = ref<CurrentUser>()
const query = useQueryCurrentUser()

onBeforeMount(async () => {
    currentUser.value = await query()!
    await fetchList()
    recovertDraft()
})

const recovertDraft = () => {
    const htmlText = localStorage.getItem('ShiningText');
    if (htmlText) {
        // @ts-ignore
        const _ref = refMap.value[store.temp];
        if (_ref) {
            _ref.value.setHTML(htmlText)
        }
    }
}

useBodyBgColor()

const doRest = () => {
    // @ts-ignore
    const _ref = refMap.value[store.temp];

    _ref.value.reset()
}

const toogleToolbar = () => {
    // @ts-ignore
    const _ref = refMap.value[store.temp];
    _ref.value.toogleToolbar()
}

const getHTML = () => {
    // @ts-ignore
    const _ref = refMap.value[store.temp];
    return _ref.value.getHTML()
}
const getText = () => {
    // @ts-ignore
    const _ref = refMap.value[store.temp];
    return _ref.value.getText()
}


const onShare = () => {
    const html = getHTML()
    const text = getText() as string;
    if (text.trim().length === 0) {
        return toast.warning('请输入分享内容')
    }
    toogleToolbar()

    nextTick(async () => {
        const preview = document.querySelector("#content")! as HTMLDivElement;
        const datetimeEL = preview.querySelector('.datetime')!
        const currentDate = new Date();
        datetimeEL.innerHTML = currentDate.toLocaleString()
        store.datetimeStr = currentDate.toLocaleString();
        const loading = $loading.show()
        try {
            const { vipLevel, exteraCardCount } = currentUser.value!;
            if (vipLevel !== 0) {
                if (list.value.length === (VIP_LEVEL_MAP[vipLevel].listMaxCount + exteraCardCount)) {
                    toast.info("您已达到存储上线，请升级存储")
                    exportPic(preview)
                    return;
                }
            }
            const res = await genFileAndUpload(preview, currentDate.getTime().toString()); //
            const { email } = userStore;
            const { datetimeStr } = store;
            // @ts-ignore
            const data = { email, content: html, datetime: datetimeStr, picURL: `${PICTURE_HOST}${res.ref['name']}?alt=media` }

            const saveRes = await addDocument({ entity: 'quotes', entityObj: data });

            console.log(saveRes);

            toast.success("保存成功，即将前往列表页面", {
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                    toogleToolbar();
                    doRest()
                    router.push('/list')
                }
            });
        } catch (error) {
            console.error(error);
            toast.error("保存失败", {
                position: toast.POSITION.TOP_CENTER,
            });
        } finally {
            loading.hide()
        }
    })
}
const isMobile = isMobileDevice()


const router = useRouter()

const isLogined = ref(false);

useAuthJudge(() => {
    isLogined.value = true
}, () => {
    router.back()
})

const gotoList = () => {
    router.push('/list')
}


const onDraft = () => {
    const text = getText() as string;
    if (text.trim().length === 0) {
        return toast.warning('请输入分享内容')
    }
    localStorage.setItem('ShiningText', getHTML())
}

</script>

<template>
    <div class="bg-black h-dvh mx-auto overflow-x-hidden" :class="{ 'w-42%': !isMobile, 'w-90%': isMobile }">
        <div :class="{ 'quote-sharing': isMobile, 'quote-sharing-web': !isMobile }" class="m-t-4">
            <div class="box" v-if="isLogined">
                <Header @list="gotoList" :class="{ 'web-header': !isMobile }" @reset="doRest" @draft="onDraft" />
                <Clean v-if="store.temp === 'Clean'" ref="cleanTemp" />
                <Fashion v-if="store.temp === 'Fashion'" ref="fashionTemp" />
                <Geek v-if="store.temp === 'Geek'" ref="geekTemp" />
            </div>
            <Opeartor @share="onShare" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.quote-sharing {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 40px;
    background-color: #000;
}

.quote-sharing-web {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;
    background-color: #000;

}

.btn {
    border-radius: 50%;
    color: #fff;
}
</style>