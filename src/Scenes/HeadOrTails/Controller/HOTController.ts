import * as PIXI from "pixi.js";
import HOTView from "../View/HOTView";

export default class HOTController extends PIXI.utils.EventEmitter {
    private _view: PIXI.Container;

    constructor() {
        super();
    }

    get view(): PIXI.Container {
        return this._view;
    }

    public start(namePlayer1: string, namePlayer2: string) {
        this._view = new HOTView(namePlayer1, namePlayer2);
        this._view.on("winnerAnnounced", this.onExit, this);
    }

    onExit(winnerName: string, looserName: string): void {
        this.emit("exit", winnerName, looserName);
    }
}
