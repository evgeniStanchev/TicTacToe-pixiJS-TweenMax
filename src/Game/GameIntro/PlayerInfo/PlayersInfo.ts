import * as PIXI from "pixi.js";
import Sign from "../Signs/Sign";
import { TimelineMax, TweenMax } from "gsap";
import X from "../Signs/X";
import O from "../Signs/O";
import Player from "../../Player/Player";
import { ALIGN } from "../../Player/ALIGN";
import Square from "../Board/Square/Square";

export default class PlayersInfo extends PIXI.Container {
    private readonly _signSize: number = 30;
    private _player1: Player;
    private _player2: Player;
    private _xSign: Sign;
    private _oSign: Sign;
    private _timeline: TimelineMax; 

    constructor(timeline: TimelineMax) {
        super();
        this._timeline = timeline;

        const squarePlayer1 = new Square();
        this._xSign = new X( this._timeline, squarePlayer1);
        this._player1 = new Player(this._xSign, ALIGN.LEFT, squarePlayer1);
        this._player1.x = - 500;
        this._player1.name = "Player1";
        this.addChild(this._player1);
        
        const squarePlayer2 = new Square();
        this._oSign = new O(this._timeline, squarePlayer2);
        this._player2 = new Player(this._oSign, ALIGN.RIGHT, squarePlayer2);
        this._player2.x = 1500;
        this._player2.name = "Player2";
        this.addChild(this._player2);
    }

    set namePlayer1(name: string) {
        this._player1.name = name;
    }

    set namePlayer2(name: string) {
        this._player2.name = name;
    }

    get player1(){
        return this._player1;
    }

    get player2(){
        return this._player2;
    }

    public insertSigns() {
        // this._player1.drawSign();
        // this._player2.drawSign();
    }

    public insertNames() {
        this._timeline
            .add(TweenMax.to(this._player1, 1, { x: 80 }))
            .add(TweenMax.to(this._player2, 1, { x: 420 }));
    }
}
