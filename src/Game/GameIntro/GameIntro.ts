import * as PIXI from "pixi.js";
import {  TimelineMax } from "gsap";
import Scene from "../GameController/Scene";
import Board from "./Board/Board";
import PlayersInfo from "./PlayerInfo/PlayersInfo";

//TODO The size of the names can change the size of the font
export default class GameIntro extends Scene {
<<<<<<< HEAD
    start(): void {
        throw new Error("Method not implemented.");
    }
    private readonly _LINE_WIDTH: number = 4;

    private _containerBoard: PIXI.Container;
    private _drawer: Drawer;

    private _xRectangle: number = 190;
    private _yRectangle: number = 125;
    private _widthRectangle: number = 420;
    private _heightRectangle: number = 420;

=======
    private readonly _timeline: TimelineMax;
    private _board: Board;
>>>>>>> 679e2fb1fe7e8c6a3fab1bb378c888839b3c1ba4
    private _app: PIXI.Application;
    private _playersInfo : PlayersInfo;

    constructor(app: PIXI.Application) {
        super();
        this._app = app;
        this._app.stage.interactive = true;
        this._app.stage.addChild(this);
        this._timeline = new TimelineMax();
        this._playersInfo = new PlayersInfo(this._timeline);
        this._playersInfo.y = 35;
        this.addChild(this._playersInfo);
    }
   
    get timeLine(): TimelineMax {
        return this.timeLine;
    }

    set namePlayer1(name: string) {
        this._playersInfo.namePlayer1 = name;
    }

    set namePlayer2(name: string) {
        this._playersInfo.namePlayer2 = name;
    }

    onStart(): void {
        this._playersInfo.insertNames();
        this.insertBoard();
        this._playersInfo.insertSigns();
    }

    private insertBoard() {
        this._board = new Board(this._timeline);
        this._board.drawBoard();
        this.addChild(this._board);
    }

    onExit(): void {
        this.emit("exit", this._playersInfo.player1, this._playersInfo.player2);
    }
}
