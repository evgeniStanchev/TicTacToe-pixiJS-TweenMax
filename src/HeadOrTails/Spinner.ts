import * as PIXI from "pixi.js";
import WinnerAnnouncer from "./WinnerAnnouncer";

export default class Spinner {

    public readonly MAX_SIZE_COIN: number = 225;
    public readonly MIN_SIZE_COIN: number = 0;
    public readonly CHANGING_SIZE: number = 75;

    private readonly _tail: PIXI.Sprite;
    private readonly _head: PIXI.Sprite;
    private readonly _winnerAnnouncer: WinnerAnnouncer;
    private readonly _bitmapNamePlayer1: PIXI.BitmapText;
    private readonly _bitmapNamePlayer2: PIXI.BitmapText;
    private readonly _coin: PIXI.Sprite;

    private _multiplier: number = Math.floor(Math.random() * 10) + 20;
    private _spinCoinTicker: PIXI.Ticker;
    private _currentSize: number;
    private _isGrowingUp: boolean;
    private _isHead: boolean;

    constructor(app: PIXI.Application, containerHOT: PIXI.Container, coin: PIXI.Sprite, head: PIXI.Sprite, tail: PIXI.Sprite, firstPlayer: PIXI.BitmapText,
                namePlayer1: string, namePlayer2: string, bitmapNamePlayer1: PIXI.BitmapText, bitmapNamePlayer2: PIXI.BitmapText) {
        this._coin = coin;
        this._coin.on(`pointertap`, () => {
            this._multiplier = 1;
        });
        this._spinCoinTicker = PIXI.Ticker.shared;
        this._currentSize = this.MAX_SIZE_COIN;
        this._isGrowingUp = false;
        this._isHead = true;
        this._tail = tail;
        this._head = head;
        this._bitmapNamePlayer1 = bitmapNamePlayer1;
        this._bitmapNamePlayer2 = bitmapNamePlayer2;
        this._winnerAnnouncer = new WinnerAnnouncer(app, containerHOT, this._coin, firstPlayer, this._bitmapNamePlayer1, this._bitmapNamePlayer2);
    }

    public spin() {
        this._spinCoinTicker.add(() => {
            if (this._currentSize === this.MIN_SIZE_COIN) {
                this.increase();
            } else if (this._currentSize === this.MAX_SIZE_COIN) {
                if ((--this._multiplier <= 0) && (this._currentSize === this.MAX_SIZE_COIN)) {
                    this._spinCoinTicker.stop();
                    this.assignWinner();
                    this._winnerAnnouncer.announceWinner();
                    return;
                } else {
                    this.decrease();
                }
            }
            this.changeSize();
        });
    }

    private assignWinner() {
        const winnerTexture: PIXI.Texture = this._coin.texture;
        const headTexture: PIXI.Texture = this._head.texture;
        const winnerName = (winnerTexture === headTexture) ? this._bitmapNamePlayer1.text : this._bitmapNamePlayer2.text;
        this._winnerAnnouncer.setWinnerTexture(winnerTexture);

        if (winnerTexture === headTexture) {
            this._winnerAnnouncer.setWinner(this._head, this._bitmapNamePlayer1);
        } else if (winnerTexture === this._tail.texture) {
            this._winnerAnnouncer.setWinner(this._tail, this._bitmapNamePlayer2);
        } else {
            throw new Error('ERROR: Winner texture is neither head nor tail?!');
        }


        this._winnerAnnouncer.setWinnerName(winnerName);
    }

    private decrease() {
        this._isGrowingUp = false;
    }

    private increase() {
        this.flipCoin();
        this._isGrowingUp = true;
    }

    private changeSize() {
        if (this._isGrowingUp) {
            this._currentSize += this.CHANGING_SIZE;
        } else {
            this._currentSize -= this.CHANGING_SIZE;
        }
        this._coin.width = this._currentSize;
    }

    private flipCoin() {
        if (this._isHead) {
            this._coin.texture = this._tail.texture;
        } else {
            this._coin.texture = this._head.texture;
        }
        this._isHead = !this._isHead;
    }
}