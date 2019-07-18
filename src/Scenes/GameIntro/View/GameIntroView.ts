import * as PIXI from "pixi.js";
import { TimelineMax } from "gsap";
import PlayersInfoController from "../PlayerInfo/Controller/PlayersInfoController";
import Board from "../Board/Board";

export default class GameIntroView extends PIXI.Container {
    private _board: Board;
    private _playersInfo: PlayersInfoController;
    private readonly _timeline: TimelineMax;

    constructor() {
        super();
        this._timeline = new TimelineMax();
    }

    public insertBoard() {
        this._board = new Board(this._timeline);
        this._board.drawBoard();
        this._board.x = 190;
        this._board.y = 125;
        this.addChild(this._board);
    }

    public insertSigns() {
        this._playersInfo.insertSigns();
    }

    public insertPlayers() {
        this._playersInfo.insertPlayers();
    }

    public createPlayersInfo(namePlayer1: string, namePlayer2: string) {
        this._playersInfo = new PlayersInfoController(this._timeline, namePlayer1, namePlayer2);
        this.addChild(this._playersInfo.view);
    }

    public exit(){
        this._timeline.add(() => this.onExit());
    }

    private onExit(): void {
        this.emit("exit", this._playersInfo, this._board);
    }
}
