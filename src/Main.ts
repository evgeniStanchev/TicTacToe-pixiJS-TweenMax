import * as PIXI from "pixi.js";
import GameMenu from "./Menu/GameMenu";

export default class Main {
    private static readonly GAME_WIDTH: number = 800;
    private static readonly GAME_HEIGHT: number = 600;
    private app: PIXI.Application;

    constructor() {
        window.onload = () => {
            this.startLoadingAssets();
        };
    }

//TODO Idea that is still not implemented -> 'different part, different enum value'
//     public static goToNextPart(currentPart: PART) {
//         switch (currentPart) {
//             case PART.MAIN_MENU: {
//                 break;
//             }
//             case PART.HEAD_OR_TAILS: {
//                 break;
//             }
//             case PART.GAME: {
//                 break;
//             }
//         }
//     }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();
        new GameMenu(this.app);
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT
        });
        document.body.appendChild(this.app.view);
    }


}

//TODO Idea that is still not implemented
// enum PART {
//     MAIN_MENU,
//     HEAD_OR_TAILS,
//     GAME,
// }

const game: Main = new Main();
