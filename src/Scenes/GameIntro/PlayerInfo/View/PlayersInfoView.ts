import * as PIXI from "pixi.js";
import Player from "../../../../Player/Player";
import { TimelineMax, TweenMax } from "gsap";
import { ALIGN } from "../../../../Player/ALIGN";

export default class PlayersInfoView extends PIXI.Container {
    private readonly _xSign: string = "x";
    private readonly _oSign: string = "o";
    private _player1: Player;
    private _player2: Player;
    private _timeline: TimelineMax;

    private DURATION: number = 0.1;

    constructor(timeline: TimelineMax, namePlayer1: string, namePlayer2: string) {
        super();
        this._timeline = timeline;

        this._player1 = new Player(this._xSign, ALIGN.LEFT);
        this._player1.x = -500;
        this._player1.name = namePlayer1;
        this.addChild(this._player1);

        this._player2 = new Player(this._oSign, ALIGN.RIGHT);
        this._player2.x = 1500;
        this._player2.name = namePlayer2;
        this.addChild(this._player2);
    }

    get player1(): Player {
        return this._player1;
    }

    get player2(): Player {
        return this._player2;
    }

    public insertSigns() {
        this._player1.drawSign(this._timeline);
        this._player2.drawSign(this._timeline);
    }

    public insertPlayers() {
        this._timeline
            .add(TweenMax.to(this._player1, this.DURATION, { x: 80 }))
            .add(TweenMax.to(this._player2, this.DURATION, { x: 420 }));
    }
}
