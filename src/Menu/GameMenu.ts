import PlayButton from "./PlayButton";
import * as PIXI from "pixi.js";
import TextInput from "pixi-text-input";
import ErrorTextField from "../Utilities/ErrorTextField";
import BitmapTextField from "../Utilities/BitmapTextField";
import MyTextInput from "../Utilities/TextInput";

export default class GameMenu extends PIXI.DisplayObject {
    private readonly PATH_BITMAP_FONT: string = `assets/bitmap-font/`;
    private readonly playButton: PlayButton;
    private readonly _mainContainer: PIXI.Container;
    private readonly _app: PIXI.Application;
    private _background: PIXI.Sprite;
    private _inputPlayer1: TextInput;
    private _inputPlayer2: TextInput;
    private _titleText: PIXI.BitmapText;
    private _textPlayer1: PIXI.BitmapText;
    private _textPlayer2: PIXI.BitmapText;
    private _errorEmptyInputText: PIXI.Text;
    private _errorEqualNamesText: PIXI.Text;
    private _errorBiggerLengthText: PIXI.Text;

    constructor(app: PIXI.Application) {
        super();
        this._app = app;
        const loader: PIXI.Loader = new PIXI.Loader();
        loader.add('desyrel', this.PATH_BITMAP_FONT + 'desyrel.xml').load(this.onAssetsLoaded.bind(this));
        this._mainContainer = new PIXI.Container();
        this.createBackground();
        this.playButton = new PlayButton(this);
    };

    private createBackground() {
        this._background = PIXI.Sprite.from('assets/tictactoe-background.jpg');
        this._background.anchor.set(0.5);
        this._background.x = this._app.screen.width / 2;
        this._background.y = this._app.screen.height / 2;
    }

//Getters
    get errorEmptyInputText(): PIXI.Text {
        return this._errorEmptyInputText;
    }

    get errorEqualNamesText(): PIXI.Text {
        return this._errorEqualNamesText;
    }

    get errorBiggerLengthText(): PIXI.Text {
        return this._errorBiggerLengthText;
    }

    get titleText(): PIXI.BitmapText {
        return this._titleText;
    }

    get mainContainer(): PIXI.Container {
        return this._mainContainer;
    }

    get textPlayer1(): PIXI.BitmapText {
        return this._textPlayer1;
    }

    get textPlayer2(): PIXI.BitmapText {
        return this._textPlayer2;
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
        this.mainContainer.removeChild(this._errorEmptyInputText);
        this.mainContainer.removeChild(this._errorEqualNamesText);
        this.mainContainer.removeChild(this._errorBiggerLengthText);
    }

    onAssetsLoaded() {
        this._app.stage.addChild(this._mainContainer);
        this._mainContainer.addChild(this.background);
        this._mainContainer.addChild(this.playButton);

        this._titleText = new BitmapTextField("Tic-Tac-Toe", 75, "center", this._app.screen.width / 3.5, this._app.screen.height / 12);
        this._mainContainer.addChild(this._titleText);
        this._textPlayer1 = new BitmapTextField("Player 1", 40, "center", this._app.screen.width / 10, this._app.screen.height / 1.6);
        this._mainContainer.addChild(this._textPlayer1);
        this._textPlayer2 = new BitmapTextField("Player 2", 40, "center", this._app.screen.width / 1.4, this._app.screen.height / 1.6);
        this._mainContainer.addChild(this._textPlayer2);

        this._inputPlayer1 = new MyTextInput(this._textPlayer1);
        this._mainContainer.addChild(this._inputPlayer1);
        this._inputPlayer2 = new MyTextInput(this._textPlayer2);
        this._mainContainer.addChild(this._inputPlayer2);

        this._errorEmptyInputText = new ErrorTextField("Please, write names!", 30, this._app.screen.width / 3.25, this._app.screen.height / 25);
        this._errorEqualNamesText = new ErrorTextField("Names should be different!", 30, this._app.screen.width / 3.75, this._app.screen.height / 25);
        this._errorBiggerLengthText = new ErrorTextField("Name's length should be less than 10!", 30, this._app.screen.width / 6, this._app.screen.height / 25);
    }
}