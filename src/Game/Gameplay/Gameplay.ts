import Scene from "../GameController/Scene";
import Player from "../Player/Player";
import Canvas from "../GameIntro/Board/Canvas/Canvas";
import Square from "../GameIntro/Board/Square/Square";
import Sign from "../GameIntro/Signs/Sign";
import X from "../GameIntro/Signs/X";
import { TimelineMax } from "gsap";
import Board from "../GameIntro/Board/Board";
import { LineStyle } from "pixi.js";
import O from "../GameIntro/Signs/O";

export default class Gameplay extends Scene {
    
    private readonly _app: PIXI.Application;
    private readonly _field: Array<Square>;

    private _currentSign: Sign;
    private _timeline: TimelineMax;

    private _player1: Player;
    private _player2: Player;
    private _canvas: Canvas;

    constructor(app: PIXI.Application) {
        super();
        this._app = app;
        this._field = new Array<Square>();
        this._timeline = new TimelineMax();
    }

    set canvas(canvas: Canvas) {
        this._canvas = canvas;
    }

    set player1(player1: Player) {
        this._player1 = player1;
    }

    set player2(player2: Player) {
        this._player2 = player2;
    }

    start(): void {
        this._currentSign = this._player1.sign;
        this.fillArray();
        const defaultIcon = "url('../../../assets/images/feather.png'),auto";
        this._app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
    }

    onExit(): void {
        throw new Error("Method not implemented.");
    }

    private fillArray() {
        const width = this._canvas.width / 3;
        const height = this._canvas.height / 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 2; j >= 0; j--) {
                //TODO Why it is /2
                const x = (width * j) / 2 - j;
                const y = (height * i) / 2 - i;
                const square = new Square();
                square.x = x;
                square.y = y;
                square.beginFill(0xffffff);
                square.drawRect(x, y, width - Board.LINE_WIDTH, height - Board.LINE_WIDTH);
                square.endFill();
                square.interactive = true;
                square.buttonMode = true;
                square.on("click", this.onClick, this);
                this._canvas.addChild(square);
                this._field.push(square);
            }
        }
    }

    private onClick(event: PIXI.interaction.InteractionEvent) {
        const sq = event.currentTarget as Square;
        sq.drawSign("x",this._timeline);
    }
}
