import * as PIXI from "pixi.js";
import SignSlot from "../../GameIntro/Board/SignSlot/SignSlot";
import { TimelineMax, TweenMax } from "gsap";
import Player from "../../../Player/Player";
import Board from "../../GameIntro/Board/Board";
import FieldUtils from "../FieldUtils";

export default class GameplayView extends PIXI.Container {
    public static readonly CHANGING_SIZE: number = 25;
    private readonly _field: SignSlot[][];
    private readonly _utils: FieldUtils;
    private _winningSlot: SignSlot[];
    private _loosingSlot: SignSlot[];
    private _currentSign: string;

    private _timeline: TimelineMax;
    private _player1: Player;
    private _player2: Player;
    private _board: Board;

    constructor() {
        super();
        this._field = [];
        this._timeline = new TimelineMax();
        this._utils = new FieldUtils(this._field);
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
        this._timeline.add(() => {
            if (this._utils.isFieldFull()) {
                this.announceDraw();
            }
            if (!this._utils.hasWinner()) {
                if (this._currentSign === this._player1.sign) {
                    this.changePlayer(this._player2);
                } else {
                    this.changePlayer(this._player1);
                }
            } else {
                this.announceWinner(this._currentSign);
            }
        });
    }

    private announceDraw(): void {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                this._field[row][col].setLooserMask();
            }
        }
        const timeline = new TimelineMax();
        timeline.add(
            TweenMax.to(this, 0, {
                delay: 2,
            })
        );
        timeline.add(() => {
            this.emit("finished", null);
        });
    }

    private announceWinner(sign: string) {
        const timeline = new TimelineMax();
        this._winningSlot = this._utils.winningSlot;
        this._loosingSlot = this._utils.loosingSlot;

        for (let index = 0; index < this._loosingSlot.length; index++) {
            this._loosingSlot[index].setLooserMask();
        }
        for (let index = 0; index < this._winningSlot.length; index++) {
            this.setWinnerMask(this._winningSlot[index], timeline);
        }
        timeline.add(
            TweenMax.to(this, 0, {
                delay: 2,
            })
        );

        timeline.add(() => {
            if (sign === this._player1.sign) {
                this.emit("finished", this._player1.name);
            } else {
                this.emit("finished", this._player2.name);
            }
        });
    }

    private setWinnerMask(slot: SignSlot, timeline: TimelineMax): void {
        this._mask = new PIXI.Graphics();
        this._mask.beginFill(0x000000);
        this._mask.drawRect(0, 0, this.width, this.height);
        this._mask.endFill();
        timeline.add(
            TweenMax.to(slot, 0, {
                mask: this._mask,
                delay: 1,
            })
        );
        timeline.add(
            TweenMax.to(slot, 0, {
                mask: false,
                delay: 0.5,
            })
        );
    }

    private changePlayer(player: Player) {
        this._currentSign = player.sign;
        this.emit("changePlayer", player);
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
