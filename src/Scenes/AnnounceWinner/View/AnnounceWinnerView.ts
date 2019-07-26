import * as PIXI from "pixi.js";
import { TweenMax } from "gsap";
import Main from "../../../Main";

export default class AnnounceWinnerView extends PIXI.Container {
    private _winnerName: string;
    private _winnerText: PIXI.BitmapText;
    private readonly _winnerTextX: number = Main.GAME_WIDTH / 2;
    private readonly _winnerTextY: number = Main.GAME_HEIGHT / 2;
    private readonly _winnerTextWidthMultiplier: number = 75;
    private readonly _winnerTextHeight: number = 100;
    private readonly _textSize: number = 30;

    private _restartButton: PIXI.Sprite;
    private readonly _restartButtonX: number = Main.GAME_WIDTH / 2.75;
    private readonly _restartButtonY: number = Main.GAME_HEIGHT / 1.35;
    private readonly _restartButtonWidth: number = 200;
    private readonly _restartButtonHeight: number = 80;

    constructor() {
        super();
    }

    private addFunctionallity() {
        this._restartButton.on("pointertap", () => {
            this.onExit();
        });
    }

    public onStart() {
        this.createWinnerText();
        this.showWinnerText();
        this.createButton();
        this.addFunctionallity();
    }

    private onExit() {
        this.removeChildren();
        this.emit("exit");
    }

    private createButton() {
        this._restartButton = new PIXI.Sprite();
        this._restartButton.texture = PIXI.Texture.from("playButton");
        this._restartButton.x = this._restartButtonX;
        this._restartButton.y = this._restartButtonY;
        this._restartButton.width = this._restartButtonWidth;
        this._restartButton.height = this._restartButtonHeight;
        this._restartButton.interactive = true;
        this._restartButton.buttonMode = true;
        this.addChild(this._restartButton);
    }

    public set winnerName(value: string) {
        this._winnerName = value;
    }

    public showWinnerText() {
        TweenMax.to(this._winnerText, 1, {
            x: this._winnerTextX,
            y: this._winnerTextY,
        });

        let textWidth = 200;
        if (this._winnerName != null) {
            textWidth = this._winnerName.length * this._winnerTextWidthMultiplier;
        }

        TweenMax.to(this._winnerText, 1, {
            width: textWidth,
            height: this._winnerTextHeight,
        });
    }

    public createWinnerText() {
        if (this._winnerName == null) {
            this._winnerText = new PIXI.BitmapText("DRAW!", {
                font: {
                    name: "Desyrel",
                    size: this._textSize,
                },
            });
        } else {
            this._winnerText = new PIXI.BitmapText(this._winnerName.trim() + " is winner!", {
                font: {
                    name: "Desyrel",
                    size: this._textSize,
                },
            });
        }
        this._winnerText.anchor = 0.5;
        this.addChild(this._winnerText);
    }
}
