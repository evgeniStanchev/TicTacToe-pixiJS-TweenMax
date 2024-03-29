import * as PIXI from "pixi.js";
import FeatherController from "../../../Feather/FeatherController";
import { TimelineMax, TweenMax } from "gsap";

export default abstract class Sign extends PIXI.Graphics {
    private readonly _character: string;

    protected readonly _featherScale: number = 0.4;
    protected readonly _color: number = 0xbf9b30;
    protected readonly _feather: FeatherController;
    protected readonly _lineSize: number;
    protected readonly _timeline: TimelineMax;
    protected readonly _area: PIXI.Graphics;

    constructor(timeline: TimelineMax, width: number, height: number, character: string) {
        super();

        this._character = character;
        this._area = new PIXI.Graphics();
        this._area.drawRect(0, 0, width, height);
        this.addChild(this._area);
        this._timeline = timeline;

        this._lineSize = 4;
        this.lineStyle(this._lineSize, this._color, 1);

        this._feather = new FeatherController(this._featherScale, false);
        this._feather.view.height = 0;
        this._feather.view.width = 0;
        this.addChild(this._feather.view);
    }

    public get character(): string {
        return this._character;
    }

    public onComplete(): TweenMax {
        return TweenMax.delayedCall(0, () => {
            this.emit("drawingCompleted");
        });
    }

    abstract drawSign(): void;
}
