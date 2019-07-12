import * as PIXI from "pixi.js";
import Menu from "../../Menu/Menu";
import HeadOrTail from "../../HeadOrTails/HeadOrTails";
import GameIntro from "../GameIntro/GameIntro";
import Gameplay from "../Gameplay/Gameplay";
import PlayersInfo from "../GameIntro/PlayerInfo/PlayersInfo";
import Canvas from "../GameIntro/Board/Canvas/Canvas";

export default class GameController {
    
    private _gameMenu: Menu;
    private _headOrTail: HeadOrTail;
    private _gameIntro: GameIntro;
    private _gameplay: Gameplay;

    constructor(app: PIXI.Application) {
        this._gameMenu = new Menu(app);
        this._gameIntro = new GameIntro(app);
        this._headOrTail = new HeadOrTail(app);
        this._gameplay = new Gameplay(app);

        this.setupEvents();
        this.startApp();
    }

    private startApp() {
        this._gameMenu.start();
    }

    private setupEvents() {
        this._gameMenu.on("exit", this.startHeadOrTail, this);
        this._headOrTail.on("exit", this.startGameIntro, this);
        this._gameIntro.on("exit", this.startGameplay, this);
    }

    private startGameIntro(firstPlayerName: string, secondPlayerName: string) {
        this._gameIntro.namePlayer1 = firstPlayerName;
        this._gameIntro.namePlayer2 = secondPlayerName;
        this._gameIntro.start();
    }

    private startGameplay(playersInfo : PlayersInfo, canvas : Canvas) {
        this._gameplay.player1 = playersInfo.player1;
        this._gameplay.player2 = playersInfo.player2;
        this._gameplay.canvas = canvas;
        this._gameplay.start();
    }

    private startHeadOrTail(namePlayer1: string, namePlayer2: string) {
        this._headOrTail.namePlayer1 = namePlayer1;
        this._headOrTail.namePlayer2 = namePlayer2;
        this._headOrTail.start();
    }
}
