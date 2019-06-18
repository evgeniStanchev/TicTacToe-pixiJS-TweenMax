import * as PIXI from "pixi.js";
import WinnerAnnouncer from "./WinnerAnnouncer";

export default class Spinner {

    public readonly MAX_SIZE_COIN: number = 225;
    public readonly MIN_SIZE_COIN: number = 0;
    public readonly CHANGING_SIZE: number = 75;

    private readonly tail: PIXI.Sprite;
    private readonly head: PIXI.Sprite;
    private readonly winnerAnnouncer: WinnerAnnouncer;
    private readonly bitmapNamePlayer1: PIXI.BitmapText;
    private readonly bitmapNamePlayer2: PIXI.BitmapText;
    private readonly coin: PIXI.Sprite;

    private multiplier: number = Math.floor(Math.random() * 10) + 20;
    private spinCoinTicker: PIXI.Ticker;
    private currentSize: number;
    private isGrowingUp: boolean;
    private isHead: boolean;

    constructor(app: PIXI.Application, containerHOT: PIXI.Container, coin: PIXI.Sprite, head: PIXI.Sprite, tail: PIXI.Sprite, firstPlayer: PIXI.BitmapText,
                namePlayer1: string, namePlayer2: string, bitmapNamePlayer1: PIXI.BitmapText, bitmapNamePlayer2: PIXI.BitmapText) {
        this.coin = coin;
        this.coin.on(`pointertap`, () => {
            this.multiplier = 1;
        });
        this.spinCoinTicker = PIXI.Ticker.shared;
        this.currentSize = this.MAX_SIZE_COIN;
        this.isGrowingUp = false;
        this.isHead = true;
        this.tail = tail;
        this.head = head;
        this.bitmapNamePlayer1 = bitmapNamePlayer1;
        this.bitmapNamePlayer2 = bitmapNamePlayer2;
        this.winnerAnnouncer = new WinnerAnnouncer(app, containerHOT, this.coin, firstPlayer, this.bitmapNamePlayer1, this.bitmapNamePlayer2);
    }

    public spin() {
        this.spinCoinTicker.add(() => {
            if (this.currentSize === this.MIN_SIZE_COIN) {
                this.increase();
            } else if (this.currentSize === this.MAX_SIZE_COIN) {
                if ((--this.multiplier <= 0) && (this.currentSize === this.MAX_SIZE_COIN)) {
                    this.spinCoinTicker.stop();
                    this.assignWinner();
                    this.winnerAnnouncer.announceWinner();
                    return;
                } else {
                    this.decrease();
                }
            }
            this.changeSize();
        });
    }

    private assignWinner() {
        const winnerTexture: PIXI.Texture = this.coin.texture;
        const headTexture: PIXI.Texture = this.head.texture;
        const winnerName = (winnerTexture === headTexture) ? this.bitmapNamePlayer1.text : this.bitmapNamePlayer2.text;
        this.winnerAnnouncer.setWinnerTexture(winnerTexture);

        if (winnerTexture === headTexture) {
            this.winnerAnnouncer.setWinner(this.head, this.bitmapNamePlayer1);
        } else if (winnerTexture === this.tail.texture) {
            this.winnerAnnouncer.setWinner(this.tail, this.bitmapNamePlayer2);
        } else {
            throw new Error('ERROR: Winner texture is neither head nor tail?!');
        }


        this.winnerAnnouncer.setWinnerName(winnerName);
    }

    private decrease() {
        this.isGrowingUp = false;
    }

    private increase() {
        this.flipCoin();
        this.isGrowingUp = true;
    }

    private changeSize() {
        if (this.isGrowingUp) {
            this.currentSize += this.CHANGING_SIZE;
        } else {
            this.currentSize -= this.CHANGING_SIZE;
        }
        this.coin.width = this.currentSize;
    }

    private flipCoin() {
        if (this.isHead) {
            this.coin.texture = this.tail.texture;
        } else {
            this.coin.texture = this.head.texture;
        }
        this.isHead = !this.isHead;
    }
}