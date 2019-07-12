import * as PIXI from "pixi.js";

export default abstract class Scene extends PIXI.Container {
    constructor() {
        super();
    }
    abstract start(): void;
    abstract onExit(): void;
}
