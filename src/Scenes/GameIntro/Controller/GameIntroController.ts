import * as PIXI from "pixi.js";
import GameIntroView from "../View/GameIntroView";
import PlayersInfoController from "../PlayerInfo/Controller/PlayersInfoController";
import Board from "../Board/Board";

export default class GameIntroController extends PIXI.utils.EventEmitter {
    private _view: GameIntroView;

    constructor() {
        super();
    }

    get view(): PIXI.Container {
        return this._view;
    }

    start(namePlayer1: string, namePlayer2: string): void {
        this._view = new GameIntroView();
        this._view.on("exit", this.onExit, this);
        this._view.createPlayersInfo(namePlayer1, namePlayer2);
        this._view.insertPlayers();
        this._view.insertBoard();
        this._view.insertSigns();
        this._view.exit();
    }

    onExit(playersInfo: PlayersInfoController, board: Board): void {
        this.emit("exit", playersInfo, board);
    }
}
