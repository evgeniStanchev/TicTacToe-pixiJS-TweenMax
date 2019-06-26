import * as PIXI from "pixi.js";
import TextFieldBitmap from "../Utilities/TextFieldBitmap";
import Spinner from "./Spinner";

export default class HeadOrTail {
    public readonly MAX_SIZE_COIN: number = 225;

    private readonly _app: PIXI.Application;
    private readonly _containerHOT: PIXI.Container;
    private readonly _namePlayer1: string;
    private readonly _namePlayer2: string;

    private _head: PIXI.Sprite;
    private _tail: PIXI.Sprite;
    private _spinner: Spinner;
    private _coin: PIXI.Sprite;
    private _bitmapNamePlayer1: PIXI.BitmapText;
    private _bitmapNamePlayer2: PIXI.BitmapText;
    private _firstPlayer: PIXI.BitmapText;

    constructor(app: PIXI.Application, namePlayer1: string, namePlayer2: string) {
        this._containerHOT = new PIXI.Container();
        this._app = app;
        this._namePlayer1 = namePlayer1;
        this._namePlayer2 = namePlayer2;
        this.init();
    }

    public start() {
        this._spinner.spin();
    }

    private init() {
        const tailTexture = PIXI.Texture.from("tail");
        const headTexture = PIXI.Texture.from("head");

        this._app.stage.addChild(this._containerHOT);
        this._bitmapNamePlayer1 = new TextFieldBitmap(
            this._namePlayer1,
            50,
            "center",
            this._app.screen.width / 5.5,
            this._app.screen.height / 10
        );
        this._containerHOT.addChild(this._bitmapNamePlayer1);

        this._bitmapNamePlayer2 = new TextFieldBitmap(
            this._namePlayer2,
            50,
            "center",
            this._app.screen.width / 1.5,
            this._app.screen.height / 10
        );
        this._containerHOT.addChild(this._bitmapNamePlayer2);

        this._coin = new PIXI.Sprite();
        this._coin.texture = headTexture;
        this._coin.interactive = true;
        this._coin.buttonMode = true;
        this._coin.anchor.set(0.5);
        this._coin.x = this._app.screen.width / 2;
        this._coin.y = this._app.screen.height / 1.5;
        this._coin.width = this.MAX_SIZE_COIN;
        this._coin.height = this.MAX_SIZE_COIN;
        this._containerHOT.addChild(this._coin);

        this._head = new PIXI.Sprite();
        this._head.texture = headTexture;
        this._head.x = this._app.screen.width / 4;
        this._head.y = this._app.screen.height / 3.5;
        this._head.anchor.set(0.5);
        this._head.width = 100;
        this._head.height = 100;
        this._containerHOT.addChild(this._head);

        this._tail = new PIXI.Sprite();
        this._tail.texture = tailTexture;
        this._tail.x = this._app.screen.width / 1.35;
        this._tail.y = this._app.screen.height / 3.25;
        this._tail.anchor.set(0.5);
        this._tail.width = 100;
        this._tail.height = 100;
        this._containerHOT.addChild(this._tail);

        this._firstPlayer = new TextFieldBitmap(
            "",
            50,
            "center",
            this._app.screen.width / 3.5,
            this._app.screen.height / 2
        );
        this._firstPlayer.width = 0;
        this._firstPlayer.height = 0;
        this._containerHOT.addChild(this._firstPlayer);

        this._spinner = new Spinner(
            this._app,
            this._containerHOT,
            this._coin,
            this._head,
            this._tail,
            this._firstPlayer,
            this._namePlayer1,
            this._namePlayer2,
            this._bitmapNamePlayer1,
            this._bitmapNamePlayer2
        );
    }
}