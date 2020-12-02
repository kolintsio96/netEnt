import * as PIXI from "pixi.js";
let getSize = (size) => size/defaultWidth * window.innerWidth;
const styleLoadingText = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: '#ffffff'
});
const styleWonText = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 120,
    fontWeight: 'bold',
    fill: '#fbea04',
    stroke: '#000000',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});
const styleCounter = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: '#fbea04',
    stroke: '#000000',
    strokeThickness: 2,
});
const defaultWidth = 960;
const AppConfig = {
    windowConfig: {
        backgroundColor: 0xffffff,
        width: window.innerWidth,
        height: getSize(536)
    },
    columnWidth: getSize(235),
    rowHeight: getSize(155),
    buttonWidth: getSize(98),
    buttonHeight: getSize(98),
    positionLeft: getSize(71),
    positionRight: getSize(37),
    positionWinRight: getSize(12),
    winPositionLeft: getSize(70),
    diffBetweenCol: getSize(20),
    hideWinBlock: 3000,
    countColumns: 3,
    countRows: 3,
    styleLoadingText,
    styleWonText,
    styleCounter,
    counter:{
        y: 10,
        width:100,
        height: 100,
        winPoint: 10,
        runSlot: -5,
        initialPoint: 10
    },
    images: {
        slotsIcons:[
            './dist/images/SYM1-min.png',
            './dist/images/SYM3-min.png',
            './dist/images/SYM4-min.png',
            './dist/images/SYM5-min.png',
            './dist/images/SYM6-min.png',
            './dist/images/SYM7-min.png'
        ],
        appBg: './dist/images/BG-min.png',
        activeButton: './dist/images/BTN_Spin-min.png',
        disableButton: './dist/images/BTN_Spin_d-min.png',
    }
};
export default AppConfig;