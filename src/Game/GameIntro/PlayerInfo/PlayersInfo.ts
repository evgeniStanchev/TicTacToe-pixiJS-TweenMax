import * as PIXI from "pixi.js";
import Sign from "../Signs/Sign";
import { TimelineMax, TweenMax } from "gsap";
import X from "../Signs/X";
import O from "../Signs/O";
import Player from "../../Player/Player";
import { ALIGN } from "../../Player/ALIGN";

export default class PlayersInfo extends PIXI.Container {
 
    private _player1: Player;
    private _player2: Player;
    private _xSign: Sign;
    private _oSign: Sign;
    private _timeline: TimelineMax; 

    constructor(timeline: TimelineMax) {
        super();
        this._timeline = timeline;
        
        this._xSign = new X(30, this._timeline);
        this._player1 = new Player(this._xSign, ALIGN.LEFT);
        this._player1.x = - 500;
        this._player1.name = "OOOOOOOOOO";
        this.addChild(this._player1);
        
        this._oSign = new O(30,  this._timeline);
        this._player2 = new Player(this._oSign, ALIGN.RIGHT);
        this._player2.x = 1500;
        this._player2.name = "OOOOOOOOOO";
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
        this._player1.drawSign();
        this._player2.drawSign();
    }

    public insertNames() {
        this._timeline
            .add(TweenMax.to(this._player1, 1, { x: 80 }))
            .add(TweenMax.to(this._player2, 1, { x: 420 }));
    }
}
