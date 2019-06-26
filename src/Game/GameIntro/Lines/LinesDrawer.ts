import * as PIXI from "pixi.js";
import { TweenMax } from "gsap";
import FeatherView from "./Feather/FeatherView";
import FeatherController from "./Feather/FeatherController";
import FeatherModel from "./Feather/FeatherModel";

export default class LinesDrawer extends PIXI.Graphics {
    private readonly _SPEED: number;
    private readonly _LINE_WIDTH: number = 4;
    private readonly _color: number;

    constructor(container: PIXI.Container, width: number, color: number, speed: number) {
        super();
        this._SPEED = speed;
        this._color = color;
        this.lineStyle(width, color);
        container.addChild(this);
    }

    private drawHorizontalPoint(x: number, y: number) {
        this.beginFill(this._color);
        this.moveTo(x, y);
        this.lineTo(x + 1, y);
        this.endFill();
    }

    private drawVerticalPoint(x: number, y: number) {
        this.beginFill(this._color);
        this.moveTo(x, y);
        this.lineTo(x, y + 1);
        this.endFill();
    }

    private drawHorizontalLine(x: number, y: number) {
        let currentX = 0;
        while (currentX <= x - this._LINE_WIDTH) {
            TweenMax.delayedCall((currentX * 0.0047) / this._SPEED, this.drawHorizontalPoint, [currentX++, y], this);
        }
    }

    private drawVerticalLine(x: number, y: number) {
        let currentY = 0;
        while (currentY <= y - this._LINE_WIDTH) {
            TweenMax.delayedCall((currentY * 0.0047) / this._SPEED, this.drawVerticalPoint, [x, currentY++], this);
        }
    }

    private drawHorizontalLines(container: PIXI.Container) {
        let x = container.width - this._LINE_WIDTH;
        let y = container.height / 3 - this._LINE_WIDTH / 2;
        TweenMax.delayedCall(1 / this._SPEED, this.drawHorizontalLine, [x, y], this);

        y *= 2;
        TweenMax.delayedCall(4 / this._SPEED, this.drawHorizontalLine, [x, y], this);
    }

    private drawVerticalLines(container: PIXI.Container) {
        let x = container.width / 3 - this._LINE_WIDTH / 2;
        let y = container.height - this._LINE_WIDTH / 2;
        TweenMax.delayedCall(7 / this._SPEED, this.drawVerticalLine, [x, y], this);
        x *= 2;
        TweenMax.delayedCall(10 / this._SPEED, this.drawVerticalLine, [x, y], this);
    }

    public drawLines(container: PIXI.Container) {
        this.drawHorizontalLines(container);
        this.drawVerticalLines(container);
        const featherView = new FeatherView(container);
        const featherModel = new FeatherModel(featherView);
        const featherController = new FeatherController(featherView, featherModel);
        featherController.moveFeather(this._SPEED);
    }
}
