import * as PIXI from "pixi.js";

export default class TextFieldBitmap extends PIXI.BitmapText {
    constructor(text: string, px: number, textAlign: string, x: number, y: number) {
        super(text, {
            font: {
                name: "Desyrel",
                size: px
            },
            align: textAlign
        });
        this.x = x;
        this.y = y;
    }
}