import * as PIXI from "pixi.js"
import TextInput from "pixi-text-input";

export default class MyTextInput extends TextInput {
    constructor(text: PIXI.BitmapText) {
        super(
            {
                input: {
                    fontFamily: 'Arial',
                    fontSize: '16px',
                    padding: '5px',
                    width: '200px',
                    color: '#26272E'
                },
                box: {
                    default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
                    focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
                    disabled: {fill: 0xDBDBDB, rounded: 12}
                }
            });
        this.x = text.x - 20;
        this.y = text.y + 60;
    }
}