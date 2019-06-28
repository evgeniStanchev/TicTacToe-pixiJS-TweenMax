import * as PIXI from "pixi.js";
import GameMenu from "../../Menu/GameMenu";
import HeadOrTail from "../../HeadOrTails/HeadOrTails";
import GameIntro from "../GameIntro/GameIntro";

export default class GameController {
    
    private _app: PIXI.Application;
    private _gameMenu: GameMenu;
    private _headOrTail: HeadOrTail;
    private _gameIntro: GameIntro;

    constructor(app: PIXI.Application) {
        this._app = app;
        this._gameMenu = new GameMenu(this._app);
        this._gameMenu.onStart();
        this._gameIntro = new GameIntro(this._app);
        this._headOrTail = new HeadOrTail(this._app);
        this.setupEvents();
    }

    private setupEvents() {
        this._gameMenu.on("exit", this.startHeadOrTail, this);
        this._headOrTail.on("exit", this.startGameIntro, this);
        this._gameIntro.on("exit", this.startGameIntro, this);
    }
    
    private startGameIntro(firstPlayerName: string, secondPlayerName: string){
        this._gameIntro.namePlayer1 = firstPlayerName;
        this._gameIntro.namePlayer2 = secondPlayerName;
        this._gameIntro.onStart();
    }

    private startHeadOrTail(namePlayer1: string, namePlayer2: string){
        this._headOrTail.namePlayer1 = namePlayer1;
        this._headOrTail.namePlayer2 = namePlayer2;
        this._headOrTail.onStart();
    }

}
