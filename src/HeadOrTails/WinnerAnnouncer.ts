import * as PIXI from "pixi.js";
import {TweenMax} from "gsap";
import GamePlay from "../Game/GamePlay";

export default class WinnerAnnouncer {

    private readonly coin: PIXI.Sprite;
    private winner: PIXI.Sprite;
    private winnerName: PIXI.BitmapText;
    private looserName: string;
    private bitmapNamePlayer1: PIXI.BitmapText;
    private bitmapNamePlayer2: PIXI.BitmapText;
    private firstPlayer: PIXI.BitmapText;
    private app: PIXI.Application;
    private container: PIXI.Container;

    constructor(app: PIXI.Application, container: PIXI.Container, coin: PIXI.Sprite, firstPlayer: PIXI.BitmapText, bitmapNamePlayer1: PIXI.BitmapText, bitmapNamePlayer2: PIXI.BitmapText) {
        this.app = app;
        this.container = container;
        this.bitmapNamePlayer1 = bitmapNamePlayer1;
        this.bitmapNamePlayer2 = bitmapNamePlayer2;
        this.firstPlayer = firstPlayer;
        this.coin = coin;
        this.winner = new PIXI.Sprite();
    }

    public setWinnerName(name: string) {
        this.winnerName.text = name;
    }

    public setWinner(sprite: PIXI.Sprite, name: PIXI.BitmapText) {
        this.winner = sprite;
        this.winnerName = name;
        this.looserName = (this.winnerName.text === this.bitmapNamePlayer1.text) ? this.bitmapNamePlayer2.text : this.bitmapNamePlayer1.text;
    }

    public setWinnerTexture(texture: PIXI.Texture) {
        this.winner.texture = texture;
    }


    public announceWinner() {
        this.firstPlayer.text = "FIRST MOVE:\n  " + this.winnerName.text;
        this.rotateTheWinner();
        this.moveName();
        TweenMax.delayedCall(1, this.hideCoin, null, this);
        TweenMax.delayedCall(2.5, this.showFirstPlayer, null, this);
        TweenMax.delayedCall(5, this.startGame, null, this);
    }

    private showFirstPlayer() {
        this.firstPlayer.width = 300
        this.firstPlayer.height = 150;

    }

    private startGame() {
        this.app.stage.removeChild(this.container);
        new GamePlay(this.winnerName.text, this.looserName);
    }

    private moveName() {
        TweenMax.to(this.winnerName, 2, {
            y: 0,
        });
    }

    private hideCoin(): void {
        TweenMax.to(this.coin, 0.5, {
            height: 0,
            width: 0,
            rotation: -170
        })
    }

    private rotateTheWinner() {
        TweenMax.to(this.winner, 2, {
            height: 200,
            width: 200,
            rotation: 170
        });
    }
}