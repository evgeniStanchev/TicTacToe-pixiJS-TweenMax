import * as PIXI from "pixi.js";
import { TimelineMax } from "gsap";
import Board from "../Board";
import Lines from "../../Lines/Lines";

export default class Canvas extends PIXI.Graphics {
    private readonly _lines: Lines;
    
    constructor(width: number, height: number, timeline: TimelineMax) {
        super();
        this.interactive = true;
        this.width = width;
        this.height = height + Board.LINE_WIDTH;
        this.beginFill(0xffffff);
        this.drawRect(0,0, width, height);
        this.endFill();
        this._lines = new Lines(timeline);
      
    }

    public drawBoard() {
        this._lines.drawRect(-Board.LINE_WIDTH / 2, -Board.LINE_WIDTH / 2, this.width, this.height);
        this.addChild(this._lines);
        this._lines.drawLines();
    }

    
}
