import * as PIXI from "pixi.js";
import { TimelineMax } from "gsap";
import Canvas from "./Canvas/Canvas";

export default class Board extends PIXI.Container {
    
    public static readonly LINE_WIDTH: number = 4;
    public static readonly BACKGROUND_COLOR: number = 0xffffff;
    
    private _canvas : Canvas;

    constructor(timeline: TimelineMax) {
        super();
        this.interactive = true;
        this.x = 190;
        this.y = 125;
        this.width = 420;
        this.height = 420;
        this._canvas = new Canvas(420,420,timeline);
        this.addChild(this._canvas);
    }

    get canvas(): Canvas{
        return this._canvas;
    }

    public drawBoard() {
       this._canvas.drawBoard();
    }

}
