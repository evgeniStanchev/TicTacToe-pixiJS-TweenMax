import * as PIXI from "pixi.js";
import Menu from "./Menu";

export default class PlayButton extends PIXI.Sprite {
    private readonly _app: PIXI.Application;
    private readonly _gameMenu: Menu;
    private _namePlayer1: string;
    private _namePlayer2: string;

    constructor(gameMenu: Menu) {
        super();
        this._app = gameMenu.app;
        this._gameMenu = gameMenu;
        this.texture = PIXI.Texture.from("playButton");
        this.x = this._app.screen.width / 2.75;
        this.y = this._app.screen.height / 1.25;
        this.width = 200;
        this.height = 80;
        this.interactive = true;
        this.buttonMode = true;
        this.addFunctionally();
    }

    private addFunctionally() {
        this.on("pointertap", () => {
            const { _gameMenu } = this;
            _gameMenu.removeErrorTexts();
            this._namePlayer1 = _gameMenu.textInputPlayer1.text;
            this._namePlayer2 = _gameMenu.textInputPlayer2.text;
            if (this.isWrongInput()) {
                return;
            }
            this._gameMenu.removeChildren();
            this._app.stage.removeChild(this._gameMenu);
            this._gameMenu.namePlayer1 = this._namePlayer1;
            this._gameMenu.namePlayer2 = this._namePlayer2;
            this._gameMenu.onExit();
        });
    }

    private isWrongInput() {
        if (this._namePlayer1 === "" || this._namePlayer2 === "") {
            this._gameMenu.addChild(this._gameMenu.errorEmptyInputText);
            return true;
        } else if (this._namePlayer1 === this._namePlayer2) {
            this._gameMenu.addChild(this._gameMenu.errorEqualNamesText);
            return true;
        } else if (this._namePlayer1.length > 10 || this._namePlayer2.length > 10) {
            this._gameMenu.addChild(this._gameMenu.errorBiggerLengthText);
            return true;
        }
        return false;
    }
}
