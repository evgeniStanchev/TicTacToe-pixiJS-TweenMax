import * as PIXI from "pixi.js";
import { TweenMax, TimelineMax, Linear } from "gsap";
import FeatherController from "../../Feather/FeatherController";
import GameIntro from "../GameIntro";
import FeatherModel from "../../Feather/FeatherModel";
import FeatherView from "../../Feather/FeatherView";

export default class Lines extends PIXI.Graphics {
    public static LINE_COLOR: number = 0xbf9b30;
    public static SPEED: number = 0.5;
    private readonly _timeline: TimelineMax;
    // private readonly _delay: number;
    private _feather: FeatherController;

    constructor(timeline: TimelineMax) {
        super();
        this._timeline = timeline;
        this.lineStyle(GameIntro.LINE_WIDTH, Lines.LINE_COLOR);
    }

    private drawHorizontalLine(x: number, y: number) {
        this._timeline.add(this._feather.goTo(0, y, 0.5));
        for (let currentX = 0; currentX <= x - GameIntro.LINE_WIDTH; currentX++) {
            this._timeline.add(
                TweenMax.delayedCall(
                    Lines.SPEED / 750,
                    (x: number, y: number) => {
                        this.beginFill();
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
        for (let currentY = 0; currentY <= y - GameIntro.LINE_WIDTH; currentY++) {
            this._timeline.add(
                TweenMax.delayedCall(
                    Lines.SPEED / 750,
                    (x: number, y: number) => {
                        this.beginFill();
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
        const x = this.parent.width - GameIntro.LINE_WIDTH;
        const y = this.parent.height / 3 - GameIntro.LINE_WIDTH / 2;
        this.drawHorizontalLine(x, y);
        this.drawHorizontalLine(x, y * 2);
    }

    private drawVerticalLines() {
        const x = this.parent.width / 3 - GameIntro.LINE_WIDTH / 2;
        const y = this.parent.height - GameIntro.LINE_WIDTH / 2;
        this.drawVerticalLine(x, y);
        this.drawVerticalLine(x * 2, y);
    }

    public drawLines() {
        const featherView = new FeatherView();
        const featherModel = new FeatherModel(featherView);
        this._feather = new FeatherController(featherView, featherModel);
        this.drawHorizontalLines();
        this.drawVerticalLines();
        this._timeline.add(this._feather.fadeAway());
    }
}
