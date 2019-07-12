import * as PIXI from "pixi.js";
import Sign from "../GameIntro/Signs/Sign";
import { ALIGN } from "./ALIGN";
import Square from "../GameIntro/Board/Square/Square";

export default class Player extends PIXI.Container {
    public static OBJECT_SPACING: number = 40;
    private _name: PIXI.BitmapText;
    private _sign: Sign;
    private _align: ALIGN;
    private _square: Square;

    constructor(sign: Sign, align: ALIGN, square: Square) {
        super();
        const loader = new PIXI.Loader();
        loader.load(this.onAssetsLoaded.bind(this));

        this._align = align;
        this._sign = sign;

        this._square = square;
        this._square.y = this._name.y + 8;
        this._square.x = this._name.x - Player.OBJECT_SPACING / 2;

        this.addChild(this._name);
        this.addChild(this._square);
        this._square.addChild(this._sign);
    }

    get name() {
        return this.name;
    }

    get sign(): Sign {
        return this._sign;
    }

    get square(): Square {
        return this._square;
    }

    set name(name: string) {
        this._name.text = name.trim();
        this._name.letterSpacing = -this._name.text.length / 2;
        for (let index = this._name.text.length; index < 10; index++) {
            if (this._align === ALIGN.RIGHT) {
                this._name.text = " " + this._name.text;
            } else {
                this._name.text += " ";
            }
        }
        if (this._align === ALIGN.RIGHT) {
            this._square.x = this._name.x + this._name.width + Player.OBJECT_SPACING;
        }
    }

    onAssetsLoaded() {
        this._name = new PIXI.BitmapText("", {
            font: {
                name: "Desyrel",
                size: 50,
            },
        });
    }

    public drawSign() {
        this._sign.drawSign();
    }
}
