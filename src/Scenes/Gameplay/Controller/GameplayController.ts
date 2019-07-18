import Player from "../../../Player/Player";
import SignSlot from "../../GameIntro/Board/SignSlot/SignSlot";
import { TimelineMax } from "gsap";
import * as PIXI from "pixi.js";
import Board from "../../GameIntro/Board/Board";
import GameplayView from "../View/GameplayView";

export default class GameplayController {
    private readonly _field: Array<SignSlot>;
    private _currentSign: string;
    private _view: GameplayView;

    private _timeline: TimelineMax;
    private _player1: Player;
    private _player2: Player;
    private _board: Board;

    constructor() {
        this._view = new GameplayView();
        this._field = new Array<SignSlot>();
        this._timeline = new TimelineMax();
    }

    set board(board: Board) {
        this._board = board;
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
    }

    onExit(): void {
        throw new Error("Method not implemented.");
    }

    private fillArray() {
        const line = Board.LINE_WIDTH;
        const width = this._board.width / 3 - line;
        const height = this._board.height / 3 - line;
        for (let row = 0; row < 3; row++) {
            for (let col = 2; col >= 0; col--) {
                const x = width * col + line * col / 2;
                const y = height * row + line * row / 2;
                const signSlot = new SignSlot(height, width, 0xffffff);
                signSlot.x = x;
                signSlot.y = y;
                signSlot.interactive = true;
                signSlot.buttonMode = true;
                signSlot.on("click", this.onClick, this);
                this._board.addChild(signSlot);
                this._field.push(signSlot);
            }
        }
    }

    private onClick(event: PIXI.interaction.InteractionEvent) {
        const sq = event.currentTarget as SignSlot;
        sq.drawSign("x", this._timeline);
    }
}
