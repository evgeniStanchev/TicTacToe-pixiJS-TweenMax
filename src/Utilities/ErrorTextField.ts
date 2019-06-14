import * as PIXI from "pixi.js";
export default class ErrorTextField extends PIXI.Text {
    constructor(text: string, px: number, x: number, y: number) {
        super(text, new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: px,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#FF0000']
        }));
        this.x = x;
        this.y = y;
    }
}