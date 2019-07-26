import * as PIXI from "pixi.js";

export default class TextFieldError extends PIXI.Text {
    constructor(text: string, px: number) {
        super(
            text,
            new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: px,
                fontStyle: "italic",
                fontWeight: "bold",
                fill: ["#FF0000"],
                align: "center"
            })
        );
    }
}
