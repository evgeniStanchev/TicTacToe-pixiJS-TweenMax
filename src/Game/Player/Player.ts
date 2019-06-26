export default class Player {
    private readonly _name: string;
    private readonly _sign: string;

    constructor(name: string, sign: string) {
        if (sign.length > 1) {
            throw "Sign lenght must be 1";
        }
        this._name = name;
        this._sign = sign;
    }

    get name(): string {
        return this._name;
    }
}
