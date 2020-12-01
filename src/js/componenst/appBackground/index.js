import * as PIXI from "pixi.js";
import AppConfig from "../../common";

let appBackground = (app) => {
    const background = PIXI.Sprite.from(AppConfig.images.appBg);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);
};

export default appBackground;