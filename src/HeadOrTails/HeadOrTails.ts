import * as PIXI from "pixi.js";
import Main from "../Main";
import {TweenMax} from "gsap";
import Sprite from "../Utilities/Sprite";
import BitmapTextField from "../Utilities/BitmapTextField";

export default class HeadOrTail {
    public readonly TAIL_PATH: string = 'assets/images/tail.png';
    public readonly HEAD_PATH: string = 'assets/images/head.png';
    public readonly MAX_SIZE_COIN: number = 225;
    public readonly MIN_SIZE_COIN: number = 0;
    public readonly CHANGING_SIZE: number = 75;
    private readonly _headTexture: PIXI.Texture;
    private _headSprite: PIXI.Sprite;
    private readonly _tailTexture: PIXI.Texture;
    private _tailSprite: PIXI.Sprite;

    private _multiplier: number = Math.floor(Math.random() * 10) + 20;
    private _currentSize: number;
    private _isGrowingUp: boolean;
    private _isHead: boolean;

    private _app: PIXI.Application;
    private readonly _namePlayer1: string;
    private readonly _namePlayer2: string;
    private _coinSprite: PIXI.Sprite;
    private _bitmapNamePlayer1: PIXI.BitmapText;
    private _bitmapNamePlayer2: PIXI.BitmapText;
    private _firstPlayer: PIXI.BitmapText;
    private winnerSprite: PIXI.Sprite;
    private winnerName: PIXI.BitmapText;

    constructor(app: PIXI.Application, namePlayer1: string, namePlayer2: string) {
        this._tailTexture = PIXI.Texture.from(this.TAIL_PATH);
        this._headTexture = PIXI.Texture.from(this.HEAD_PATH);
        this._app = app;
        this._namePlayer1 = namePlayer1;
        this._namePlayer2 = namePlayer2;
        this._currentSize = this.MAX_SIZE_COIN;
        this._isGrowingUp = false;
        this._isHead = true;
        this.init();
    }

    private decrease() {
        this._isGrowingUp = false;
    }

    private increase() {
        this.flipCoin();
        this._isGrowingUp = true;
    }

    private flipCoin() {
        if (this._isHead) {
            this._coinSprite.texture = this._tailTexture;
        } else {
            this._coinSprite.texture = this._headTexture;
        }
        this._isHead = !this._isHead;
    }

    private changeSize() {
        if (this._isGrowingUp) {
            this._currentSize += this.CHANGING_SIZE;
        } else {
            this._currentSize -= this.CHANGING_SIZE;
        }
        this._coinSprite.width = this._currentSize;
    }

    private init() {
        this._bitmapNamePlayer1 = new BitmapTextField(this._namePlayer1, 50, "center", this._app.screen.width / 5.5, this._app.screen.height / 10);
        this._app.stage.addChild(this._bitmapNamePlayer1);

        this._bitmapNamePlayer2 = new BitmapTextField(this._namePlayer2, 50, "center", this._app.screen.width / 1.5, this._app.screen.height / 10);
        this._app.stage.addChild(this._bitmapNamePlayer2);

        this._coinSprite = new Sprite(this._headTexture, true, true, this._app.screen.width / 2, this._app.screen.height / 1.5, this.MAX_SIZE_COIN, this.MAX_SIZE_COIN);
        this._coinSprite.on(`pointertap`, () => {
            this._multiplier = 1;
        });
        this._app.stage.addChild(this._coinSprite);

        this._headSprite = new Sprite(this._headTexture, false, false, this._app.screen.width / 4, this._app.screen.height / 3.5, 100, 100);
        this._app.stage.addChild(this._headSprite);

        this._tailSprite = new Sprite(this._tailTexture, false, false, this._app.screen.width / 1.35, this._app.screen.height / 3.25, 100, 100);
        this._app.stage.addChild(this._tailSprite);
        this.spinCoinTicker();
    }

    private spinCoinTicker() {
        const spinCoinTicker: PIXI.Ticker = PIXI.Ticker.shared;
        return spinCoinTicker.add(() => {
            if (this._currentSize === this.MIN_SIZE_COIN) {
                this.increase();
            } else if (this._currentSize === this.MAX_SIZE_COIN) {
                if (--this._multiplier <= 0 && this._currentSize === this.MAX_SIZE_COIN) {
                    spinCoinTicker.stop();
                    this.winnerAnimations(this._coinSprite.texture);
                    return this._coinSprite.texture;
                } else {
                    this.decrease();
                }
            }
            this.changeSize();
        });
    }

    private winnerAnimations(winnerTexture: PIXI.Texture) {
        if (winnerTexture === this._headTexture) {
            this.winnerSprite = this._headSprite;
            this.winnerName = this._bitmapNamePlayer1;
        } else if (winnerTexture === this._tailTexture) {
            this.winnerSprite = this._tailSprite;
            this.winnerName = this._bitmapNamePlayer2;
        } else {
            throw new Error('ERROR: Winner texture is neither head nor tail?!');
        }
        this._firstPlayer = new BitmapTextField("FIRST MOVE:\n  " + this.winnerName.text, 50, "center", this._app.screen.width / 3.5, this._app.screen.height / 2);
        this._firstPlayer.width = 0;
        this._firstPlayer.height = 0;
        this._app.stage.addChild(this._firstPlayer);

        this.rotateTheWinner();
        this.moveName();
        TweenMax.delayedCall(1, this.hideCoin, null, this);
        TweenMax.delayedCall(2.5, this.showFirstPlayer, null, this);
    }


    private showFirstPlayer() {
        this._firstPlayer.width = 300
        this._firstPlayer.height = 150;
    }

    private moveName() {
        TweenMax.to(this.winnerName, 2, {
            y: 0,
        });
    }

    private hideCoin(): void {
        TweenMax.to(this._coinSprite, 0.5, {
            height: 0,
            width: 0,
            rotation: -170
        })
    }

    private rotateTheWinner() {
        TweenMax.to(this.winnerSprite, 2, {
            height: 200,
            width: 200,
            rotation: 170
        });
    }
}