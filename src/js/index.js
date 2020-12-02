import "../style/styles.scss";
import * as PIXI from 'pixi.js';
import AppConfig from './config';
import loadingScreen from './componenst/loadingScreen'
import AppLoaded from './componenst/game'
import AppBackground from "./componenst/appBackground";

class App {
    constructor() {
        this.app = new PIXI.Application(AppConfig.windowConfig);
        this.loadingScreen = new loadingScreen(this.app);
        this.nodeApp = document.getElementById('app');
        this.init();
    }
    loadApp(){
        AppConfig.images.slotsIcons.forEach(image => {
            this.app.loader.add(image, image);
        });
        this.app.loader.load(() => {
            new AppLoaded(this.app, this.loadingScreen);
        });
    }
    init(){
        this.nodeApp.appendChild(this.app.view);
        new AppBackground(this.app);
        this.loadingScreen.init();
        this.loadApp();
    }
}
new App();