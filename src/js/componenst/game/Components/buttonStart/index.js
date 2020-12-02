import * as PIXI from "pixi.js";
import AppConfig from "../../../../config";
import TextScreen from "../textScreen";
import CounterBlock from "../../../counter";

class ButtonStart{
    constructor(app, reels) {
        this.app = app;
        this.reels = reels;
        this.counterBlock = new CounterBlock(this.app);
        this.loseText = new TextScreen(this.app, 'YOU LOSE !');
        this.winText = null;
        this.startButton = new PIXI.Sprite(PIXI.Texture.from(AppConfig.images.activeButton));
        this.tweening = [];
        this.running = false;
        this.result = {};
        this.youWin = false;
        this.init();
    }
    canStart(){
        this.running = false;
        this.startButton.texture = PIXI.Texture.from(AppConfig.images.activeButton);
    }
    reelsComplete(){
        this.result = {};
        this.youWin = false;
        this.reels.forEach((reel) => {
            let newArr = new Array(...reel.symbols);
            let sortedArray = newArr.sort((a, b) => {return (a.y > b.y) ? 1 : (a.y < b.y) ? -1 : 0});
            sortedArray.forEach((icon, k) => {
                if(k !== 0 && icon.iconId !== 0){
                    if(this.result.hasOwnProperty(`row_${k}`)){
                        this.result[`row_${k}`].push(icon.iconId);
                    }else{
                        this.result[`row_${k}`] = [icon.iconId];
                    }
                }
            });
        });
        this.checkWin();
    }
    checkWin(){
        for(let key in this.result){
            let set = [...new Set(this.result[key])];
            if(set.length <= 1){
                this.youWin = true;
                this.counterBlock.setTotalCount(AppConfig.counter.winPoint);
                this.winText = new TextScreen(this.app, 'YOU WON !', this.canStart.bind(this));
                this.winText.showText();
                setTimeout(() => {
                    this.winText.destroy();
                }, AppConfig.hideWinBlock);
                return false;
            }
        }
        if(!this.youWin){
            if(this.counterBlock.getTotalCount === 0){
                this.loseText.showText();
            }else {
                this.canStart();
            }
        }
    }
    backout(amount){
        return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
    }
    tweenTo(object, property, target, time, easing, onchange, oncomplete){
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

        this.tweening.push(tween);
        return tween;
    }
    lerp(a1, a2, t){
        return a1 * (1 - t) + a2 * t;
    }
    buildStartButton(){
        this.startButton.width = AppConfig.buttonWidth;
        this.startButton.height = AppConfig.buttonHeight;
        this.startButton.x = this.app.screen.width - AppConfig.buttonWidth - AppConfig.positionRight;
        this.startButton.y = this.app.screen.height/2 - AppConfig.buttonHeight/2;
        this.startButton.interactive = true;
        this.startButton.buttonMode = true;
        this.startButton.addListener('pointerdown', this.startPlay.bind(this));
    }
    ticker(){
        this.app.ticker.add(() => {
            const now = Date.now();
            const remove = [];
            for (let i = 0; i < this.tweening.length; i++) {
                const t = this.tweening[i];
                const phase = Math.min(1, (now - t.start) / t.time);

                t.object[t.property] = this.lerp(t.propertyBeginValue, t.target, t.easing(phase));
                if (t.change) t.change(t);
                if (phase === 1) {
                    t.object[t.property] = t.target;
                    if (t.complete) t.complete(t);
                    remove.push(t);
                }
            }
            for (let i = 0; i < remove.length; i++) {
                this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
            }
        });
    }
    startPlay(){
        if (this.running) return;
        this.counterBlock.setTotalCount(AppConfig.counter.runSlot);
        this.running = true;
        this.startButton.texture = PIXI.Texture.from(AppConfig.images.disableButton);
        for (let i = 0; i < this.reels.length; i++) {
            const currentColumn = this.reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = currentColumn.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            this.tweenTo(currentColumn, 'position', target, time, this.backout(0.5), null, i === this.reels.length - 1 ? this.reelsComplete.bind(this) : null);
        }
    }
    init(){
        this.buildStartButton();
        this.app.stage.addChild(this.startButton);
        this.ticker();
    }
}
export default ButtonStart;