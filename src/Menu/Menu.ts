import PlayButton from "./PlayButton";
import * as PIXI from "pixi.js";
import TextInput from "pixi-text-input";
import TextFieldError from "../Utilities/TextFieldError";
import MyTextInput from "../Utilities/TextInput";
import Scene from "../Game/GameController/Scene";

export default class Menu extends Scene {
    private readonly _app: PIXI.Application;

    private _playButton: PlayButton;
    private _inputPlayer1: TextInput;
    private _inputPlayer2: TextInput;
    private _background: PIXI.Sprite;
    private _textPlayer1: PIXI.BitmapText;
    private _textPlayer2: PIXI.BitmapText;
    private _titleText: PIXI.BitmapText;
    private _errorEmptyInputText: PIXI.Text;
    private _errorEqualNamesText: PIXI.Text;
    private _errorBiggerLengthText: PIXI.Text;
    private _namePlayer1: string;
    private _namePlayer2: string;

    constructor(app: PIXI.Application) {
        super();
        this._app = app;
    }
//public methods upper
    private createBackground() {
        this._background = PIXI.Sprite.from("background");
        this._background.anchor.set(0.5);
        this._background.x = this._app.screen.width / 2;
        this._background.y = this._app.screen.height / 2;
    }

    set namePlayer1(namePlayer1: any) {
        this._namePlayer1 = namePlayer1;
    }

    set namePlayer2(namePlayer2: any) {
        this._namePlayer2 = namePlayer2;
    }

    get errorEmptyInputText(): PIXI.Text {
        return this._errorEmptyInputText;
    }

    get errorEqualNamesText(): PIXI.Text {
        return this._errorEqualNamesText;
    }

    get errorBiggerLengthText(): PIXI.Text {
        return this._errorBiggerLengthText;
    }

    get background(): PIXI.Sprite {
        return this._background;
    }

    get textInputPlayer1(): TextInput {
        return this._inputPlayer1;
    }

    get textInputPlayer2(): TextInput {
        return this._inputPlayer2;
    }

    get app(): PIXI.Application {
        return this._app;
    }

    removeErrorTexts() {
        this.removeChild(this._errorEmptyInputText);
        this.removeChild(this._errorEqualNamesText);
        this.removeChild(this._errorBiggerLengthText);
    }

    private onAssetsLoaded() {
        this._app.stage.addChild(this);
        this.addChild(this.background);
        this.addChild(this._playButton);

        this._titleText = new PIXI.BitmapText("Tic-Tac-Toe", {
            font: {
                name: "Desyrel",
                size: 75,
            },
            align: "center",
        });
        this._titleText.x = this._app.screen.width / 3.5;
        this._titleText.y = this._app.screen.height / 12;
        this.addChild(this._titleText);

        this._textPlayer1 = new PIXI.BitmapText("Player 1", {
            font: {
                name: "Desyrel",
                size: 40,
            },
            align: "center",
        });
        this._textPlayer1.x = this._app.screen.width / 10;
        this._textPlayer1.y = this._app.screen.height / 1.6;
        this.addChild(this._textPlayer1);

        this._textPlayer2 = new PIXI.BitmapText("Player 2", {
            font: {
                name: "Desyrel",
                size: 40,
            },
            align: "center",
        });
        this._textPlayer2.x = this._app.screen.width / 1.4;
        this._textPlayer2.y = this._app.screen.height / 1.6;
        this.addChild(this._textPlayer2);

        this._inputPlayer1 = new MyTextInput(this._textPlayer1);
        this.addChild(this._inputPlayer1);
        this._inputPlayer2 = new MyTextInput(this._textPlayer2);
        this.addChild(this._inputPlayer2);

        this._errorEmptyInputText = new TextFieldError(
            "Please, write names!",
            30,
            this._app.screen.width / 3.25,
            this._app.screen.height / 25
        );
        this._errorEqualNamesText = new TextFieldError(
            "Names should be different!",
            30,
            this._app.screen.width / 3.75,
            this._app.screen.height / 25
        );
        this._errorBiggerLengthText = new TextFieldError(
            "Name's length should be less than 10!",
            30,
            this._app.screen.width / 6,
            this._app.screen.height / 25
        );
    }

    start(): void {
        this.createBackground();
        this._playButton = new PlayButton(this);
        const loader = new PIXI.Loader();
        loader.load(this.onAssetsLoaded.bind(this));
    }

    onExit(): void {
        this.emit("exit", this._namePlayer1, this._namePlayer2);
    }
}
