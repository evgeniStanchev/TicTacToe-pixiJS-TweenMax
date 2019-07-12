import * as PIXI from "pixi.js";
import { TweenMax, TimelineMax } from "gsap";
import FeatherController from "../../Feather/FeatherController";
import FeatherModel from "../../Feather/FeatherModel";
import FeatherView from "../../Feather/FeatherView";
import Board from "../Board/Board";

export default class Lines extends PIXI.Graphics {
    public static LINE_COLOR: number = 0xbf9b30;
    public static SPEED: number = 0.1;
    public static FACTOR: number = 750;
    
    private readonly _delay: number;
    private readonly _timeline: TimelineMax;
    private _feather: FeatherController;
    

    constructor(timeline: TimelineMax) {
        super();
        this._timeline = timeline;
        this._delay= Lines.SPEED/Lines.FACTOR;
        this.lineStyle(Board.LINE_WIDTH, Lines.LINE_COLOR);
    
    }

    public drawLines() {
        const featherView = new FeatherView();
        featherView.scale.set(0.6);
        featherView.interactive = true;
        const featherModel = new FeatherModel(featherView);
        this._feather = new FeatherController(featherView, featherModel);
        this.addChild(featherView);
        this.drawHorizontalLines();
        this.drawVerticalLines();
        this._timeline.add(this._feather.fadeAway());
    }

    private drawHorizontalLine(x: number, y: number) {
        this._timeline.add(this._feather.goTo(0, y, 0.5));
        for (let currentX = 0; currentX <= x - Board.LINE_WIDTH; currentX++) {
            this._timeline.add(
                TweenMax.delayedCall(
                    this._delay,
                    (x: number, y: number) => {
                        this.beginFill(Lines.LINE_COLOR);
                        this.moveTo(x, y);
                        this.moveFeather(x + 1, y);
                        this.lineTo(x + 1, y);
                        this.endFill();
                    },
                    [currentX, y]
                )
            );
        }
    }

    private drawVerticalLine(x: number, y: number) {
        this._timeline.add(this._feather.goTo(x, 0, 0.5));
        for (let currentY = 0; currentY <= y - Board.LINE_WIDTH; currentY++) {
            this._timeline.add(
                TweenMax.delayedCall(
                    this._delay,
                    (x: number, y: number) => {
                        this.beginFill(Lines.LINE_COLOR);
                        this.moveTo(x, y);
                        this.moveFeather(x, y + 1);
                        this.lineTo(x, y + 1);
                        this.endFill();
                    },
                    [x, currentY]
                )
            );
        }
    }

    private moveFeather(x: number, y: number, speed: number = 0) {
        TweenMax.to(this._feather, speed, {
            x: x,
            y: y,
        });
    }

    private drawHorizontalLines() {
        const x = this.width - Board.LINE_WIDTH;
        const y = this.height / 3 - Board.LINE_WIDTH / 2;
        this.drawHorizontalLine(x, y);
        this.drawHorizontalLine(x, y * 2);
    }

    private drawVerticalLines() {
        const x = this.width / 3 - Board.LINE_WIDTH / 2;
        const y = this.height - Board.LINE_WIDTH / 2;
        this.drawVerticalLine(x, y);
        this.drawVerticalLine(x * 2, y);
    }
}
