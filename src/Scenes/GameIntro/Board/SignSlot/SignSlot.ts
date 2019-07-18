import * as PIXI from "pixi.js";
import X from "../../Signs/X";
import { TimelineMax } from "gsap";
import O from "../../Signs/O";

export default class SignSlot extends PIXI.Graphics {
    private _isEmpty: boolean;

    constructor(height: number, width: number, color: number = 0x000000) {
        super();
        this.beginFill(color);
        this.drawRect(0, 0, width, height);
        this.endFill();
        this._isEmpty = true;
    }

    get isEmpty(): boolean {
        return this._isEmpty;
    }

    public _fill() {
        this._isEmpty = false;
    }

    public drawSign(signType: string, timeline: TimelineMax) {
        if (signType.toLowerCase() === "x") {
            const sign = new X(timeline, this.width, this.height);
            this.addChild(sign);
            sign.drawSign();
        }
        if (signType.toLowerCase() === "o") {
            const sign = new O(timeline, this.width, this.height);
            this.addChild(sign);
            sign.drawSign();
        }
    }
}
