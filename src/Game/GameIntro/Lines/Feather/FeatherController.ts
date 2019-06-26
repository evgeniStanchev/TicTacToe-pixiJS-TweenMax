import { TimelineMax, Linear, TweenMax } from "gsap";
import * as PIXI from "pixi.js";
import FeatherView from "./FeatherView";
import FeatherModel from "./FeatherModel";

export default class FeatherController {
    private readonly _view: FeatherView;
    private readonly _model: FeatherModel;

    constructor(view : FeatherView, model : FeatherModel) {
        this._view = view;
        this._model = model;
    }

    public moveFeather(speed : number) {
       this._model.moveFeather(speed);
    }
}
