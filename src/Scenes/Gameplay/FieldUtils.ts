import SignSlot from "../GameIntro/Board/SignSlot/SignSlot";

export default class FieldUtils {
    private _field: SignSlot[][];
    private _winningSlot: SignSlot[];
    private _loosingSlot: SignSlot[];

    constructor(field: SignSlot[][]) {
        this._field = field;
    }

    public get loosingSlot(): SignSlot[] {
        return this._loosingSlot;
    }

    public get winningSlot(): SignSlot[] {
        return this._winningSlot;
    }

    public hasWinner(): boolean {
        return this.hasDiagonal() || this.hasRow() || this.hasColumn();
    }

    public isFieldFull(): boolean {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this._field[row][col].isEmpty) {
                    return false;
                }
            }
        }
        return true;
    }

    private hasEmpty(signSlot1: SignSlot, signSlot2: SignSlot, signSlot3: SignSlot) {
        return signSlot1.isEmpty || signSlot2.isEmpty || signSlot3.isEmpty;
    }

    private hasDiagonal() {
        return (
            this.hasLine(this._field[0][0], this._field[1][1], this._field[2][2]) ||
            this.hasLine(this._field[0][2], this._field[1][1], this._field[2][0])
        );
    }

    private hasColumn(): boolean {
        for (let column = 0; column < 3; column++) {
            if (this.hasLine(this._field[0][column], this._field[1][column], this._field[2][column])) {
                return true;
            }
        }
        return false;
    }

    private hasRow(): boolean {
        for (let row = 0; row < 3; row++) {
            if (this.hasLine(this._field[row][0], this._field[row][1], this._field[row][2])) {
                return true;
            }
        }
        return false;
    }

    private hasLine(signSlot1: SignSlot, signSlot2: SignSlot, signSlot3: SignSlot): boolean {
        if (!this.hasEmpty(signSlot1, signSlot2, signSlot3)) {
            if (
                signSlot1.sign.character === signSlot2.sign.character &&
                signSlot1.sign.character === signSlot3.sign.character
            ) {
                this._winningSlot = [];
                this._winningSlot.push(signSlot1, signSlot2, signSlot3);
                this._loosingSlot = [];
                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        const element = this._field[row][col];
                        if (element != signSlot1 && element != signSlot2 && element != signSlot3) {
                            this._loosingSlot.push(element);
                        }
                    }
                }
                return true;
            }
        }
        return false;
    }
}
