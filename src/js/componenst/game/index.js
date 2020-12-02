import * as PIXI from "pixi.js";
import AppConfig from "../../config";
import ButtonStart from "./Components/buttonStart";

class AppLoaded{
    constructor(app, loadingScreen) {
        this.app = app;
        this.loadingScreen = loadingScreen;
        this.reelContainer = new PIXI.Container();
        this.slotTextures = [];
        this.reels = [];
        this.positionTop = (app.screen.height - AppConfig.rowHeight * 3) / 2;
        this.positionLeft = AppConfig.positionLeft;
        this.init();
    }
    buildSlotIcons(){
        for (let i = 0; i < AppConfig.countColumns; i++) {
            const columnContainer = new PIXI.Container();
            columnContainer.x = i * AppConfig.columnWidth + (AppConfig.diffBetweenCol * i);
            this.reelContainer.addChild(columnContainer);

            const reel = {
                container: columnContainer,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new PIXI.filters.BlurFilter(),
            };

            for (let j = 0; j <= AppConfig.countRows; j++) {
                let index = Math.floor(Math.random() * this.slotTextures.length);
                const slotIcon = new PIXI.Sprite(this.slotTextures[index]);
                slotIcon.y = j * AppConfig.rowHeight;
                slotIcon.x = 5;
                slotIcon.height = AppConfig.rowHeight / 1.3;
                slotIcon['iconId'] = index;
                reel.symbols.push(slotIcon);
                columnContainer.addChild(slotIcon);
            }
            columnContainer.width = AppConfig.columnWidth;
            this.reels.push(reel);
        }
    }
    buildReelContainer(){
        this.reelContainer.width = AppConfig.columnWidth * 3;
        this.reelContainer.y = this.positionTop;
        this.reelContainer.x = this.positionLeft;
    }
    getSlotIcons(){
        AppConfig.images.slotsIcons.forEach(image => {
            this.slotTextures.push(PIXI.Texture.from(image))
        });
    }
    ticker(){
        this.app.ticker.add(() => {
            for (let i = 0; i < this.reels.length; i++) {
                const currentColumn = this.reels[i];
                currentColumn.previousPosition = currentColumn.position;
                for (let j = 0; j < currentColumn.symbols.length; j++) {
                    const currentIcon = currentColumn.symbols[j];
                    const prevTopPosition = currentIcon.y;
                    currentIcon.y = ((currentColumn.position + j) % currentColumn.symbols.length) * AppConfig.rowHeight - AppConfig.rowHeight;
                    if (currentIcon.y < 0 && prevTopPosition > AppConfig.rowHeight) {
                        let index = Math.floor(Math.random() * this.slotTextures.length);
                        currentIcon.texture = this.slotTextures[index];
                        currentIcon['iconId'] = index;
                    }
                }
            }
        });
    }
    init(){
        this.getSlotIcons();
        this.loadingScreen.destroy();
        this.buildSlotIcons();
        this.buildReelContainer();
        new ButtonStart(this.app, this.reels);
        this.app.stage.addChild(this.reelContainer);
        this.ticker();
    }
}

export default AppLoaded;