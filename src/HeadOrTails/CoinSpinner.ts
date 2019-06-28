import * as PIXI from "pixi.js";
import { TweenMax, TimelineMax } from "gsap";

export default class CoinSpinner extends PIXI.Container {
    private readonly _MAX_SIZE_COIN: number;
    private readonly _tail: PIXI.Sprite;
    private readonly _head: PIXI.Sprite;
    private readonly _coin: PIXI.Sprite;

    private readonly _multiplier: number;
    constructor(coin: PIXI.Sprite, head: PIXI.Sprite, tail: PIXI.Sprite, coinSize: number) {
        super();
        this._MAX_SIZE_COIN = coinSize;
        this._coin = coin;
        this._tail = tail;
        this._head = head;
        this._multiplier = Math.random() * 10 + 5;
    }

    spin(): void {
        const tl = new TimelineMax();
        for (let spinNum = 0; spinNum < this._multiplier; spinNum++) {
            tl.add(
                TweenMax.to(this._coin, 0.1, {
                    width: 0,
                })
            );
            tl.add(
                TweenMax.to(this._coin, 0, {
                    texture: this._tail.texture,
                })
            );
            tl.add(
                TweenMax.to(this._coin, 0.1, {
                    width: this._MAX_SIZE_COIN,
                })
            );

            if (++spinNum == this._multiplier) {
                break;
            }

            tl.add(
                TweenMax.to(this._coin, 0.1, {
                    width: 0,
                })
            );

            tl.add(
                TweenMax.to(this._coin, 0, {
                    texture: this._head.texture,
                })
            );

            tl.add(
                TweenMax.to(this._coin, 0.1, {
                    width: this._MAX_SIZE_COIN,
                })
            );
        }
        tl.add(() => {
            this.emit("finished", this._coin);
        });
    }
}
