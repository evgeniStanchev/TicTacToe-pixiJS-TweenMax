import { TimelineMax, Linear, TweenMax } from "gsap";
import * as PIXI from "pixi.js";
import FeatherView from "./FeatherView";
import FeatherModel from "./FeatherModel";

export default class FeatherController {
    private readonly _view: FeatherView;
    private readonly _model: FeatherModel;
    private readonly FEATHER_SCALE = 0.6;
    private readonly LINES_COUNT = 2;
    private SPEED: number;

    constructor(view : FeatherView, model : FeatherModel,  containerBoard: PIXI.Container, speed: number) {
        this.SPEED = speed;
        this._view = view;
        this._view.scale.set(0.6);
    }

    //TODO use Timeline and Events
    public moveFeather() {
        let duration: number = 1;
        let tl = new TimelineMax();

        //horizontal lines
        for (let line = 1; line <= 2; line++) {
            tl.add(
                TweenMax.to(this._view, duration / this.SPEED, {
                    x: 0,
                    y: line * (this._view.stage.height / 3) - this._view.height,
                    ease: Linear.easeNone,
                })
            );
            tl.add(
                TweenMax.to(this._view, (duration + 1) / this.SPEED, {
                    x: this._view.stage.width,
                    y: line * (this._view.stage.height / 3) - this._view.height,
                    ease: Linear.easeNone,
                })
            );
        }

        //vertical lines
        for (let line = 1; line <= 2; line++) {
            tl.add(
                TweenMax.to(this._view, duration / this.SPEED, {
                    x: line * (this._view.stage.width / 3),
                    y: -this._view.height,
                    ease: Linear.easeNone,
                })
            );
            tl.add(
                TweenMax.to(this._view, (duration + 1) / this.SPEED, {
                    x: line * (this._view.stage.width / 3),
                    y: this._view.stage.height - this._view.height,
                    ease: Linear.easeNone,
                })
            );
        }
        tl.add(
            TweenMax.to(this._view, duration + 2, {
                x: 800,
                y: 0,
                rotation: 45,
                visible: false,
            })
        );
    }
}
