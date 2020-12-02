import * as PIXI from "pixi.js";
import AppConfig from '../../../../config';

class TextScreen{
    constructor(app, text, callback = null) {
        this.app = app;
        this.text = text;
        this.destroyed = false;
        this.callback = callback;
        this.textWrap = new PIXI.Graphics();
        this.textBlock = new PIXI.Graphics();
        this.text = new PIXI.Text(text, AppConfig.styleWonText);
        this.positionTop = (this.app.screen.height - AppConfig.rowHeight * 3) / 2;
        this.positionLeft = AppConfig.winPositionLeft;
    }
    setTextPosition(){
        this.text.x = Math.round((this.textBlock.width / 2) - (this.text.width / 2)) + AppConfig.positionLeft;
        this.text.y = Math.round((this.app.screen.height / 2) - (this.text.height / 2));
    }
    buildTextWrap(){
        this.textWrap.beginFill(0, 0.01);
        this.textWrap.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.textWrap.buttonMode = true;
        this.textWrap.interactive = true;
        this.textWrap.addListener('pointerdown', () => {
            this.destroy();
        });
    }
    buildTextBlock(){
        this.textBlock.beginFill(0, 0.5);
        this.textBlock.drawRect(this.positionLeft, this.positionTop, AppConfig.columnWidth * 3 + AppConfig.positionWinRight, AppConfig.rowHeight * 3);
    }
    destroy(){
        if(!this.destroyed){
            this.textWrap.destroy();
            !!this.callback && this.callback();
            this.destroyed = true;
        }
    }
    showText(){
        this.buildTextWrap();
        this.buildTextBlock();
        this.setTextPosition();
        this.textBlock.addChild(this.text);
        this.textWrap.addChild(this.textBlock);
        this.app.stage.addChild(this.textWrap);
        this.destroyed = false;
    }
}
export default TextScreen;