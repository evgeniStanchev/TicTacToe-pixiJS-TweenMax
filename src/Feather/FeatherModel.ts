import FeatherView from "./FeatherView";
import { TweenMax, Linear } from "gsap";

export default class FeatherModel {
    private readonly _view: FeatherView;

    constructor(view: FeatherView) {
        this._view = view;
    }

    set x(x: number) {
        this._view.x = x;
    }

    set y(y: number) {
        this._view.y = y;
    }

    public goTo(x: number, y: number, duration: number): TweenMax {
        return TweenMax.to(this._view, duration, {
            x: x,
            y: y - this._view.height,
            ease: Linear.easeNone,
        });
    }

    public fadeAway(): TweenMax {
        return TweenMax.to(this._view, 0.1, {
            width: 0,
            height: 0,
        });
    }

    public arrive(scale: number): TweenMax {
        return TweenMax.to(this._view, 1.5, {
            width: this._view.texture.width * scale,
            height: this._view.texture.height * scale,
        });
    }
}
