import * as PIXI from "pixi.js";
import PlayerInfo from "./PlayerInfo";
import Sign from "../Signs/Sign";
import { TimelineMax, TweenMax } from "gsap";
import X from "../Signs/X";
import O from "../Signs/O";

export default class PlayersInfo extends PIXI.Container {
 
    private _playerInfo1: PlayerInfo;
    // private _playerInfo2: PlayerInfo;
    private _xSign: Sign;
    private _oSign: Sign;
    private _timeline: TimelineMax; 
    // private _feather: FeatherController;

    constructor(timeline: TimelineMax) {
        super();
        this._timeline = timeline;
        this._xSign = new X(30, this._timeline);
        this._oSign = new O(30,  this._timeline);
        this._playerInfo1 = new PlayerInfo(this._xSign);
        // this._playerInfo2 = new PlayerInfo(this._oSign,featherView);
        this._playerInfo1.x = - 500;
        // this._playerInfo2.x = 1500;
        this.addChild(this._playerInfo1);
        // this.addChild(this._playerInfo2);
        
        this._playerInfo1.name = "Evgeni";
        // this._playerInfo2.name = "Diana";
       
    }

    set namePlayer1(name: string) {
        this._playerInfo1.name = name;
    }

    set namePlayer2(name: string) {
        // this._playerInfo2.name = name;
    }

    public insertSigns() {
        this._playerInfo1.drawSign();
        // this._playerInfo2.drawSign();
    }

    public insertNames() {
        this._timeline
            .add(TweenMax.to(this._playerInfo1, 1, { x: 80 }))
            // .add(TweenMax.to(this._playerInfo2, 1, { x: 500 }));
    }
}
