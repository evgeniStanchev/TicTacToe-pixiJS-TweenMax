import Main from "../../../Main";
import TextFieldError from "../../../Utilities/TextFieldError";
import MyTextInput from "../../../Utilities/TextInput";
import TextInput from "pixi-text-input";
import * as PIXI from "pixi.js";

export default class MenuView extends PIXI.Container {
    private readonly _playButtonX: number = Main.GAME_WIDTH / 2.75;
    private readonly _playButtonY: number = Main.GAME_HEIGHT / 1.25;
    private readonly _playButtonWidth: number = 200;
    private readonly _playButtonHeight: number = 80;

    private readonly _titleTextSize: number = 75;
    private readonly _titleTextX: number = Main.GAME_WIDTH / 3.5;
    private readonly _titleTextY: number = Main.GAME_HEIGHT / 12;

    private readonly _textPlayerSize: number = 40;

    private readonly _textPlayer1X: number = Main.GAME_WIDTH / 10;
    private readonly _textPlayer1Y: number = Main.GAME_HEIGHT / 1.6;

    private readonly _textPlayer2X: number = Main.GAME_WIDTH / 1.4;
    private readonly _textPlayer2Y: number = Main.GAME_HEIGHT / 1.6;

    private readonly _errorTextFieldsSize: number = 30;
    private readonly _errorTextFieldsHeight: number = Main.GAME_HEIGHT / 25;
    private readonly _errorTextFieldsWidth: number = Main.GAME_WIDTH / 3.25;

    private _inputPlayer1: TextInput;
    private _inputPlayer2: TextInput;
    private _background: PIXI.Sprite;
    private _playButton: PIXI.Sprite;

    private _errorEmptyInputText: PIXI.Text;
    private _errorEqualNamesText: PIXI.Text;
    private _errorBiggerLengthText: PIXI.Text;
    private _textPlayer1: PIXI.BitmapText;
    private _textPlayer2: PIXI.BitmapText;
    private _titleText: PIXI.BitmapText;

    constructor() {
        super();
        this.createBackground();
        this.createButton();
        this.createBitmapTexts();
        this.createInputs();
        this.createErrorTexts();
        this.addFunctionallity();
    }

    private createButton() {
        this._playButton = new PIXI.Sprite();
        this._playButton.texture = PIXI.Texture.from("playButton");
        this._playButton.x = this._playButtonX;
        this._playButton.y = this._playButtonY;
        this._playButton.width = this._playButtonWidth;
        this._playButton.height = this._playButtonHeight;
        this._playButton.interactive = true;
        this._playButton.buttonMode = true;
        this.addChild(this._playButton);
    }

    private createBackground() {
        this._background = PIXI.Sprite.from("background");
        this._background.x = (Main.GAME_WIDTH - this._background.width) / 2;
        this._background.y = (Main.GAME_HEIGHT - this._background.height) / 2;
        this.addChild(this._background);
    }

    private createBitmapTexts() {
        this._titleText = new PIXI.BitmapText("Tic-Tac-Toe", {
            font: {
                name: "Desyrel",
                size: this._titleTextSize,
            },
        });
        this._titleText.x = this._titleTextX;
        this._titleText.y = this._titleTextY;
        this.addChild(this._titleText);

        this._textPlayer1 = new PIXI.BitmapText("Player 1", {
            font: {
                name: "Desyrel",
                size: this._textPlayerSize,
            },
        });
        this._textPlayer1.x = this._textPlayer1X;
        this._textPlayer1.y = this._textPlayer1Y;
        this.addChild(this._textPlayer1);

        this._textPlayer2 = new PIXI.BitmapText("Player 2", {
            font: {
                name: "Desyrel",
                size: this._textPlayerSize,
            },
        });
        this._textPlayer2.x = this._textPlayer2X;
        this._textPlayer2.y = this._textPlayer2Y;
        this.addChild(this._textPlayer2);
    }

    private createInputs() {
        this._inputPlayer1 = new MyTextInput();
        this._inputPlayer1.x = this._textPlayer1X - 20;
        this._inputPlayer1.y = this._textPlayer1Y + 60;
        this.addChild(this._inputPlayer1);

        this._inputPlayer2 = new MyTextInput();
        this._inputPlayer2.x = this._textPlayer2X - 20;
        this._inputPlayer2.y = this._textPlayer2Y + 60;
        this.addChild(this._inputPlayer2);
    }

    private removeErrorTexts() {
        this.removeChild(this._errorEmptyInputText);
        this.removeChild(this._errorEqualNamesText);
        this.removeChild(this._errorBiggerLengthText);
    }

    private createErrorTexts() {
        this._errorEmptyInputText = new TextFieldError("Please, write names!", this._errorTextFieldsSize);
        this._errorEmptyInputText.x = this._errorTextFieldsWidth;
        this._errorEmptyInputText.y = this._errorTextFieldsHeight;

        this._errorEqualNamesText = new TextFieldError("Names should be different!", this._errorTextFieldsSize);
        this._errorEqualNamesText.x = this._errorTextFieldsWidth;
        this._errorEqualNamesText.y = this._errorTextFieldsHeight;

        this._errorBiggerLengthText = new TextFieldError("Too much letters(max 10)!", this._errorTextFieldsSize);
        this._errorBiggerLengthText.x = this._errorTextFieldsWidth;
        this._errorBiggerLengthText.y = this._errorTextFieldsHeight;
    }

    public onExit() {
        this.emit("buttonClicked", this._inputPlayer1.text, this._inputPlayer2.text);
    }

    private addFunctionallity() {
        this._playButton.on("pointertap", () => {
            this.removeErrorTexts();
            if (this.isWrongInput()) {
                return;
            }
            this.onExit();
        });
    }

    private isWrongInput() {
        if (this._inputPlayer1.text === "" || this._inputPlayer2.text === "") {
            this.addChild(this._errorEmptyInputText);
            return true;
        } else if (this._inputPlayer1.text === this._inputPlayer2.text) {
            this.addChild(this._errorEqualNamesText);
            return true;
        } else if (this._inputPlayer1.text.length > 10 || this._inputPlayer2.text.length > 10) {
            this.addChild(this._errorBiggerLengthText);
            return true;
        }
        return false;
    }

    public removeInputs() {
        const parent = this._inputPlayer1.htmlInput.parentNode;
        parent.removeChild(this._inputPlayer1.htmlInput);
        parent.removeChild(this._inputPlayer2.htmlInput);
    }
}
