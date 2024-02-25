<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Canvas, Rect, Circle, FabricText, FabricImage } from "fabric";
let canvasInstance = null as unknown as Canvas;
const textContent = ref("");
let selectedText = null as unknown as FabricText;
onMounted(() => {
    const stageBox = document.getElementById("stage-box")! as HTMLDivElement;

    const { width, height } = stageBox.getBoundingClientRect();
    const stage = document.getElementById("stage")! as HTMLCanvasElement;
    stage.width = width;
    stage.height = height;
    canvasInstance = new Canvas(stage);
});

// @ts-ignore
const onAdd = (e) => {
    switch (e.target.name) {
        case "rect":
            canvasInstance.add(
                new Rect({
                    left: 100,
                    top: 100,
                    width: 200,
                    height: 100,
                    fill: "red",
                }),
            );
            break;
        case "square":
            canvasInstance.add(
                new Rect({
                    left: 100,
                    top: 100,
                    width: 200,
                    height: 200,
                    fill: "yellow",
                }),
            );
            break;
        case "circle":
            canvasInstance.add(
                new Circle({
                    left: 100,
                    top: 100,
                    radius: 100,
                    fill: "blue",
                }),
            );
            break;
        case "text":
            const txt = new FabricText("This is a text");
            txt.on("mousedblclick", () => {
                selectedText = txt;
                textContent.value = txt.text;
            });
            canvasInstance.add(txt);
            break;
        case "image":
            canvasInstance.add(
                new FabricImage("https://picsum.photos/200/300"),
            );
            break;

        default:
            break;
    }
};
const modifyText = () => {
    if (selectedText) {
        selectedText.set("text", textContent.value);
        canvasInstance.requestRenderAll();
    }
};
</script>

<template>
    <div class="box">
        <div id="panel">
            <button @click="onAdd" name="rect">长方形</button>
            <button @click="onAdd" name="square">正方形</button>
            <button @click="onAdd" name="circle">圆方形</button>
            <button @click="onAdd" name="text">文本</button>
            <!-- <button @click="onAdd" name="image">图片</button> -->
            <input type="text" v-model="textContent" /><button
                @click="modifyText"
            >
                确定
            </button>
        </div>
        <div id="stage-box">
            <canvas id="stage" style="border: 1px solid black"></canvas>
        </div>
    </div>
</template>

<style scoped lang="less">
.box {
    display: flex;
    flex-direction: row;
    padding: 24px;
    #panel {
        flex: 2;
    }
    #stage-box {
        flex: 10;
        height: 90vh;
        #stage {
        }
    }
}
</style>
