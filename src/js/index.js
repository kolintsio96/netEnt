import "../style/styles.scss";
import * as PIXI from 'pixi.js';
import AppConfig from './common';
import loadingScreen from './componenst/loadingScreen'
import appLoaded from './componenst/game'
import appBackground from "./componenst/appBackground";

const app = new PIXI.Application(AppConfig.windowConfig);
const nodeApp = document.getElementById('app');
nodeApp.appendChild(app.view);

appBackground(app);
loadingScreen(app);

AppConfig.images.slotsIcons.forEach(image => {
    app.loader.add(image, image);
});
app.loader.load(appLoaded.bind(this, app));