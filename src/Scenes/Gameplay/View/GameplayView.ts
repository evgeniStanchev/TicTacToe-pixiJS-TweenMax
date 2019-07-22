import * as PIXI from "pixi.js";
import SignSlot from "../../GameIntro/Board/SignSlot/SignSlot";
import { TimelineMax } from "gsap";
import Player from "../../../Player/Player";
import Board from "../../GameIntro/Board/Board";
import Sign from "../../GameIntro/Signs/Sign";

export default class GameplayView extends PIXI.Container {
    public static readonly CHANGING_SIZE: number = 25;
    private readonly _field: SignSlot[][];
    private _currentSign: string;
    private readonly _filledSlots: Map<number, string>;

    private _timeline: TimelineMax;
    private _player1: Player;
    private _player2: Player;
    private _board: Board;

    constructor() {
        super();
        this._field = [];
        this._filledSlots = new Map<number, string>();
        this._timeline = new TimelineMax();
    }

    public set player1(player: Player) {
        this._player1 = player;
    }

    public set player2(player: Player) {
        this._player2 = player;
    }

    public set board(board: Board) {
        this._board = board;
    }

    public set currentSign(sign: string) {
        this._currentSign = sign;
    }

    public fillArray() {
        const line = Board.LINE_WIDTH;
        const width = this._board.width / 3 - line;
        const height = this._board.height / 3 - line;
        for (let row = 0; row < 3; row++) {
            this._field[row] = [];
            for (let col = 2; col >= 0; col--) {
                const x = width * col + (line * col) / 2;
                const y = height * row + (line * row) / 2;
                const signSlot = new SignSlot(height, width, 0xffffff);
                signSlot.x = x;
                signSlot.y = y;
                signSlot.interactive = true;
                signSlot.buttonMode = true;
                signSlot.on("click", this.onClick, this);
                this._board.addChild(signSlot);
                this._field[row][col] = signSlot;
            }
        }
    }

    private onClick(event: PIXI.interaction.InteractionEvent) {
        this.deactivateSlots();
        const slot = event.currentTarget as SignSlot;
        slot.on("drawingCompleted", this.activateSlots, this);
        slot.drawSign(this._currentSign, this._timeline);

        // this._filledSlots.set(this._field.indexOf(slot), this._currentSign);
        if (!this.hasWinner()) {
            if (this._currentSign === this._player1.sign) {
                this.changePlayer(this._player2);
            } else {
                this.changePlayer(this._player1);
            }
        } else {
            this.announceWinner(this._currentSign);
        }
    }

    private hasWinner(): boolean {
        if (this._filledSlots.size <= 5) {
            return false;
        } else {
            return this.hasLine() || this.hasDiagonal();
        }
    }

    private hasDiagonal(): boolean {
        return false;
    }

    private hasLine(): boolean {
        for (let row = 0; row < 3; row++) {
            this._field[row] = [];
            if (
                this._field[row][0].sign === this._field[row][1].sign &&
                this._field[row][0].sign === this._field[row][2].sign
            ) {
                console.log("hey");
                console.log("winner");
                return true;
            }
        }
    }

    private announceWinner(sign: string) {
        if (sign === this.player1.sign) {
            console.log("Player one is winner");
        } else if (sign === this.player2.sign) {
            console.log("Player two is winner");
        } else {
            console.log("Draw!");
        }
    }

    private changePlayer(player: Player) {
        this._currentSign = player.sign;
        this._timeline.add(() => {
            this.emit("changePlayer", player);
        });
    }

    private activateSlots() {
        this._field.forEach(row => {
            row.forEach(slot => {
                if (slot.isEmpty) {
                    slot.interactive = true;
                }
            });
        });
    }

    private deactivateSlots() {
        this._field.forEach(row => {
            row.forEach(slot => {
                slot.interactive = false;
            });
        });
    }
}
