import * as PIXI from "pixi.js";
import X from "../../Signs/X";
import { TimelineMax } from "gsap";
import O from "../../Signs/O";
export default class Square extends PIXI.Graphics {
    private _isEmpty: boolean;

    constructor() {
        super();
        this._isEmpty = true;
    }

    get isEmpty(): boolean {
        return this._isEmpty;
    }

    public _fill() {
        this._isEmpty = false;
    }

    public drawSign(sign : string , timeline : TimelineMax){
        if(sign.toLowerCase() === "x"){
            new X(timeline, this);
        }
        if(sign.toLowerCase() === "o"){
            new O(timeline, this);
        }
    }
}
