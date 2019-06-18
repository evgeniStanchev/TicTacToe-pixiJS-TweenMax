import * as PIXI from "pixi.js";
import GameMenu from "./Menu/GameMenu";
import GamePlay from "./Game/GamePlay";

export default class Main {
    private static readonly GAME_WIDTH: number = 800;
    private static readonly GAME_HEIGHT: number = 600;
    private app: PIXI.Application;

    constructor() {
        window.onload = () => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();
        // new GameMenu(this.app);
        new GamePlay("Evgeni", "Diana");
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT
        });
        document.body.appendChild(this.app.view);
    }
}

const game: Main = new Main();