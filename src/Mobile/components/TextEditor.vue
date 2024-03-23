<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watchEffect } from "vue";
import { CurrentUser, useQueryCurrentUser } from "../../utils";
import { useMobileStore } from "../store";
import Quill from 'quill';



const store = useMobileStore()
const editorRef = ref<Quill>()

const currentUser = ref<CurrentUser>()

const query = useQueryCurrentUser()

const onContentUpdate = () => {
    const count = getText().trim().length
    store.count = count
    if (count === 0) {
        editorRef.value?.root.classList.add('ql-blank');
    }
}

onMounted(() => {
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],
        // ['link', 'image', 'video', 'formula'],

        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown


        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    const options = {
        debug: 'info',
        modules: {
            toolbar: toolbarOptions,
        },
        placeholder: '请输入您要分享的内容...',
        theme: 'snow'
    };
    // @ts-ignore
    editorRef.value = new Quill('#editor', options);
    editorRef.value.on('text-change', onContentUpdate)
})

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
    editorRef.value?.deleteText(0, editorRef.value?.getLength())
    if (editorRef.value?.getLength() === 1) {
        editorRef.value?.root.classList.add('ql-blank');
    }
}


const toogleToolbar = () => {
    // @ts-ignore
    const toolbar = document.body.querySelector('.ql-toolbar')! as HTMLDivElement
    if (toolbar.style.display === 'none') {
        toolbar.style.display = ''
    } else {
        toolbar.style.display = 'none'
    }
}

const getHTML = () => {
    // @ts-ignore
    return editorRef.value?.getSemanticHTML()
}

const getText = () => {
    // @ts-ignore
    return editorRef.value.getText()
}

const setHTML = (html: string) => {
    editorRef.value?.setContents(editorRef.value?.clipboard.convert({ html }))
}

defineExpose({
    reset: clearText,
    toogleToolbar,
    getHTML,
    getText,
    setHTML
})




</script>
<template>
    <div class="p-x-4">
        <div id="editor"></div>
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