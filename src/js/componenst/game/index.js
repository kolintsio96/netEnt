import * as PIXI from "pixi.js";
import loadingScreen from "../loadingScreen";
import AppConfig from "../../common";
import buttonStart from "./Components/buttonStart";

let appLoaded = (app) => {
    const slotTextures = [];
    AppConfig.images.slotsIcons.forEach(image => {
        slotTextures.push(PIXI.Texture.from(image))
    });

    loadingScreen(app, true);

    const reels = [];
    const reelContainer = new PIXI.Container();
    for (let i = 0; i < AppConfig.countColumns; i++) {
        const columnContainer = new PIXI.Container();
        columnContainer.x = i * AppConfig.columnWidth + (AppConfig.diffBetweenCol * i);
        reelContainer.addChild(columnContainer);

        const reel = {
            container: columnContainer,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };

        // Create slot icons
        for (let j = 0; j <= AppConfig.countRows; j++) {
            let index = Math.floor(Math.random() * slotTextures.length);
            const slotIcon = new PIXI.Sprite(slotTextures[index]);
            // Scale the symbol to fit symbol area.
            slotIcon.y = j * AppConfig.rowHeight;
            slotIcon.x = 5;
            slotIcon.height = AppConfig.rowHeight / 1.3;
            slotIcon['iconId'] = index;
            reel.symbols.push(slotIcon);
            columnContainer.addChild(slotIcon);
        }
        columnContainer.width = AppConfig.columnWidth;
        reels.push(reel);
    }
    reelContainer.width = AppConfig.columnWidth * 3;
    app.stage.addChild(reelContainer);
    const positionTop = (app.screen.height - AppConfig.rowHeight * 3) / 2;
    const positionLeft = AppConfig.positionLeft;
    reelContainer.y = positionTop;
    reelContainer.x = positionLeft;

    buttonStart(app, reels);

    app.ticker.add(() => {
        for (let i = 0; i < reels.length; i++) {
            const currentColumn = reels[i];
            currentColumn.previousPosition = currentColumn.position;
            for (let j = 0; j < currentColumn.symbols.length; j++) {
                const currentIcon = currentColumn.symbols[j];
                const prevTopPosition = currentIcon.y;
                currentIcon.y = ((currentColumn.position + j) % currentColumn.symbols.length) * AppConfig.rowHeight - AppConfig.rowHeight;
                if (currentIcon.y < 0 && prevTopPosition > AppConfig.rowHeight) {
                    let index = Math.floor(Math.random() * slotTextures.length);
                    currentIcon.texture = slotTextures[index];
                    currentIcon['iconId'] = index;
                }
            }
        }
    });
};

export default appLoaded;