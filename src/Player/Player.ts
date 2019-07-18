import * as PIXI from "pixi.js";
import { ALIGN } from "./ALIGN";
import SignSlot from "../Scenes/GameIntro/Board/SignSlot/SignSlot";
import { TimelineMax } from "gsap";

export default class Player extends PIXI.Container {
    public static readonly SLOT_SIZE: number = 40;
    public static readonly OBJECT_SPACING: number = Player.SLOT_SIZE + 10;
    private _name: PIXI.BitmapText;
    private _sign: string;
    private _align: ALIGN;
    private _signSlot: SignSlot;

    constructor(sign: string, align: ALIGN) {
        super();
        const loader = new PIXI.Loader();
        loader.load(this.onAssetsLoaded.bind(this));

        this._align = align;
        this._sign = sign;

        this._signSlot = new SignSlot(Player.SLOT_SIZE, Player.SLOT_SIZE);

        this._name.x = Player.OBJECT_SPACING;
        this._name.y = this._signSlot.y - 8;

        this.addChild(this._name);
        this.addChild(this._signSlot);
    }

    get name() {
        return this.name;
    }

    get sign(): string {
        return this._sign;
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
            this._signSlot.x = this._name.x + this._name.width + Player.SLOT_SIZE / 2;
        }
    }

    public drawSign(timeline: TimelineMax) {
        this._signSlot.drawSign(this._sign, timeline);
    }

    onAssetsLoaded() {
        this._name = new PIXI.BitmapText("", {
            font: {
                name: "Desyrel",
                size: 50,
            },
        });
    }
}
