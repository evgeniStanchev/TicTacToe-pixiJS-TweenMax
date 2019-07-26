import * as PIXI from "pixi.js";
import { TweenMax, TimelineMax } from "gsap";
import HOTView from "./View/HOTView";
import Main from "../../Main";

export default class CoinSpinner extends PIXI.Container {
    private readonly _delay: number = 0.1;
    private readonly _multiplier: number = Math.floor(Math.random() * 10) + 5;
    private _tail: PIXI.Texture;
    private _head: PIXI.Texture;
    private _coin: PIXI.Sprite;
    private _coinX: number;
    private _coinY: number;

    constructor() {
        super();
        this._head = PIXI.Texture.from("head");
        this._tail = PIXI.Texture.from("tail");
        this.setInitialValues();
        this.createCoin();
    }

    get coin(): PIXI.Sprite {
        return this._coin;
    }

    spin(): void {
        const tl = new TimelineMax();
        for (let spinNum = 0; spinNum < this._multiplier; spinNum++) {
            tl.add(
                TweenMax.to(this._coin, this._delay, {
                    width: 0,
                })
            );
            tl.add(
                TweenMax.to(this._coin, 0, {
                    texture: this._tail,
                })
            );
            tl.add(
                TweenMax.to(this._coin, this._delay, {
                    width: HOTView.MAX_SIZE_COIN,
                })
            );
            if (++spinNum == this._multiplier) {
                break;
            }

            tl.add(
                TweenMax.to(this._coin, this._delay, {
                    width: 0,
                })
            );

            tl.add(
                TweenMax.to(this._coin, 0, {
                    texture: this._head,
                })
            );

            tl.add(
                TweenMax.to(this._coin, this._delay, {
                    width: HOTView.MAX_SIZE_COIN,
                })
            );
        }
        tl.add(() => {
            this.emit("finished", this._coin);
        });
    }

    private setInitialValues() {
        this._coinX = Main.GAME_WIDTH / 2;
        this._coinY = Main.GAME_HEIGHT / 1.5;
    }

    private createCoin() {
        this._coin = new PIXI.Sprite();
        this._coin.texture = this._head;
        this._coin.interactive = true;
        this._coin.anchor.set(0.5);
        this._coin.x = this._coinX;
        this._coin.y = this._coinY;
        this._coin.width = HOTView.MAX_SIZE_COIN;
        this._coin.height = HOTView.MAX_SIZE_COIN;
        this.addChild(this._coin);
    }
}
