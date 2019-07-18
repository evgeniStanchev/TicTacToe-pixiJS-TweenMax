import * as PIXI from "pixi.js";
import { TimelineMax } from "gsap";
import LinesDrawerController from "../Lines/Controller/LinesDrawerController";

export default class Board extends PIXI.Graphics {
    public static readonly LINE_WIDTH: number = 4;
    public static readonly BACKGROUND_COLOR: number = 0xffffff;

    private _linesDrawer: LinesDrawerController;

    constructor(timeline: TimelineMax) {
        super();
        this.interactive = true;
        this._linesDrawer = new LinesDrawerController(timeline);
        this.beginFill(0xffffff);
        this.drawRect(0, 0, 420, 420);
        this.endFill();
    }

    public drawBoard() {
        this._linesDrawer.view.drawRect(-Board.LINE_WIDTH / 2, -Board.LINE_WIDTH / 2, this.width, this.height);
        this.addChild(this._linesDrawer.view);
        this._linesDrawer.drawLines();
    }
}
