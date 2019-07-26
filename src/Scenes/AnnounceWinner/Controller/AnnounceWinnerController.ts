import * as PIXI from "pixi.js";
import AnnounceWinnerView from "../View/AnnounceWinnerView";

export default class AnnounceWinnerController extends PIXI.utils.EventEmitter {
    private _view: AnnounceWinnerView;

    constructor() {
        super();
        this._view = new AnnounceWinnerView();
        this._view.on("exit", this.onExit, this);
    }

    public get view(): AnnounceWinnerView {
        return this._view;
    }

    start(winnerName: string): void {
        this._view.winnerName = winnerName;
        this._view.onStart();
    }

    onExit(): void {
        this.emit("exit");
    }
}
