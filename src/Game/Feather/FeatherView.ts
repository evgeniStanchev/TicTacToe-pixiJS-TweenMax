import * as PIXI from "pixi.js";

export default class FeatherView extends PIXI.Sprite {
    private _stage: PIXI.Container;

    constructor(scale: number = 0.6) {
        super();
        this.texture = PIXI.Texture.from(`feather`);
        this.interactive = true;
        this.scale.set(scale);
    }
    
    get stage(): PIXI.Container {
        return this._stage;
    }
}
