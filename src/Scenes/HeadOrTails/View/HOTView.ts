import * as PIXI from "pixi.js";
import Main from "../../../Main";
import Spinner from "../CoinSpinner";
import { TimelineMax, TweenMax } from "gsap";

export default class HOTView extends PIXI.Container {
    public static readonly MAX_SIZE_COIN: number = 225;

    private _bitmapNamesSize: number;

    private _bitmapNamePlayer1: PIXI.BitmapText;
    private _bitmapNamePlayer1X: number;
    private _bitmapNamePlayer1Y: number;

    private _bitmapNamePlayer2: PIXI.BitmapText;
    private _bitmapNamePlayer2X: number;
    private _bitmapNamePlayer2Y: number;

    private _bitmapFirstPlayer: PIXI.BitmapText;
    private _bitmapFirstPlayerX: number;
    private _bitmapFirstPlayerY: number;

    private _tl: TimelineMax;

    private _looserName: PIXI.BitmapText;
    private _winnerName: PIXI.BitmapText;

    private _head: PIXI.Sprite;
    private _headX: number;
    private _headY: number;
    private _headWidth: number;
    private _headHeihgt: number;

    private _tail: PIXI.Sprite;
    private _tailX: number;
    private _tailY: number;
    private _tailWidth: number;
    private _tailHeight: number;

    private _winnerSprite: PIXI.Sprite;

    private _namePlayer1: string;
    private _namePlayer2: string;

    private _spinner: Spinner;

    constructor(namePlayer1: string, namePlayer2: string) {
        super();
        this._namePlayer1 = namePlayer1;
        this._namePlayer2 = namePlayer2;
        this.setInitialValues();
        this.createObjects();
        this._spinner.spin();
    }

    private setInitialValues() {
        this._tl = new TimelineMax();
        this._bitmapNamesSize = 50;

        this._bitmapNamePlayer1X = Main.GAME_WIDTH / 5.5;
        this._bitmapNamePlayer1Y = Main.GAME_HEIGHT / 10;

        this._bitmapNamePlayer2X = Main.GAME_WIDTH / 1.5;
        this._bitmapNamePlayer2Y = Main.GAME_HEIGHT / 10;

        this._bitmapFirstPlayerX = Main.GAME_WIDTH / 3.5;
        this._bitmapFirstPlayerY = Main.GAME_HEIGHT / 2;

        this._headX = Main.GAME_WIDTH / 4;
        this._headY = Main.GAME_HEIGHT / 3.5;
        this._headWidth = 100;
        this._headHeihgt = 100;

        this._tailX = Main.GAME_WIDTH / 1.35;
        this._tailY = Main.GAME_HEIGHT / 3.25;
        this._tailWidth = 100;
        this._tailHeight = 100;
    }

    private createObjects() {
        this._bitmapNamePlayer1 = new PIXI.BitmapText(this._namePlayer1, {
            font: {
                name: "Desyrel",
                size: this._bitmapNamesSize,
            },
            align: "center",
        });
        this._bitmapNamePlayer1.x = this._bitmapNamePlayer1X;
        this._bitmapNamePlayer1.y = this._bitmapNamePlayer1Y;
        this.addChild(this._bitmapNamePlayer1);

        this._bitmapNamePlayer2 = new PIXI.BitmapText(this._namePlayer2, {
            font: {
                name: "Desyrel",
                size: this._bitmapNamesSize,
            },
            align: "center",
        });

        this._bitmapNamePlayer2.x = this._bitmapNamePlayer2X;
        this._bitmapNamePlayer2.y = this._bitmapNamePlayer2Y;
        this.addChild(this._bitmapNamePlayer2);

        this._bitmapFirstPlayer = new PIXI.BitmapText("", {
            font: {
                name: "Desyrel",
                size: this._bitmapNamesSize,
            },
            align: "center",
        });

        this._bitmapFirstPlayer.x = this._bitmapFirstPlayerX;
        this._bitmapFirstPlayer.y = this._bitmapFirstPlayerY;
        this._bitmapFirstPlayer.width = 0;
        this._bitmapFirstPlayer.height = 0;
        this.addChild(this._bitmapFirstPlayer);

        this._head = new PIXI.Sprite();
        this._head.texture = PIXI.Texture.from("head");
        this._head.x = this._headX;
        this._head.y = this._headY;
        this._head.anchor.set(0.5);
        this._head.width = this._headWidth;
        this._head.height = this._headHeihgt;
        this.addChild(this._head);

        this._tail = new PIXI.Sprite();
        this._tail.texture = PIXI.Texture.from("tail");
        this._tail.x = this._tailX;
        this._tail.y = this._tailY;
        this._tail.anchor.set(0.5);
        this._tail.width = this._tailWidth;
        this._tail.height = this._tailHeight;
        this.addChild(this._tail);

        this._spinner = new Spinner();
        this.addChild(this._spinner);
        this._spinner.on("finished", () => {
            const isHead: boolean = this._spinner.coin.texture === this._head.texture;
            this._winnerSprite = isHead ? this._head : this._tail;
            this._winnerName = isHead ? this._bitmapNamePlayer1 : this._bitmapNamePlayer2;
            this._looserName = isHead ? this._bitmapNamePlayer2 : this._bitmapNamePlayer1;
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
                TweenMax.to(this._spinner.coin, 0.5, {
                    height: 0,
                    width: 0,
                    rotation: -170,
                })
            )
            .add(
                TweenMax.to(this._bitmapFirstPlayer, 1, {
                    width: 300,
                    height: 150,
                })
            )
            .call(() => {
                this.emit("winnerAnnounced", this._winnerName.text, this._looserName.text);
            });
    }
}
