import * as PIXI from "pixi.js";
import AppConfig from '../../config';

class LoadingScreen{
    constructor(app) {
        this.app = app;
        this.textBlock = new PIXI.Graphics();
        this.loadingText = new PIXI.Text('Loading...', AppConfig.styleLoadingText);
        this.init()
    }
    addTextBlockConfig(){
        this.textBlock.beginFill(0, 1);
        this.textBlock.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.textBlock.addChild(this.loadingText);
    }
    setTextPosition(){
        this.loadingText.x = Math.round((this.textBlock.width - this.loadingText.width) / 2);
        this.loadingText.y = Math.round((this.app.screen.height / 2) - (this.loadingText.height / 2));
    }
    destroy(){
        this.textBlock.destroy();
    }
    init(){
        this.setTextPosition();
        this.addTextBlockConfig();
        this.app.stage.addChild(this.textBlock);
    }
}
export default LoadingScreen;