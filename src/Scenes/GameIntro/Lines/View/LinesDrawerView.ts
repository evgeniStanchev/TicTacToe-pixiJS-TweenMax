import * as PIXI from "pixi.js";
import { TweenMax, TimelineMax } from "gsap";
import FeatherController from "../../../../Feather/FeatherController";
import Board from "../../Board/Board";

export default class LinesDrawerView extends PIXI.Graphics {
    public static LINE_COLOR: number = 0xbf9b30;
    public static SPEED: number = 0.01;
    public static FACTOR: number = 750;
    private readonly _delay: number;
    private readonly _timeline: TimelineMax;
    private readonly _feather: FeatherController;

    constructor(timeline: TimelineMax) {
        super();
        this._feather = new FeatherController(0.6, true);
        this._timeline = timeline;
        this._delay = LinesDrawerView.SPEED / LinesDrawerView.FACTOR;
        this.lineStyle(Board.LINE_WIDTH, LinesDrawerView.LINE_COLOR);
    }

    get feather(): FeatherController {
        return this._feather;
    }

    public featherFadeAway() {
        this._timeline.add(this._feather.fadeAway());
    }

    private moveFeather(x: number, y: number) {
        TweenMax.to(this._feather, 0, {
            x: x,
            y: y,
        });
    }

    public drawHorizontalLine(x: number, y: number) {
        this._timeline.add(this._feather.goTo(0, y, 0.5));
        for (let currentX = 0; currentX <= x - Board.LINE_WIDTH; currentX++) {
            this._timeline.add(
                TweenMax.delayedCall(
                    this._delay,
                    (x: number, y: number) => {
                        this.beginFill(LinesDrawerView.LINE_COLOR);
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

    public drawVerticalLine(x: number, y: number) {
        this._timeline.add(this._feather.goTo(x, 0, 0.5));
        for (let currentY = 0; currentY <= y - Board.LINE_WIDTH; currentY++) {
            this._timeline.add(
                TweenMax.delayedCall(
                    this._delay,
                    (x: number, y: number) => {
                        this.beginFill(LinesDrawerView.LINE_COLOR);
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

    public drawHorizontalLines() {
        const x = this.width - Board.LINE_WIDTH;
        const y = this.height / 3 - Board.LINE_WIDTH / 2;
        this.drawHorizontalLine(x, y);
        this.drawHorizontalLine(x, y * 2);
    }

    public drawVerticalLines() {
        const x = this.width / 3 - Board.LINE_WIDTH / 2;
        const y = this.height - Board.LINE_WIDTH / 2;
        this.drawVerticalLine(x, y);
        this.drawVerticalLine(x * 2, y);
    }
}
