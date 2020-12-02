import * as PIXI from "pixi.js";
import AppConfig from './../../common';

let totalCount = 0;
let counterText;

let counterBlock = (app, count = 0) => {
    const textBlock = new PIXI.Graphics();
    totalCount += count;
    if(!counterText){
        counterText = new PIXI.Text(`MONEY: ${totalCount}`, AppConfig.styleCounter);
        textBlock.beginFill(0, 0.5);
        textBlock.drawRect(0, 0, AppConfig.counter.width, AppConfig.counter.height);
        counterText.x = app.screen.width - counterText.width - AppConfig.counter.y - 15;
        counterText.y = AppConfig.counter.y;

        textBlock.addChild(counterText);
        app.stage.addChild(counterText);
    }else {
        counterText.text = `MONEY: ${totalCount}`;
    }
    return totalCount;

};
export default counterBlock;