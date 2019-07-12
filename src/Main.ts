import * as PIXI from "pixi.js";
import GameController from "./Game/GameController/GameController";

class Main {
    public static readonly GAME_WIDTH: number = 800;
    public static readonly GAME_HEIGHT: number = 600;
    private _app: PIXI.Application;

    constructor() {
        window.onload = () => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = new PIXI.Loader;
        loader.add("desyrel", "assets/bitmap-font/" + "desyrel.xml");
        loader.add("feather", "../assets/images/feather.png");
        loader.add("head", "../assets/images/head.png");
        loader.add("tail", "../assets/images/tail.png");
        loader.add("background", "../assets/tictactoe-background.jpg");
        loader.add("playButton", "../assets/playButton.png");
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();
      
        new GameController(this._app);
    }

    private createRenderer(): void {
        this._app = new PIXI.Application({
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
            antialias: true,
        });
        document.body.appendChild(this._app.view);
    }
}

new Main();
