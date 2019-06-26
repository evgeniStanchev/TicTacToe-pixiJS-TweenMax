import { TweenMax, Linear, TimelineMax } from "gsap";
import FeatherView from "./FeatherView";

export default class FeatherModel {
    private readonly _LINES_COUNT = 2;
    private readonly _tl: TimelineMax = new TimelineMax();
    private readonly _duration: number = 1;
    private readonly _view: FeatherView;

    constructor(view: FeatherView) {
        this._view = view;
    }

    public moveFeather(speed : number) {
        //move horizontally and return to next line
        for (let line = 1; line <= this._LINES_COUNT; line++) {
            this._tl.add(
                TweenMax.to(this._view, this._duration / speed, {
                    x: 0,
                    y: line * (this._view.stage.height / 3) - this._view.height,
                    ease: Linear.easeNone,
                })
            );
            this._tl.add(
                TweenMax.to(this._view, (this._duration + 1) / speed, {
                    x: this._view.stage.width,
                    y: line * (this._view.stage.height / 3) - this._view.height,
                    ease: Linear.easeNone,
                })
            );
        }
        //move vertically and return to next line
        for (let line = 1; line <= this._LINES_COUNT; line++) {
            this._tl.add(
                TweenMax.to(this._view, this._duration / speed, {
                    x: line * (this._view.stage.width / 3),
                    y: -this._view.height,
                    ease: Linear.easeNone,
                })
            );
            this._tl.add(
                TweenMax.to(this._view, (this._duration + 1) / speed, {
                    x: line * (this._view.stage.width / 3),
                    y: this._view.stage.height - this._view.height,
                    ease: Linear.easeNone,
                })
            );
        }
        //exit
        this._tl.add(
            TweenMax.to(this._view, this._duration + 2, {
                x: 800,
                y: 0,
                rotation: 45,
                visible: false,
            })
        );
    }
}
