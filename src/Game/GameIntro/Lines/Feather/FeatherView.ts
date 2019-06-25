import FeatherController from "./FeatherController";
import * as PIXI from "pixi.js";

export default class FeatherView extends PIXI.Sprite {
    private _stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        super();
        this._stage = stage;
        this.texture = PIXI.Texture.from(`feather`);
        this.interactive = true;
        stage.addChild(this);
    }

    get stage(): PIXI.Container {
        return this._stage;
    }
}
