import TextInput from "pixi-text-input";

export default class MyTextInput extends TextInput {
    constructor() {
        super({
            input: {
                fontFamily: "Arial",
                fontSize: "16px",
                padding: "5px",
                width: "200px",
                color: "#26272E",
            },
            box: {
                default: { fill: 0xe8e9f3, rounded: 12, stroke: { color: 0xcbcee0, width: 3 } },
                focused: { fill: 0xe1e3ee, rounded: 12, stroke: { color: 0xabafc6, width: 3 } },
                disabled: { fill: 0xdbdbdb, rounded: 12 },
            },
        });
    }
}
