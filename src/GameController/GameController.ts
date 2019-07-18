import * as PIXI from "pixi.js";
import MenuController from "../Scenes/Menu/Controller/MenuController";
import HOTController from "../Scenes/HeadOrTails/Controller/HOTController";
import Gameplay from "../Scenes/Gameplay/Controller/GameplayController";
import GameIntroController from "../Scenes/GameIntro/Controller/GameIntroController";
import PlayersInfoController from "../Scenes/GameIntro/PlayerInfo/Controller/PlayersInfoController";
import Board from "../Scenes/GameIntro/Board/Board";

export default class GameController {
    //TODO ctrls
    private _gameMenu: MenuController;
    private _headOrTail: HOTController;
    private _gameIntro: GameIntroController;
    private _gameplay: Gameplay;
    private _app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this._app = app;
        this._gameMenu = new MenuController();
        this._headOrTail = new HOTController();
        this._gameIntro = new GameIntroController();
        this._gameplay = new Gameplay();
        this.setupEvents();
    }

    public startApp() {
        this._gameIntro.start("Evgeni", "Player2");
        this._app.stage.addChild(this._gameIntro.view);
        // this._headOrTail.start("Player1", "Player2");
        // this._app.stage.addChild(this._headOrTail.view);
        // this._gameMenu.start();
        // this._app.stage.addChild(this._gameMenu.view);
    }

    private setupEvents() {
        this._gameMenu.on("exit", this.startHeadOrTail, this);
        this._headOrTail.on("exit", this.startGameIntro, this);
        this._gameIntro.on("exit", this.startGameplay, this);
    }

    private startGameIntro(firstPlayerName: string, secondPlayerName: string) {
        this._app.stage.removeChild(this._headOrTail.view);
        this._gameIntro.start(firstPlayerName, secondPlayerName);
        this._app.stage.addChild(this._gameIntro.view);
    }

    private startGameplay(playersInfo: PlayersInfoController, board : Board) {
        //TODO its not working
        const defaultIcon = "url('../../../assets/images/feather.png'), auto";
        this._app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
        //
        this._gameplay.player1 = playersInfo.player1;
        this._gameplay.player2 = playersInfo.player2;
        this._gameplay.board = board;
        this._gameplay.start();
    }

    private startHeadOrTail(namePlayer1: string, namePlayer2: string) {
        this._app.stage.removeChild(this._gameMenu.view);
        this._headOrTail.start(namePlayer1, namePlayer2);
        this._app.stage.addChild(this._headOrTail.view);
    }
}
