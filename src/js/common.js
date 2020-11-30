import * as PIXI from "pixi.js";
const styleText = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: '#ffffff'
});
const AppConfig = {
    windowConfig: {
        backgroundColor: 0xffffff
    },
    REEL_WIDTH: 160,
    SYMBOL_SIZE: 155,
    countColumns: 3,
    countRows: 3,
    style: styleText,
    images: {
        slotsIcons:[
            './../images/SYM1-min.png',
            './../images/SYM3-min.png',
            './../images/SYM4-min.png',
            './../images/SYM5-min.png'
        ]
    }
};

export default AppConfig;