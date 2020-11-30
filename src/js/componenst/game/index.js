import * as PIXI from "pixi.js";
import loadingScreen from "../loadingScreen";
import AppConfig from "../../common";

let appLoaded = (app) => {
    const slotTextures = [];
    AppConfig.images.slotsIcons.forEach(image => {
        slotTextures.push(PIXI.Texture.from(image))
    });
    loadingScreen(app, true);

    const reels = [];
    const reelContainer = new PIXI.Container();
    for (let i = 0; i < AppConfig.countColumns; i++) {
        const rc = new PIXI.Container();
        rc.x = i * AppConfig.REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        // Build the symbols
        for (let j = 0; j <= AppConfig.countRows; j++) {
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            // Scale the symbol to fit symbol area.
            symbol.y = j * AppConfig.SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(AppConfig.SYMBOL_SIZE / symbol.width, AppConfig.SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((AppConfig.SYMBOL_SIZE - symbol.width) / 2);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);

    const margin = (app.screen.height - AppConfig.SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(app.screen.width - AppConfig.REEL_WIDTH * 5);

    const bottom = new PIXI.Graphics();
    bottom.beginFill(0, 1);
    bottom.drawRect(0, AppConfig.SYMBOL_SIZE * 3 + margin, app.screen.width, margin);

    const playText = new PIXI.Text('Spin the wheels!', AppConfig.style);
    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);
    app.stage.addChild(bottom);

    bottom.interactive = true;
    bottom.buttonMode = true;
    bottom.addListener('pointerdown', () => {
        startPlay();
    });

    let running = false;

    let startPlay = () => {
        if (running) return;
        running = true;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    let reelsComplete = () => {
        running = false;
    }

    app.ticker.add((delta) => {
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            // Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = ((r.position + j) % r.symbols.length) * AppConfig.SYMBOL_SIZE - AppConfig.SYMBOL_SIZE;
                if (s.y < 0 && prevy > AppConfig.SYMBOL_SIZE) {
                    // Detect going over and swap a texture.
                    // This should in proper product be determined from some logical reel.
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(AppConfig.SYMBOL_SIZE / s.texture.width, AppConfig.SYMBOL_SIZE / s.texture.height);
                    s.x = Math.round((AppConfig.SYMBOL_SIZE - s.width) / 2);
                }
            }
        }
    });

    app.ticker.add((delta) => {
        const now = Date.now();
        const remove = [];
        for (let i = 0; i < tweening.length; i++) {
            const t = tweening[i];
            const phase = Math.min(1, (now - t.start) / t.time);

            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1) {
                t.object[t.property] = t.target;
                if (t.complete) t.complete(t);
                remove.push(t);
            }
        }
        for (let i = 0; i < remove.length; i++) {
            tweening.splice(tweening.indexOf(remove[i]), 1);
        }
    });
};

let backout = (amount) => {
    return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
};

const tweening = [];

let tweenTo = (object, property, target, time, easing, onchange, oncomplete) => {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);
    return tween;
}

let lerp = (a1, a2, t) => {
    return a1 * (1 - t) + a2 * t;
}

export default appLoaded;