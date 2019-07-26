import * as PIXI from "pixi.js";
import MenuView from "../View/MenuView";

export default class MenuController extends PIXI.utils.EventEmitter {
    private _view: MenuView;

    constructor() {
        super();
    }

    start(): void {
        this._view = new MenuView();
        this._view.on("buttonClicked", this.onExit, this);
    }

    onExit(namePlayer1: string, namePlayer2: string): void {
        this._view.removeInputs();
        this.emit("exit", namePlayer1, namePlayer2);
    }

    get view(): PIXI.Container {
        return this._view;
    }
}
