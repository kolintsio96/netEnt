import * as PIXI from "pixi.js";
import AppConfig from '../../config';

class CounterBlock{
    constructor(app) {
        this.app = app;
        this.totalCount = AppConfig.counter.initialPoint;
        this.textBlock = new PIXI.Graphics();
        this.counterText = new PIXI.Text(`MONEY: ${this.totalCount}`, AppConfig.styleCounter);
        this.init();
    }
    get getTotalCount(){
        return this.totalCount;
    }
    setTotalCount(count){
        this.totalCount += count;
        this.counterText.text = `MONEY: ${this.totalCount}`;
    }
    addTextBlockConfig(){
        this.textBlock.beginFill(0, 0.5);
        this.textBlock.drawRect(0, 0, AppConfig.counter.width, AppConfig.counter.height);
        this.textBlock.addChild(this.counterText);
    }
    setTextPosition(){
        this.counterText.x = this.app.screen.width - this.counterText.width - AppConfig.counter.y - 15;
        this.counterText.y = AppConfig.counter.y;
    }
    init(){
        this.setTextPosition();
        this.addTextBlockConfig();
        this.app.stage.addChild(this.counterText);
    }
}
export default CounterBlock;