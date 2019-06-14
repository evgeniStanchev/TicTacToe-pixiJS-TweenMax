import * as PIXI from "pixi.js";
export default class Sprite extends PIXI.Sprite {
    constructor(texture: PIXI.Texture, isInteractive: boolean, isButton: boolean, x: number, y: number, width: number, height: number) {
        super();
        this.texture = texture;
        this.interactive = isInteractive;
        this.buttonMode = isButton;
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}