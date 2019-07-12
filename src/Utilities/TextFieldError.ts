import * as PIXI from "pixi.js";

export default class TextFieldError extends PIXI.Text {
    constructor(text: string, px: number, x: number, y: number) {
        super(text, new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: px,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#FF0000']
        }));
        //TODO outside
        this.x = x;
        this.y = y;
    }
}