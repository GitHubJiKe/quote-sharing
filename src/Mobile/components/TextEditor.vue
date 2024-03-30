<script setup lang="ts">
import { nextTick, onBeforeMount, onBeforeUnmount, ref, shallowRef, watchEffect } from "vue";
import { CurrentUser, useQueryCurrentUser } from "../../utils";
import { useMobileStore } from "../store";
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { IToolbarConfig, DomEditor } from '@wangeditor/editor'

const store = useMobileStore()
const editorRef = shallowRef<Editor>()

const currentUser = ref<CurrentUser>()

const query = useQueryCurrentUser()



onBeforeMount(async () => {
    currentUser.value = await query()!
})


const vipLevel = ref(-1);

watchEffect(() => {
    if (currentUser?.value) {
        vipLevel.value = currentUser?.value?.vipLevel!
    }
})

const clearText = () => {
    editorRef.value.clear()
}



const getHTML = () => {
    return editorRef.value?.getHtml()
}

const getText = () => {
    // @ts-ignore
    return editorRef.value?.getText()
}

const setHTML = (html: string) => {
    editorRef.value?.setHtml(html)
}

const toggleToolbar = () => {
    showToolbar.value = !showToolbar.value;
}

defineExpose({
    reset: clearText,
    getHTML,
    getText,
    setHTML,
    toggleToolbar
})

onBeforeUnmount(() => {
    store.text = getHTML()!
})


const toolbarConfig: Partial<IToolbarConfig> = {
    'excludeKeys': [
        'group-image',
        'group-video',
        'insertTable',
        'fullScreen',
        '|',
        'insertLink'
    ]
}
const editorConfig = {
    placeholder: '请输入内容...',

}
const mode = 'defalut'

const handleCreated = (editor: any) => {
    editorRef.value = editor;
    nextTick(() => {

        const toolbar = DomEditor.getToolbar(editor)!
        console.log(toolbar.getConfig());
    })
}

const showToolbar = ref(true);

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const onChange = () => {
    const text = getText()! as string
    store.count = text.replace(/\n/g, '').trim().length;
}

</script>
<template>
    <div class="p-x-4">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" v-if="showToolbar" />
        <Editor style="min-height: 100px;" v-model="store.text" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" @onChange="onChange" />
    </div>
</template>
<style>
.w-e-text-container,
.w-e-bar {
    background-color: transparent !important;
}
</style>../store