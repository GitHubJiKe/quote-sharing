<script setup lang="ts">
import { useUserStore } from '../../store';

const emit = defineEmits<{
    (e: 'list'): void;
    (e: 'reset'): void;
}>()

const userStore = useUserStore()
</script>

<template>
    <div class="header">
        <header class="left flex flex-col">
            <img :src="userStore.avatar" alt="avatar" srcset="" class="avatar">
            <label>
                {{ userStore.username }}
            </label>
        </header>
        <div class="right">
            <label class="iconfont icon-eraser" @click="emit('reset')"></label>
            <label class="iconfont icon-list" @click="emit('list')"></label>
        </div>
    </div>
</template>


<style lang="less" scoped>
.web-header {
    border-top: 0.01rem solid white;
    border-left: 0.01rem solid white;
    border-right: 0.01rem solid white;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 12px;


    label {
        font-size: 24px;
    }

    .left {
        gap: 2px;

        .avatar {
            width: 40px;
        }

        img {
            border-radius: 50%;
        }

        label {
            font-size: 10px;
        }
    }

    .right {
        display: flex;
        gap: 24px;
    }
}
</style>../../store