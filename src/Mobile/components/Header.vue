<script setup lang="ts">
import { useUserStore } from '../../store';

const emit = defineEmits<{
    (e: 'list'): void;
    (e: 'reset'): void;
    (e: 'draft'): void;
}>()

const userStore = useUserStore()
</script>

<template>
    <div class="header">
        <header class="left flex flex-col" v-if="!userStore.isAnonymous">
            <img :src="userStore.avatar" alt="avatar" srcset="" class="avatar">
            <label>
                {{ userStore.username }}
            </label>
        </header>
        <div v-else>👏🏻欢迎试用👏🏻</div>
        <div class="right">
            <label class="iconfont icon-draft draft" @click="emit('draft')"></label>
            <label class="iconfont icon-eraser eraser" @click="emit('reset')"></label>
            <label class="iconfont icon-list list" v-if="!userStore.isAnonymous" @click="emit('list')"></label>
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

    .draft::after {
        content: '草稿';
        font-size: 0.5rem;
        display: block;
        text-align: center;
    }

    .eraser::after {
        content: '清空';
        font-size: 0.5rem;
        display: block;
        text-align: center;
    }

    .list::after {
        content: '列表';
        font-size: 0.5rem;
        display: block;
        text-align: center;
    }

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