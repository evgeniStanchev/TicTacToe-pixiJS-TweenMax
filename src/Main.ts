import * as PIXI from "pixi.js";
import Gameplay from "./Game/Gameplay";
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
        new Gameplay(this.app, "Player1", "Player2");
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
            antialias: true
        });
        document.body.appendChild(this.app.view);
    }
}

const game: Main = new Main();