<script setup lang="ts">
import { useUserStore } from '../../store.ts';
import { useMobileStore } from "../store.ts";
import { storeToRefs } from 'pinia';
const store = useMobileStore()
const { authorLineShow } = storeToRefs(store);
const userStore = useUserStore()
</script>
<template>
    <label class="author name" v-if="authorLineShow">
        {{ userStore.username }}
    </label>
</template>