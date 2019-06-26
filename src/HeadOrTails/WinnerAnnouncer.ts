import * as PIXI from "pixi.js";
import {TweenMax} from "gsap";
import Gameplay from "../Game/Gameplay/Gameplay";

export default class WinnerAnnouncer {
    private readonly _app: PIXI.Application;
    private readonly _container: PIXI.Container;
    private readonly _coin: PIXI.Sprite;
    private _winner: PIXI.Sprite;
    private _winnerName: PIXI.BitmapText;
    private _looserName: string;
    private _bitmapNamePlayer1: PIXI.BitmapText;
    private _bitmapNamePlayer2: PIXI.BitmapText;
    private _firstPlayer: PIXI.BitmapText;


    constructor(app: PIXI.Application, container: PIXI.Container, coin: PIXI.Sprite, firstPlayer: PIXI.BitmapText, bitmapNamePlayer1: PIXI.BitmapText, bitmapNamePlayer2: PIXI.BitmapText) {
        this._app = app;
        this._container = container;
        this._bitmapNamePlayer1 = bitmapNamePlayer1;
        this._bitmapNamePlayer2 = bitmapNamePlayer2;
        this._firstPlayer = firstPlayer;
        this._coin = coin;
        this._winner = new PIXI.Sprite();
    }

    public setWinnerName(name: string) {
        this._winnerName.text = name;
    }

    public setWinner(sprite: PIXI.Sprite, name: PIXI.BitmapText) {
        this._winner = sprite;
        this._winnerName = name;
        this._looserName = (this._winnerName.text === this._bitmapNamePlayer1.text) ? this._bitmapNamePlayer2.text : this._bitmapNamePlayer1.text;
    }

    public setWinnerTexture(texture: PIXI.Texture) {
        this._winner.texture = texture;
    }


    public announceWinner() {
        this._firstPlayer.text = "FIRST MOVE:\n  " + this._winnerName.text;
        this.rotateTheWinner();
        this.moveName();
        TweenMax.delayedCall(1, this.hideCoin, null, this);
        TweenMax.delayedCall(2.5, this.showFirstPlayer, null, this);
        TweenMax.delayedCall(5, this.startGame, null, this);
    }

    private showFirstPlayer() {
        this._firstPlayer.width = 300
        this._firstPlayer.height = 150;
    }

    private startGame() {
        this._app.stage.removeChild(this._container);
        new Gameplay(this._app, this._winnerName.text, this._looserName);
    }

    private moveName() {
        TweenMax.to(this._winnerName, 2, {
            y: 0,
        });
    }

    private hideCoin(): void {
        TweenMax.to(this._coin, 0.5, {
            height: 0,
            width: 0,
            rotation: -170
        })
    }

    private rotateTheWinner() {
        TweenMax.to(this._winner, 2, {
            height: 200,
            width: 200,
            rotation: 170
        });
    }
}