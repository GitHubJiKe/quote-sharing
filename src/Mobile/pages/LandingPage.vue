<script setup lang="ts">
import { bgcolors } from '../../constants'
import { computed, onMounted } from 'vue'
import { isMobileDevice, useAuthJudge, useRandomBgColorIndex } from '../../utils';
import Title from './Title.vue';
import { useRouter } from "vue-router";
import { useUserStore } from '../../store';
import { authLoginByGoogle, getAuthUser, signInSuccessWithEmail } from '../../firebase';
import { SHINING_TEXT } from '../../constants';
import { toast } from 'vue3-toastify';
import { ModalsContainer, useModal } from 'vue-final-modal';
import LoginView from '../components/LoginView.vue';
const userStore = useUserStore();

const bgColorIndex = useRandomBgColorIndex();
const images = ['tomato', 'driver', 'doggy'];
const getImageUrl = (img: string) => {
    return `https://githubjike.github.io/images/uPic/${img}.jpg`
}

const isMobile = isMobileDevice()

const bg = computed(() => {
    return bgcolors[bgColorIndex.value]
})


const router = useRouter()

const gotoShare = async () => {
    if (getAuthUser()) {
        router.push('/writing')
    }
}

onMounted(() => {
    gotoShare()
})

const { open, close } = useModal({
    component: LoginView,
    attrs: {
        onGoogleLogin: async () => {
            close()
            const logined = await loginByGoogle();
            if (logined) {
                router.push('/writing')
            }
        },
        onClose: () => close()
    }
})
const loginByGoogle = async () => {
    if (userStore.username && userStore.avatar) {
        return true;
    }
    const user = await authLoginByGoogle();
    if (user) {
        userStore.username = user.username!
        userStore.avatar = user.avatar!
        userStore.email = user.email!

        return true
    }

    return false;
}

useAuthJudge(() => {
    toast.info("您已登录，开启分享之旅", {
        onClose: () => {
            router.push('/writing')
        }
    })
}, () => {
    // toast.warning('登录开启分享之旅')
})

const goLogin = () => {
    open()
}

onMounted(() => {
    signInSuccessWithEmail()
})

</script>

<template>
    <div class="w-full flex flex-col h-full select-none h-dvh">
        <ModalsContainer />
        <header class="px-8 py-0 flex justify-between items-center">
            <h3 :style="`background-image:${bg}`" class="p-4 header-title">{{ SHINING_TEXT }}
            </h3>
            <Title :bg="bg" v-if="!isMobile"></Title>
            <div @click="goLogin" class="btn p-4 cursor-pointer" :style="`background-image:${bg}`">立即登录</div>
        </header>
        <main class="flex-1 content" :style="`background-image:${bg}`">
        </main>
        <h1 class="absolute top-25 p-l-12 text-12 fw-900" style="z-index: 9999;" v-if="isMobile">{{ SHINING_TEXT
            }}<br />自然分享</h1>
        <div :class="{ 'images-mobile': isMobile, 'images-web': !isMobile }">
            <img v-for="img in images" :key="img" :src="getImageUrl(img)" :alt="img" srcset="" :class="img">
        </div>
        <footer class="text-center py-2 text-black text-3">
            @{{ SHINING_TEXT }}
        </footer>
    </div>
</template>

<style lang="less" scoped>
.content {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-origin: content-box;
    transition: background-image 5s ease-in-out;
    animation: backgroundFade 10s infinite;

}

.github {
    width: 30px;
}

.header-title {
    border-radius: 24px;
}

.btn {
    border-radius: 4px;
    color: #fff;
}



.images-mobile {
    img {
        width: 60%;
        height: auto;
        position: absolute;
        z-index: 999;

    }

    .tomato {
        top: 30%;
        left: 20%;
        rotate: -30deg;
    }

    .driver {
        top: 50%;
        left: 20%;
        rotate: 40deg;
    }

    .doggy {
        top: 70%;
        left: 20%;
        rotate: 10deg;
    }
}

.images-web {
    position: absolute;
    top: 30%;
    left: 12%;

    img {
        width: 30%;
        height: auto;
        z-index: 9999999;
    }

    .tomato {
        rotate: -20deg;
    }

    .driver {
        rotate: 30deg;
    }

    .doggy {
        rotate: 10deg;
    }
}

@keyframes backgroundFade {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.1;
    }
}
</style>