import * as PIXI from "pixi.js";
import AppConfig from './../../../../common';

let temp,
    isDestroyed = false;

let winScreen = (app, close = false, callback) => {
    const container = new PIXI.Graphics();
    const textBlock = new PIXI.Graphics();
    const winText = new PIXI.Text('YOU WON !', AppConfig.styleWonText);
    const positionTop = (app.screen.height - AppConfig.rowHeight * 3) / 2;
    const positionLeft = AppConfig.winPositionLeft;

    container.beginFill(0, 0.01);
    container.drawRect(0, 0, app.screen.width, app.screen.height);
    textBlock.beginFill(0, 0.5);
    textBlock.drawRect(positionLeft, positionTop, AppConfig.columnWidth * 3 + AppConfig.positionWinRight, AppConfig.rowHeight * 3);

    winText.x = Math.round((app.screen.width / 2) - (winText.width / 2));
    winText.y = Math.round((app.screen.height / 2) - (winText.height / 2));

    container.buttonMode = true;
    container.interactive = true;

    let destroyTextBlock = () => {
        temp.destroy();
        callback();
    }
    container.addListener('pointerdown', () => {
        isDestroyed = true;
        destroyTextBlock();
    });

    textBlock.addChild(winText);
    container.addChild(textBlock);
    if(close){
        if(!isDestroyed){
            destroyTextBlock();
        }
    }else{
        temp = container;
        app.stage.addChild(container);
        isDestroyed = false;
    }

};
export default winScreen;