import * as PIXI from "pixi.js";
import MenuController from "../Scenes/Menu/Controller/MenuController";
import HOTController from "../Scenes/HeadOrTails/Controller/HOTController";
import Gameplay from "../Scenes/Gameplay/Controller/GameplayController";
import GameIntroController from "../Scenes/GameIntro/Controller/GameIntroController";
import PlayersInfoController from "../Scenes/GameIntro/PlayerInfo/Controller/PlayersInfoController";
import Board from "../Scenes/GameIntro/Board/Board";
import Player from "../Player/Player";
import AnnounceWinnerController from "../Scenes/AnnounceWinner/Controller/AnnounceWinnerController";

export default class GameController {
    //TODO ctrls
    private _gameMenu: MenuController;
    private _headOrTail: HOTController;
    private _gameIntro: GameIntroController;
    private _gameplay: Gameplay;
    private _announceWinner: AnnounceWinnerController;
    private _app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this._app = app;
        this._gameMenu = new MenuController();
        this._headOrTail = new HOTController();
        this._gameIntro = new GameIntroController();
        this._gameplay = new Gameplay();
        this._announceWinner = new AnnounceWinnerController();
        this.setupEvents();
    }

    public startApp() {
        this._announceWinner.start("Evgeni");
        this._app.stage.addChild(this._announceWinner.view);
        // this._gameIntro.start("Evgeni", "Player2");
        // this._app.stage.addChild(this._gameIntro.view);
        // this._headOrTail.start("Player1", "Player2");
        // // this._app.stage.addChild(this._headOrTail.view);
        // this._gameMenu.start();
        // this._app.stage.addChild(this._gameMenu.view);
    }

    private setupEvents() {
        this._gameMenu.on("exit", this.startHeadOrTail, this);
        this._headOrTail.on("exit", this.startGameIntro, this);
        this._gameIntro.on("exit", this.startGameplay, this);
        this._gameplay.on("exit", this.announceWinner, this);
        this._announceWinner.on("exit", this.startMenu, this);
    }

    private startMenu(){
        this._app.stage.removeChildren();
        this._gameMenu.start();
        this._app.stage.addChild(this._gameMenu.view);
    }

    private startGameIntro(firstPlayerName: string, secondPlayerName: string) {
        this._app.stage.removeChildren();
        this._gameIntro.start(firstPlayerName, secondPlayerName);
        this._app.stage.addChild(this._gameIntro.view);
    }

    private announceWinner(winner: string) {
        this._app.stage.removeChildren();
        this._announceWinner.start(winner);
        this._app.stage.addChild(this._announceWinner.view);
    }

    private startGameplay(playersInfo: PlayersInfoController, board: Board) {
        //TODO its not working
        const defaultIcon = "url('../../../assets/images/feather.png'), auto";
        this._app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
        //
        this._gameplay.start(playersInfo, board);
    }

    private startHeadOrTail(namePlayer1: string, namePlayer2: string) {
        this._app.stage.removeChildren();
        this._headOrTail.start(namePlayer1, namePlayer2);
        this._app.stage.addChild(this._headOrTail.view);
    }
}
