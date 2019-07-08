import * as PIXI from "pixi.js";

export default class FeatherView extends PIXI.Sprite {
    private _stage: PIXI.Container;

    constructor() {
        super();
        this.texture = PIXI.Texture.from(`feather`);
    }
    
    get stage(): PIXI.Container {
        return this._stage;
    }
}
