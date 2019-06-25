import * as PIXI from "pixi.js";

import GameMenu from "./GameMenu";
import HeadOrTails from "../HeadOrTails/HeadOrTails";

export default class PlayButton extends PIXI.Sprite {

    private readonly app: PIXI.Application;
    readonly gameMenu: GameMenu;
    private readonly containerMainMenu: PIXI.Container;
    private namePlayer1: string;
    private namePlayer2: string;

    constructor(gameMenu: GameMenu) {
        super();
        this.app = gameMenu.app;
        this.gameMenu = gameMenu;
        this.containerMainMenu = this.gameMenu.containerMainMenu;
        this.texture = PIXI.Texture.from("playButton");
        this.x = this.app.screen.width / 2;
        this.y = this.app.screen.height / 1.15;
        this.anchor.set(0.5);
        this.width = 200;
        this.height = 80;
        this.interactive = true;
        this.buttonMode = true;
        this.addFunctionally();
    }

    private addFunctionally() {
        this.on('pointertap', () => {
                const {gameMenu} = this;
                gameMenu.removeErrorTexts();
                this.namePlayer1 = gameMenu.textInputPlayer1.text;
                this.namePlayer2 = gameMenu.textInputPlayer2.text;
                if (this.isWrongInput()) {
                    return;
                }
                this.containerMainMenu.removeChildren();
                this.app.stage.removeChild(this.containerMainMenu);
                this.startHeadOrTails();
            }
        );
    }

    private isWrongInput() {
        if (this.namePlayer1 === "" || this.namePlayer2 === "") {
            this.containerMainMenu.addChild(this.gameMenu.errorEmptyInputText);
            return true;
        } else if (this.namePlayer1 === this.namePlayer2) {
            this.containerMainMenu.addChild(this.gameMenu.errorEqualNamesText);
            return true;
        } else if (this.namePlayer1.length > 10 || this.namePlayer2.length > 10) {
            this.containerMainMenu.addChild(this.gameMenu.errorBiggerLengthText);
            return true;
        }
        return false;
    }

    private startHeadOrTails() {
        const headOrTails = new HeadOrTails(this.app, this.namePlayer1, this.namePlayer2);
        headOrTails.start();
    }

}