<script setup lang="ts">
import { CurrentUser, exportPic, genFileAndUpload, isMobileDevice, useAuthJudge, useFetchCardList, useQueryCurrentUser } from "../../utils";
import Header from '../components/Header.vue';
import Opeartor from "../Operator/Opeartor.vue";
import { useMobileStore } from '../store'
import Clean from '../Template/Clean.vue';
import Fashion from '../Template/Fashion.vue';
import Geek from '../Template/Geek.vue';
import Lighter from '../Template/Lighter.vue';
import { addDocument, } from "../../firebase";
import { useUserStore } from "../../store";
import { useLoading } from 'vue-loading-overlay'
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";
import { computed, nextTick, onBeforeMount, ref, watch } from "vue";
import { VIP_LEVEL_MAP } from "../../constants";
import { ModalsContainer, useModal } from 'vue-final-modal'
import IconsView from '../components/IconsView.vue'

const PICTURE_HOST = `https://firebasestorage.googleapis.com/v0/b/talk-is-cheap-6695e.appspot.com/o/quotes${encodeURIComponent("/")}`

const $loading = useLoading();
const userStore = useUserStore()
const store = useMobileStore()
const cleanTemp = ref()
const fashionTemp = ref()
const geekTemp = ref()
const lighterTemp = ref()
const isAnonymous = userStore.isAnonymous
const refMap = computed(() => {
    return {
        Clean: cleanTemp,
        Fashion: fashionTemp,
        Geek: geekTemp,
        Lighter: lighterTemp
    }
})
const { fetchList, list } = useFetchCardList()

const currentUser = ref<CurrentUser>()
const query = useQueryCurrentUser()

onBeforeMount(async () => {
    if (!isAnonymous) {
        currentUser.value = await query()!
        await fetchList()
    }

})

const recovertDraft = (htmlText: string) => {
    if (htmlText) {
        // @ts-ignore
        const _ref = refMap.value[store.temp];
        if (_ref && _ref.value && _ref.value.setHTML) {
            _ref.value.setHTML(htmlText)
        }
    }
}


const doRest = () => {
    // @ts-ignore
    const _ref = refMap.value[store.temp];

    _ref.value.reset()
}

const toggleToolbar = () => {
    // @ts-ignore
    const _ref = refMap.value[store.temp];
    _ref.value.toggleToolbar()
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
    toggleToolbar()

    nextTick(async () => {
        const preview = document.querySelector("#content")! as HTMLDivElement;
        const datetimeEL = preview.querySelector('.datetime')!
        const currentDate = new Date();
        datetimeEL.innerHTML = currentDate.toLocaleString()
        store.datetimeStr = currentDate.toLocaleString();
        const loading = $loading.show()
        try {

            if (isAnonymous) {
                const name = window.prompt('请输入文件名')!
                exportPic(preview, name).then(() => {
                    toggleToolbar();
                });
                return;
            }

            const { vipLevel, exteraCardCount } = currentUser.value!;
            if (vipLevel !== 0) {
                if (list.value.length === (VIP_LEVEL_MAP[vipLevel].listMaxCount + exteraCardCount)) {
                    const name = window.prompt('请输入文件名')!
                    toast.info("您已达到存储上线，请升级存储")
                    exportPic(preview, name).then(() => {
                        toggleToolbar();
                    });
                    return;
                }
            }

            const res = await genFileAndUpload(preview, currentDate.getTime().toString()); //
            const { email } = userStore;
            const { datetimeStr } = store;
            const data = {
                email,
                content: html,
                datetime: datetimeStr,
                // @ts-ignore
                picURL: `${PICTURE_HOST}${res.ref['name']}?alt=media`,
                env: location.host.includes('localhost') ? 'test' : 'prod'
            }

            const saveRes = await addDocument({ entity: 'quotes', entityObj: data });

            console.log(saveRes);

            toast.success("保存成功，即将前往列表页面", {
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                    toggleToolbar();
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

if (!isAnonymous) {
    useAuthJudge(() => {
        isLogined.value = true
    }, () => {
        router.back()
    })
}

const gotoList = () => {
    router.push('/list')
}


const onDraft = () => {
    const htmlText = localStorage.getItem('ShiningText')!;
    if (htmlText) {
        return recovertDraft(htmlText)
    }

    toast.warning('没有草稿内容')
}

const doDraft = () => {
    const text = getText() as string;
    if (text.trim().length === 0) {
        return;
    }
    localStorage.setItem('ShiningText', getHTML())
}

const { open, close } = useModal({
    component: IconsView,
    attrs: {
        onClose() {
            close();
        },
        onSelect(icon: string) {
            console.log(icon);
            store.currentIcon = icon;
        }
    }
})

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        doDraft()
    }
})

watch(() => store.temp, () => {
    store.text && recovertDraft(store.text)
})

const styleStr = computed(() => {
    return isMobile ? '' : 'min-width: 414px;'
})
</script>

<template>
    <div class="bg-black h-dvh mx-auto overflow-x-hidden" :class="{ 'w-42%': !isMobile, 'w-100%': isMobile }"
        :style="styleStr">
        <div :class="{ 'quote-sharing': isMobile, 'quote-sharing-web': !isMobile }" class="m-t-4">
            <div class="box" v-if="isLogined || isAnonymous">
                <Header @list="gotoList" :class="{ 'web-header': !isMobile }" @reset="doRest" @draft="onDraft" />
                <Clean v-if="store.temp === 'Clean'" ref="cleanTemp" @open="open" />
                <Fashion v-if="store.temp === 'Fashion'" ref="fashionTemp" @open="open" />
                <Geek v-if="store.temp === 'Geek'" ref="geekTemp" @open="open" />
                <Lighter v-if="store.temp === 'Lighter'" ref="lighterTemp" @open="open" />
            </div>
            <Opeartor @share="onShare" />
        </div>
        <ModalsContainer />
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