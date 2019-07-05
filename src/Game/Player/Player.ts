import Sign from "../GameIntro/Signs/Sign";

export default class Player {
    private readonly _name: string;
    private readonly _sign: Sign;

    constructor(name: string, sign: Sign) {
        this._name = name;
        this._sign = sign;
    }

    get name(): string {
        return this._name;
    }

    get sign(): Sign{
        return this._sign;
    }

}
