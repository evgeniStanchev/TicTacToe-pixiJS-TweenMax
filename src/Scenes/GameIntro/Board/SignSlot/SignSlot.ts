import * as PIXI from "pixi.js";
import X from "../../Signs/X";
import { TimelineMax, TweenMax, Timeline } from "gsap";
import O from "../../Signs/O";
import Sign from "../../Signs/Sign";

export default class SignSlot extends PIXI.Graphics {
    private _isEmpty: boolean;
    private _sign: Sign;
    private _initHeight: number;
    private _looserMaskColor: number = 0x000000;

    constructor(height: number = 0, width: number = 0, color: number = 0x000000) {
        super();
        this.beginFill(color);
        this.drawRect(0, 0, width, height);
        this.endFill();
        this._isEmpty = true;
        this._initHeight = height;
    }

    get isEmpty(): boolean {
        return this._isEmpty;
    }

    public get sign(): Sign {
        if (this._sign != undefined) {
            return this._sign;
        }
        return null;
    }

    public setLooserMask(): void {
        const mask = new PIXI.Graphics();
        mask.beginFill(this._looserMaskColor, 0.5);
        mask.drawRect(0, 0, this.width, this._initHeight);
        mask.endFill();
        this.addChild(mask);
    }

    public drawSign(signType: string, timeline: TimelineMax) {
        switch (signType) {
            case "x": {
                this._sign = new X(timeline, this.width, this.height);
                break;
            }
            case "o": {
                this._sign = new O(timeline, this.width, this.height);
                break;
            }
            default:
                console.error("There is no such sign");
                break;
        }
        this._sign.on("drawingCompleted", () => {
            this.onComplete();
        });
        this.addChild(this._sign);
        this._sign.drawSign();
    }

    private onComplete(): void {
        this._isEmpty = false;
        this.emit("drawingCompleted");
    }
}
