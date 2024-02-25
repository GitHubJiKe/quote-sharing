<script setup lang="ts">
import { computed, ref } from "vue";
import App2 from "./App2.vue";
import App3 from "./App3.vue";

const appName = ref("App3");
const curComponent = computed(() => {
    return appName.value === "App2" ? App2 : App3;
});
</script>

<template>
    <select name="app" id="app" v-model="appName">
        <option value="App2">App2</option>
        <option value="App3">App3</option>
    </select>
    <component :is="curComponent"></component>
</template>

<style scoped></style>
