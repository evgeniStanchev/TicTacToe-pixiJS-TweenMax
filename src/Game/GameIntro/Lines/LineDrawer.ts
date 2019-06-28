import * as PIXI from "pixi.js";
import { TweenMax } from "gsap";
import FeatherView from "./Feather/FeatherView";
import FeatherController from "./Feather/FeatherController";
import FeatherModel from "./Feather/FeatherModel";

export default class LineDrawer extends PIXI.Graphics {
    private readonly SPEED: number;
    private readonly LINE_WIDTH: number = 4;
    private readonly DELAY_FACTOR: number = 0.0047;
    private readonly LINE_COLOR: number = 0xbf9b30;
    private readonly container : PIXI.Container;


    constructor(container: PIXI.Container, width: number, speed: number) {
        super();
        this.SPEED = speed;
        this.lineStyle(width, this.LINE_COLOR);
        this.container = container;
        this.container.addChild(this);
    }

    private drawHorizontalPoint(x: number, y: number) {
        this.beginFill();
        this.moveTo(x, y);
        this.lineTo(x + 1, y);
        this.endFill();
    }

    private drawVerticalPoint(x: number, y: number) {
        this.beginFill();
        this.moveTo(x, y);
        this.lineTo(x, y + 1);
        this.endFill();
    }

    private drawHorizontalLine(x: number, y: number) {
        let currentX = 0;
        while (currentX <= x - this.LINE_WIDTH) {
            TweenMax.delayedCall(
                (currentX * this.DELAY_FACTOR) / this.SPEED,
                this.drawHorizontalPoint,
                [currentX++, y],
                this
            );
        }
    }

    private drawVerticalLine(x: number, y: number) {
        let currentY = 0;
        while (currentY <= y - this.LINE_WIDTH) {
            TweenMax.delayedCall(
                (currentY * this.DELAY_FACTOR) / this.SPEED,
                this.drawVerticalPoint,
                [x, currentY++],
                this
            );
        }
    }

    private drawHorizontalLines(container: PIXI.Container) {
        let x = container.width - this.LINE_WIDTH;
        let y = container.height / 3 - this.LINE_WIDTH / 2;
        TweenMax.delayedCall(1 / this.SPEED, this.drawHorizontalLine, [x, y], this);

        y *= 2;
        TweenMax.delayedCall(4 / this.SPEED, this.drawHorizontalLine, [x, y], this);
    }

    private drawVerticalLines(container: PIXI.Container) {
        let x = container.width / 3 - this.LINE_WIDTH / 2;
        let y = container.height - this.LINE_WIDTH / 2;
        TweenMax.delayedCall(7 / this.SPEED, this.drawVerticalLine, [x, y], this);
        x *= 2;
        TweenMax.delayedCall(10 / this.SPEED, this.drawVerticalLine, [x, y], this);
    }

    public drawLines() {
        this.drawHorizontalLines(this.container);
        this.drawVerticalLines(this.container);
        const featherView = new FeatherView(this.container);
        const featherModel = new FeatherModel(featherView);
        const featherController = new FeatherController(featherView, featherModel);
        featherController.moveFeather(this.SPEED);
    }
}
