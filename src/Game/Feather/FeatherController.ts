import FeatherView from "./FeatherView";
import FeatherModel from "./FeatherModel";
import { TweenMax } from "gsap";

export default class FeatherController {
    private readonly _view: FeatherView;
    private readonly _model: FeatherModel;
    private readonly _height: number;

    constructor(view: FeatherView, model: FeatherModel) {
        this._view = view;
        this._model = model;
        this._height = this._view.texture.height;
    }

    get height(){
        return this._height;
    }

    set x(x: number) {
        this._model.x = x;
    }

    set y(y: number) {
        this._model.y = y - this._view.height;
    }

    public goTo(x: number, y: number, duration: number = 0): TweenMax {
        return this._model.goTo(x, y, duration);
    }

    public fadeAway(): TweenMax{
        return this._model.fadeAway();
    }

    public arrive(scale : number): TweenMax{
        return this._model.arrive(scale);
    }


}
