import * as PIXI from "pixi.js";
import FeatherController from "../../Feather/FeatherController";
import { TimelineMax } from "gsap";


export default abstract class Sign extends PIXI.Graphics {
    protected _size: number;
    protected _color: number;
    protected _lineSize: number;
    protected _timeline: TimelineMax;
    protected _feather: FeatherController;

    constructor(size: number, timeline : TimelineMax) {
        super();
        this._size = size;
        this._timeline = timeline;
        this._lineSize = 5;
        this._color = 0xbf9b30;
        this.lineStyle(this._lineSize, this._color, 1);
      
    }



    abstract drawSign(): void;
}
