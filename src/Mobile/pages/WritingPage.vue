<script setup lang="ts">
import { genFileAndUpload, isMobileDevice, useAuthJudge } from "../../utils";
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalView from '../ModalView.vue'
import Header from '../Header.vue';
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


const PICTURE_HOST = `https://firebasestorage.googleapis.com/v0/b/talk-is-cheap-6695e.appspot.com/o/quotes${encodeURIComponent("/")}`

const $loading = useLoading();
const userStore = useUserStore()

const store = useMobileStore()

const onShare = async () => {
    const preview = document.querySelector("#content")! as HTMLDivElement;
    const datetimeEL = preview.querySelector('.datetime')!
    const currentDate = new Date();
    datetimeEL.innerHTML = currentDate.toLocaleString()
    store.datetimeStr = currentDate.toLocaleString();
    const loading = $loading.show()
    try {
        const res = await genFileAndUpload(preview, currentDate.getTime().toString()); //
        console.log('genFileAndUpload::', res);
        const { email } = userStore;
        const { text, datetimeStr } = store;
        // @ts-ignore
        const data = { email, content: text, datetime: datetimeStr, picURL: `${PICTURE_HOST}${res.ref['name']}?alt=media` }
        console.log(data.picURL);

        const saveRes = await addDocument({ entity: 'quotes', entityObj: data });

        console.log(saveRes);

        toast.success("保存成功，即将前往列表页面", {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
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
}
const isMobile = isMobileDevice()

const { open, close } = useModal({
    component: ModalView,
    attrs: {
        onConfirm() {
            close()
        },
    },
})
const router = useRouter()
useAuthJudge(() => {
    // you are logined
}, () => {
    router.back()
})

const gotoList = () => {
    router.push('/list')
}

</script>

<template>
    <div class="flex justify-center bg-black h-dvh p-y-2">
        <div :class="{ 'quote-sharing': isMobile, 'quote-sharing-web': !isMobile }">
            <ModalsContainer />
            <div class="box">
                <Header @help="open" @list="gotoList" :class="{ 'web-header': !isMobile }" />
                <Clean v-if="store.temp === 'Clean'" />
                <Fashion v-if="store.temp === 'Fashion'" />
                <Geek v-if="store.temp === 'Geek'" />

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
    width: 40%;
    gap: 40px;
    background-color: #000;

}

.btn {
    border-radius: 50%;
    color: #fff;
}
</style>