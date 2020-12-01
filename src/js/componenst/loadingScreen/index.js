import * as PIXI from "pixi.js";
import AppConfig from './../../common';

let temp;

let loadingScreen = (app, loaded = false) => {
    const textBlock = new PIXI.Graphics();
    const loadingText = new PIXI.Text('Loading...', AppConfig.styleLoadingText);

    textBlock.beginFill(0, 1);
    textBlock.drawRect(0, 0, app.screen.width, app.screen.height);

    loadingText.x = Math.round((textBlock.width - loadingText.width) / 2);
    loadingText.y = Math.round((app.screen.height / 2) - (loadingText.height / 2));

    textBlock.addChild(loadingText);
    if(loaded){
        temp.destroy();
    }else{
        temp = textBlock;
        app.stage.addChild(textBlock);
    }

};
export default loadingScreen;