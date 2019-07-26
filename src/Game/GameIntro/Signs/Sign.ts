import * as PIXI from "pixi.js";
import FeatherController from "../../Feather/FeatherController";
import { TimelineMax } from "gsap";
import FeatherView from "../../Feather/FeatherView";
import FeatherModel from "../../Feather/FeatherModel";


export default abstract class Sign extends PIXI.Graphics {
    protected readonly _featherView: FeatherView;
    protected readonly _featherScale : number = 0.3;
    protected readonly _size: number;
    protected readonly _color: number;
    protected readonly _lineSize: number;
    protected readonly _timeline: TimelineMax;
    protected readonly _feather : FeatherController;

    constructor(size: number, timeline : TimelineMax) {
        super();
        this._size = size;
        this._timeline = timeline;
        this._lineSize = 5;
        this._color = 0xbf9b30;
        this.lineStyle(this._lineSize, this._color, 1);
        this._featherView = new FeatherView();
        this._featherView.width = 0;
        this._featherView.height = 0;
        const featherModel = new FeatherModel(this._featherView);
        this._feather = new FeatherController(this._featherView, featherModel);
        this.addChild(this._featherView);
      
    }



    abstract drawSign(): void;
}
