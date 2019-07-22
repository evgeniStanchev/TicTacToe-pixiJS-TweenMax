import * as PIXI from "pixi.js";
import X from "../../Signs/X";
import { TimelineMax } from "gsap";
import O from "../../Signs/O";
import Sign from "../../Signs/Sign";

export default class SignSlot extends PIXI.Graphics {
    private _isEmpty: boolean;
    private _sign: Sign;

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

    public get sign() : Sign {
        return this._sign;
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
