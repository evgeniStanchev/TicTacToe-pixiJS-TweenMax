import * as PIXI from "pixi.js";
import Spinner from "./CoinSpinner";
import Scene from "../Game/GameController/Scene";
import { TweenMax, TimelineMax } from "gsap";

export default class HeadOrTail extends Scene {
    public static readonly MAX_SIZE_COIN: number = 225;

    private readonly _app: PIXI.Application;
    private readonly _tl: TimelineMax;

    private _head: PIXI.Sprite;
    private _tail: PIXI.Sprite;
    private _winnerSprite: PIXI.Sprite;
    private _coin: PIXI.Sprite;

    private _bitmapNamePlayer1: PIXI.BitmapText;
    private _bitmapNamePlayer2: PIXI.BitmapText;
    private _bitmapFirstPlayer: PIXI.BitmapText;

    private _looserName: PIXI.BitmapText;
    private _winnerName: PIXI.BitmapText;

    private _namePlayer1: string;
    private _namePlayer2: string;

    private _spinner: Spinner;

    constructor(app: PIXI.Application) {
        super();
        this._app = app;
        this._tl = new TimelineMax();
    }

    set namePlayer1(name: string) {
        this._namePlayer1 = name;
    }

    set namePlayer2(name: string) {
        this._namePlayer2 = name;
    }

    public onStart() {
        const loader: PIXI.Loader = new PIXI.Loader();
        loader.load(this.onAssetsLoaded.bind(this));
        this._spinner.spin();
    }

    onAssetsLoaded() {
        this._bitmapNamePlayer1 = new PIXI.BitmapText(this._namePlayer1, {
            font: {
                name: "Desyrel",
                size: 50,
            },
            align: "center",
        });
        this._bitmapNamePlayer1.x = this._app.screen.width / 5.5;
        this._bitmapNamePlayer1.y = this._app.screen.height / 10;
        this.addChild(this._bitmapNamePlayer1);

        this._bitmapNamePlayer2 = new PIXI.BitmapText(this._namePlayer2, {
            font: {
                name: "Desyrel",
                size: 50,
            },
            align: "center",
        });
        this._bitmapNamePlayer2.x = this._app.screen.width / 1.5;
        this._bitmapNamePlayer2.y = this._app.screen.height / 10;
        this.addChild(this._bitmapNamePlayer2);

        this._bitmapFirstPlayer = new PIXI.BitmapText("", {
            font: {
                name: "Desyrel",
                size: 50,
            },
            align: "center",
        });
        this._bitmapFirstPlayer.x = this._app.screen.width / 3.5;
        this._bitmapFirstPlayer.y = this._app.screen.height / 2;
        this._bitmapFirstPlayer.width = 0;
        this._bitmapFirstPlayer.height = 0;
        this.addChild(this._bitmapFirstPlayer);

        const tailTexture = PIXI.Texture.from("tail");
        const headTexture = PIXI.Texture.from("head");

        this._app.stage.addChild(this);

        this._coin = new PIXI.Sprite();
        this._coin.texture = headTexture;
        this._coin.interactive = true;
        this._coin.anchor.set(0.5);
        this._coin.x = this._app.screen.width / 2;
        this._coin.y = this._app.screen.height / 1.5;
        this._coin.width = HeadOrTail.MAX_SIZE_COIN;
        this._coin.height = HeadOrTail.MAX_SIZE_COIN;
        this.addChild(this._coin);

        this._head = new PIXI.Sprite();
        this._head.texture = headTexture;
        this._head.x = this._app.screen.width / 4;
        this._head.y = this._app.screen.height / 3.5;
        this._head.anchor.set(0.5);
        this._head.width = 100;
        this._head.height = 100;
        this.addChild(this._head);

        this._tail = new PIXI.Sprite();
        this._tail.texture = tailTexture;
        this._tail.x = this._app.screen.width / 1.35;
        this._tail.y = this._app.screen.height / 3.25;
        this._tail.anchor.set(0.5);
        this._tail.width = 100;
        this._tail.height = 100;
        this.addChild(this._tail);

        this._spinner = new Spinner(this._coin, this._head, this._tail, HeadOrTail.MAX_SIZE_COIN);
        this._spinner.on("finished", () => {
            const isHead: boolean = this._coin.texture === this._head.texture;
            this._winnerSprite = isHead ? this._head : this._tail;
            this._winnerName = isHead ? this._bitmapNamePlayer1 : this._bitmapNamePlayer2;
            this._looserName = isHead ? this._bitmapNamePlayer2 : this._bitmapNamePlayer2;
            this._bitmapFirstPlayer.text = "FIRST MOVE:\n  " + this._winnerName.text;
            this.announceWinner();
        });
    }

    private announceWinner(): void {
        this._tl
            .add(
                TweenMax.to(this._winnerSprite, 2, {
                    height: 200,
                    width: 200,
                    rotation: 170,
                })
            )
            .add(
                TweenMax.to(this._winnerName, 2, {
                    y: 0,
                }),
                "-=2"
            )
            .add(
                TweenMax.to(this._coin, 0.5, {
                    height: 0,
                    width: 0,
                    rotation: -170,
                    delay: 0,
                })
            )
            .add(
                TweenMax.to(this._bitmapFirstPlayer, 1, {
                    width: 300,
                    height: 150,
                })
            )
            .call(this.onExit.bind(this));
    }

    onExit(): void {
        this._app.stage.removeChild(this);
        this.emit("exit", this._winnerName.text, this._looserName.text);
    }
}
