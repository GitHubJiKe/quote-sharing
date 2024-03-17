<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useMobileStore } from "../store";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { CurrentUser, useQueryCurrentUser } from "../../utils";
import { VIP_LEVEL_MAP } from "../../constants";
import { toast } from "vue3-toastify";

const editorRef = ref(null)
const store = useMobileStore()

const theme = ref<'snow' | 'bubble'>("snow")
const currentUser = ref<CurrentUser>()
const query = useQueryCurrentUser()

onBeforeMount(async () => {
    currentUser.value = await query()
})

const vipLevel = computed(() => {
    if (currentUser.value) {
        return currentUser.value.vipLevel;
    }

    return 1
})

const clearText = () => {
    store.text = '';
    // @ts-ignore
    (editorRef.value!).setText('')
}

const toogleToolbar = () => {
    // @ts-ignore
    const toolbar = editorRef.value.getToolbar()
    if (toolbar.style.display === 'none') {
        toolbar.style.display = ''
    } else {
        toolbar.style.display = 'none'
    }
}

defineExpose({
    reset: clearText,
    toogleToolbar
})



const contentUpdate = (text: string) => {
    console.log('vipLevel::', vipLevel.value);
    const obj = VIP_LEVEL_MAP[vipLevel.value]
    if (store.count >= obj.maxContentLength) {
        toast.warning(`您当前的等级只能输入${obj.maxContentLength}个字符`)
        store.text = text.slice(0, obj.maxContentLength + (text.match(/[\n\r]/g) || []).length)
        return;
    }
    store.text = text;
}

</script>
<template>
    <div class="p-x-4">
        <QuillEditor ref="editorRef" placeholder="点击此处输入您想分享的内容..." :theme="theme" toolbar="minimal" content-type="text"
            :content="store.text" @update:content="contentUpdate" />
    </div>
</template>
<style>
.ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #d1d5db;
}

.ql-container.ql-snow {
    border: none;
    min-height: 140px;
}
</style>../store