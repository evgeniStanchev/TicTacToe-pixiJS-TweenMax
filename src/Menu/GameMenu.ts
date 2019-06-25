import PlayButton from "./PlayButton";
import * as PIXI from "pixi.js";
import TextInput from "pixi-text-input";
import TextFieldError from "../Utilities/TextFieldError";
import TextFieldBitmap from "../Utilities/TextFieldBitmap";
import MyTextInput from "../Utilities/TextInput";

export default class GameMenu extends PIXI.DisplayObject {
    private readonly PATH_BITMAP_FONT: string = `assets/bitmap-font/`;
    private readonly playButton: PlayButton;
    private readonly _containerMainMenu: PIXI.Container;
    private readonly _app: PIXI.Application;

    private _inputPlayer1: TextInput;
    private _inputPlayer2: TextInput;
    private _background: PIXI.Sprite;
    private _textPlayer1: PIXI.BitmapText;
    private _textPlayer2: PIXI.BitmapText;
    private _titleText: PIXI.BitmapText;
    private _errorEmptyInputText: PIXI.Text;
    private _errorEqualNamesText: PIXI.Text;
    private _errorBiggerLengthText: PIXI.Text;

    constructor(app: PIXI.Application) {
        super();
        this._app = app;
        const loader: PIXI.Loader = new PIXI.Loader();
        loader.add('desyrel', this.PATH_BITMAP_FONT + 'desyrel.xml').load(this.onAssetsLoaded.bind(this));
        this._containerMainMenu = new PIXI.Container();
        this.createBackground();
        this.playButton = new PlayButton(this);
    };

    private createBackground() {
        this._background = PIXI.Sprite.from('background');
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

    get containerMainMenu(): PIXI.Container {
        return this._containerMainMenu;
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
        this._containerMainMenu.removeChild(this._errorEmptyInputText);
        this._containerMainMenu.removeChild(this._errorEqualNamesText);
        this._containerMainMenu.removeChild(this._errorBiggerLengthText);
    }

    onAssetsLoaded() {
        this._app.stage.addChild(this._containerMainMenu);
        this._containerMainMenu.addChild(this.background);
        this._containerMainMenu.addChild(this.playButton);

        this._titleText = new TextFieldBitmap("Tic-Tac-Toe", 75, "center", this._app.screen.width / 3.5, this._app.screen.height / 12);
        this._containerMainMenu.addChild(this._titleText);
        this._textPlayer1 = new TextFieldBitmap("Player 1", 40, "center", this._app.screen.width / 10, this._app.screen.height / 1.6);
        this._containerMainMenu.addChild(this._textPlayer1);
        this._textPlayer2 = new TextFieldBitmap("Player 2", 40, "center", this._app.screen.width / 1.4, this._app.screen.height / 1.6);
        this._containerMainMenu.addChild(this._textPlayer2);

        this._inputPlayer1 = new MyTextInput(this._textPlayer1);
        this._containerMainMenu.addChild(this._inputPlayer1);
        this._inputPlayer2 = new MyTextInput(this._textPlayer2);
        this._containerMainMenu.addChild(this._inputPlayer2);

        this._errorEmptyInputText = new TextFieldError("Please, write names!", 30, this._app.screen.width / 3.25, this._app.screen.height / 25);
        this._errorEqualNamesText = new TextFieldError("Names should be different!", 30, this._app.screen.width / 3.75, this._app.screen.height / 25);
        this._errorBiggerLengthText = new TextFieldError("Name's length should be less than 10!", 30, this._app.screen.width / 6, this._app.screen.height / 25);
    }
}