import * as PIXI from "pixi.js";

export default class FeatherView extends PIXI.Sprite {

    constructor() {
        super();
        this.texture = PIXI.Texture.from(`feather`);
    }
    
}
