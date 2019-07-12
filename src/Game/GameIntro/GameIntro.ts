import * as PIXI from "pixi.js";
import {  TimelineMax, TweenMax } from "gsap";
import Scene from "../GameController/Scene";
import Board from "./Board/Board";
import PlayersInfo from "./PlayerInfo/PlayersInfo";

//TODO The size of the names can change the size of the font
//TODO onMethods to be in controller class
export default class GameIntro extends Scene {
    private readonly _timeline: TimelineMax;
    private _board: Board;
    private _app: PIXI.Application;
    private _playersInfo : PlayersInfo;

    constructor(app: PIXI.Application) {
        super();
        this._app = app;
        this._app.stage.interactive = true;
        //TODO Controller-a трябва да добавя childs към app
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

    start(): void {
        this._playersInfo.insertNames();
        this.insertBoard();
        this._playersInfo.insertSigns();
        this._timeline.add(()=> this.onExit());
    }

    private insertBoard() {
        this._board = new Board(this._timeline);
        this._board.drawBoard();
        this.addChild(this._board);
    }

    onExit(): void {
        this.emit("exit", this._playersInfo, this._board.canvas);
    }
}
