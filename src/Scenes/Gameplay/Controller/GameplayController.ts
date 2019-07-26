import * as PIXI from "pixi.js";
import Player from "../../../Player/Player";
import Board from "../../GameIntro/Board/Board";
import GameplayView from "../View/GameplayView";
import PlayersInfoController from "../../GameIntro/PlayerInfo/Controller/PlayersInfoController";

export default class GameplayController extends PIXI.utils.EventEmitter {
    private _view: GameplayView;
    private _player1: Player;
    private _player2: Player;
    private _playersInfo: PlayersInfoController;

    constructor() {
        super();
        this._view = new GameplayView();
    }

    start(playersInfo: PlayersInfoController, board: Board): void {
        this._playersInfo = playersInfo;
        this._player1 = playersInfo.player1;
        this._player2 = playersInfo.player2;
        this._view.board = board;
        this._view.player1 = playersInfo.player1;
        this._view.player2 = playersInfo.player2;
        this._view.currentSign = playersInfo.player1.sign;
        this._view.fillArray();
        this._playersInfo.growUp(this._player1, GameplayView.CHANGING_SIZE);
        this._view.on("changePlayer", this.changePlayer, this);
        this._view.on("finished", this.onExit, this);
    }

    private changePlayer() {
        if (this._player1.width > this._player2.width) {
            this._playersInfo.growUp(this._player2, GameplayView.CHANGING_SIZE);
            this._playersInfo.shrink(this._player1, GameplayView.CHANGING_SIZE);
        } else {
            this._playersInfo.growUp(this._player1, GameplayView.CHANGING_SIZE);
            this._playersInfo.shrink(this._player2, GameplayView.CHANGING_SIZE);
        }
    }

    onExit(winner: string): void {
        this.emit("exit", winner);
    }
}
