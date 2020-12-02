import * as PIXI from "pixi.js";
import AppConfig from "../../../../common";
import textScreen from "../textScreen";
import counterBlock from "../../../counter";

let buttonStart = (app, reels) => {
    const tweening = [];
    let running = false;
    let reelsComplete = () => {
        let result = {};
        let youWin = false;
        reels.forEach((reel) => {
            let newArr = new Array(...reel.symbols);
            let sortedArray = newArr.sort((a, b) => {return (a.y > b.y) ? 1 : (a.y < b.y) ? -1 : 0});
            sortedArray.forEach((icon, k) => {
                if(k !== 0 && icon.iconId !== 0){
                    if(result.hasOwnProperty(`row_${k}`)){
                        result[`row_${k}`].push(icon.iconId);
                    }else{
                        result[`row_${k}`] = [icon.iconId];
                    }
                }
            });
        });
        let callback = () => {
            running = false;
            button.texture = PIXI.Texture.from(AppConfig.images.activeButton);
        };
        for(let key in result){
            let set = [...new Set(result[key])];
            if(set.length <= 1){
                youWin = true;
                counterBlock(app, AppConfig.counter.winPoint);
                textScreen(app, false,'YOU WON !', callback);
                setTimeout(() => {
                    textScreen(app, true,'YOU WON !', callback);
                }, AppConfig.hideWinBlock);
                return false;
            }
        }
        if(!youWin){
            let countMonet = counterBlock(app);
            if(countMonet === 0){
                textScreen(app, false,'YOU LOSE !');
            }else {
                callback();
            }
        }
    };
    let backout = (amount) => {
        return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
    };
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
    };
    let lerp = (a1, a2, t) => {
        return a1 * (1 - t) + a2 * t;
    };
    let startPlay = () => {
        if (running) return;
        counterBlock(app, AppConfig.counter.runSlot);

        running = true;
        button.texture = PIXI.Texture.from(AppConfig.images.disableButton);
        for (let i = 0; i < reels.length; i++) {
            const currentColumn = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = currentColumn.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            tweenTo(currentColumn, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    };

    let button = new PIXI.Sprite(PIXI.Texture.from(AppConfig.images.activeButton));
    button.width = AppConfig.buttonWidth;
    button.height = AppConfig.buttonHeight;
    button.x = app.screen.width - AppConfig.buttonWidth - AppConfig.positionRight;
    button.y = app.screen.height/2 - AppConfig.buttonHeight/2;
    app.stage.addChild(button);
    button.interactive = true;
    button.buttonMode = true;
    button.addListener('pointerdown', startPlay);
    app.ticker.add(() => {
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
export default buttonStart;