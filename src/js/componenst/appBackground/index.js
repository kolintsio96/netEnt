import * as PIXI from "pixi.js";
import AppConfig from "../../config";

class AppBackground {
    constructor(app) {
        this.app  = app;
        this.background = PIXI.Sprite.from(AppConfig.images.appBg);
        this.init();
    }
    setSize(){
        this.background.width = this.app.screen.width;
        this.background.height = this.app.screen.height;
    }
    init(){
        this.setSize();
        this.app.stage.addChild(this.background);
    }

}

export default AppBackground;