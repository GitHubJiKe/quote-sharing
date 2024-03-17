<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { NButton, NInput, NInputGroup } from 'naive-ui'
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { sendLoginLinklWithEmail } from '../../firebase';


const email = ref('')

const isValidEmail = () => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
}

const emit = defineEmits<{
    (e: 'googleLogin'): void;
    (e: 'close'): void;
}>()

const sendLink = () => {
    if (!isValidEmail()) {
        toast.error("邮箱地址不合法")
    }
    emit('close');
    sendLoginLinklWithEmail(email.value);
}
</script>

<template>
    <VueFinalModal class="login-modal" content-class="login-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <div>
            <div class="login-modal-header">
                <h1 class="login-modal-title">登录</h1>
            </div>
            <div class="login-modal-body">
                <NInputGroup>
                    <NInput placeholder="邮箱登录" v-model:value="email" />
                    <NButton type="primary" ghost @click="sendLink">
                        发送链接
                    </NButton>
                </NInputGroup>
                <NButton class="w-full m-t-2" type="primary" @click="emit('googleLogin')">Google 登录</NButton>
            </div>
        </div>
    </VueFinalModal>
</template>

<style lang="less">
.login-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
}

.login-modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background: #fff;
    border-radius: 12px;
}

.login-modal-content>*+* {
    margin: 12px 0;
}

.login-modal-content h1 {
    font-size: 18px;
}


.dark .login-modal-content {
    background: #000;
}
</style>