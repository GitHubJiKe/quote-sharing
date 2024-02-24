import blackSmoke from "./assets/black-smoke.jpeg";
import blueWall from "./assets/blue-wall.jpeg";
import brickWall from "./assets/brick-wall.jpeg";
import grayWall from "./assets/gray-wall.jpeg";
import whiteWall from "./assets/white-wall.jpeg";
import woodStrip from "./assets/wood-strip.jpeg";
import woodWall from "./assets/wood-wall.jpeg";
import yellowWall from "./assets/yellow-wall.jpeg";
import whiteBlueBrick from "./assets/white-blue-brick.jpeg";
import flowerWall from "./assets/flower-wall.jpeg";
import pinkWall from "./assets/pink-wall.jpeg";

export const bgImgList = [
    {
        value: "",
        name: "None",
    },
    {
        value: blackSmoke,
        name: "深色烟雾",
    },
    {
        value: blueWall,
        name: "蓝色石灰",
    },
    {
        value: brickWall,
        name: "红色砖墙",
    },
    {
        value: grayWall,
        name: "大理石板",
    },
    {
        value: whiteWall,
        name: "白色砖墙",
    },
    {
        value: woodStrip,
        name: "深色木条",
    },
    {
        value: woodWall,
        name: "黄色木墙",
    },
    {
        value: yellowWall,
        name: "黄色水泥",
    },
    {
        value: whiteBlueBrick,
        name: "蓝色砖墙",
    },
    {
        value: flowerWall,
        name: "花墙",
    },
    {
        value: pinkWall,
        name: "粉色砖墙",
    },
];

export const fontFalimies = [
    {
        name: "Regular",
        value: "regular",
    },
    {
        name: "Italic",
        value: "italic",
    },
];

export const aligns = ["left", "center", "right"];

export const languageList = [
    { name: "None", value: "|" },
    {
        name: "En -> Zh",
        value: "en|zh",
    },
    {
        name: "Zh -> En",
        value: "zh|en",
    },
];

export const driverSteps = [
    {
        element: "#bgImage",
        popover: {
            title: "Background Image Keyword",
            description: "keyword for search background images",
        },
    },
    {
        element: "#color",
        popover: {
            title: "Text Color Selector",
            description: "Select your favorite text color",
        },
    },
    {
        element: "#fontSize",
        popover: {
            title: "Text Font Size Ranger",
            description: "Select your favorite text font size",
        },
    },
    {
        element: "#refreshIcon",
        popover: {
            title: "Switch Background Image",
            description:
                "select your favorite background image with your quote",
            side: "bottom",
            align: "start",
        },
    },
    {
        element: "#fontFamily",
        popover: {
            title: "Text Font Family Selector",
            description: "Select your favorite text font family",
        },
    },
    {
        element: "#textAlign",
        popover: {
            title: "Text Align Selector",
            description: "You can adjust the text alignment",
        },
    },
    {
        element: "#language",
        popover: {
            title: "Language Selector",
            description: "Both English and Chinese or None",
        },
    },
    {
        element: "#authorName",
        popover: {
            title: "Author Name",
            description: "You can keep the author name empty if you want",
        },
    },
    {
        element: "#downloadBtn",
        popover: {
            title: "Download Button",
            description: "download the designed picture to local",
        },
    },
    {
        element: "#textarea",
        popover: {
            title: "Textarea",
            description: "typeing the quotes in the textarea",
        },
    },
    {
        element: "#preview",
        popover: {
            title: "Preview Box",
            description:
                "When you adjust the configuration above, you can preview the picture immediately",
        },
    },
    {
        element: "#author",
        popover: {
            title: "Author",
            description: "You can drag and drop the author to anywhere",
        },
    },
];
