import * as PIXI from "pixi.js";
import GameIntro from "../../GameIntro/GameIntro";
import Lines from "../Lines/Lines";
import { TimelineMax } from "gsap";

export default class Board extends PIXI.Container {
    private readonly canvas: PIXI.Graphics;
    public static readonly BACKGROUND_COLOR: number = 0xffffff;

    private readonly _x: number = 190;
    private readonly _y: number = 125;
    private readonly _width: number = 420;
    private readonly _height: number = 420;

    private _lines: Lines;

    constructor(timeline: TimelineMax) {
        super();
        this.x = this._x;
        this.y = this._y;
        this.canvas = new PIXI.Graphics();
        this._lines = new Lines(timeline);
    }

    public drawBoard() {
        this.canvas.beginFill(0xffffff);
        this.canvas.drawRect(-GameIntro.LINE_WIDTH / 2, -GameIntro.LINE_WIDTH / 2, this._width, this._height);
        this.canvas.endFill();
        this.addChild(this.canvas);
        this._lines.drawRect(-GameIntro.LINE_WIDTH / 2, -GameIntro.LINE_WIDTH / 2, this._width, this._height);
        this.addChild(this._lines);
        this._lines.drawLines();
    }

}
