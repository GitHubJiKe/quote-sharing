<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal'
import OperatorView from './OperatorView.vue';
import { useMobileStore } from '../store';
import { NDrawer, NDrawerContent, NTabs, NTabPane } from 'naive-ui'
import { isMobileDevice } from '../../utils';
import { ref } from 'vue';
import ChooseTemps from "./ChooseTemps.vue";
import BgColors from "./BgColors.vue";
const store = useMobileStore()

const { open, close, options } = useModal({
    component: OperatorView,
    attrs: {
        onToggle() {
            options.modelValue ? close() : open()
        },
    },
})

const drawerShow = ref(false)

const openOperator = () => {
    if (isMobileDevice()) {
        open()
    } else {
        drawerShow.value = true;
    }
}

const emit = defineEmits<{
    (e: 'share'): void;
}>()
</script>



<template>
    <div class="panel">
        <button @click="emit(`share`)" class="float-btn-1 right-6" :style="`background-image:${store.activeBgcolor}`">
            <i class="iconfont icon-share"></i>
        </button>
        <button @click="openOperator" class="float-btn-2 right-6" :style="`background-image:${store.activeBgcolor}`">
            <i class="iconfont icon-config"></i>
        </button>
        <NDrawer v-model:show="drawerShow" :width="'28%'" placement="left">
            <NDrawerContent title="配置面板">
                <NTabs v-model:activeKey="store.activeTab">
                    <NTabPane label="模板选择" name="template">
                        <ChooseTemps />
                    </NTabPane>
                    <NTabPane label="背景色" name="bgColor">
                        <BgColors />
                    </NTabPane>
                </NTabs>
            </NDrawerContent>
        </NDrawer>
        <ModalsContainer />
    </div>
</template>

<style lang="less" scoped>
.panel {
    .floatbtn {
        position: absolute;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        i {
            font-size: 18px;
        }
    }

    .float-btn-1 {
        .floatbtn();
        bottom: 60px;
    }

    .float-btn-2 {
        .floatbtn();
        bottom: 12px;

    }
}
</style>