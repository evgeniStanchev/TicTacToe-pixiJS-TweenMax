import * as PIXI from "pixi.js";
import { TweenMax } from "gsap";
import Drawer from "./Lines/LineDrawer";
import Scene from "../GameController/Scene";

export default class GameIntro extends Scene {
    private readonly _LINE_WIDTH: number = 4;

    private _containerBoard: PIXI.Container;
    private _drawer: Drawer;

    private _xRectangle: number = 190;
    private _yRectangle: number = 125;
    private _widthRectangle: number = 420;
    private _heightRectangle: number = 420;

    private _app: PIXI.Application;
    private _nameBitmapPlayer1: PIXI.BitmapText;
    private _nameBitmapPlayer2: PIXI.BitmapText;

    constructor(app: PIXI.Application) {
        super();
        this._app = app;
        this._app.stage.interactive = true;
        this._app.stage.addChild(this);

        this._containerBoard = new PIXI.Container();
        this.setupContainerBoard();

        const loader = new PIXI.Loader();
        loader.load(this.onAssetsLoaded.bind(this));
    }

    set namePlayer1(name: string) {
        this._nameBitmapPlayer1.text = name;
    }

    set namePlayer2(name: string) {
        this._nameBitmapPlayer2.text = name;
    }

    onStart(): void {
        const canvasDrawer = new PIXI.Graphics();
        canvasDrawer.beginFill(0xFFFFFF);
        canvasDrawer.drawRect(-this._LINE_WIDTH/2, -this._LINE_WIDTH/2, this._widthRectangle, this._heightRectangle);
        canvasDrawer.endFill();
        this._containerBoard.addChild(canvasDrawer);
        this._drawer = new Drawer(this._containerBoard, this._LINE_WIDTH, 2.25);
        this.setupBoard();
       
    }

    private setupBoard() {
        this._drawer.drawRect(-this._LINE_WIDTH/2, -this._LINE_WIDTH/2, this._widthRectangle, this._heightRectangle);
        this._drawer.drawLines();
    }

    private setupContainerBoard() {
        this._containerBoard.x = this._xRectangle;
        this._containerBoard.y = this._yRectangle;
        this._containerBoard.width = this._widthRectangle;
        this._containerBoard.height = this._heightRectangle;
        this.addChild(this._containerBoard);
    }

    onAssetsLoaded() {
        this._nameBitmapPlayer1 = new PIXI.BitmapText("", {
            font: {
                name: "Desyrel",
                size: 30,
            },
        });
        this._nameBitmapPlayer1.x = -50;
        this._nameBitmapPlayer1.y = 20;
        this.addChild(this._nameBitmapPlayer1);

        this._nameBitmapPlayer2 = new PIXI.BitmapText("", {
            font: {
                name: "Desyrel",
                size: 30,
            },
        });
        this._nameBitmapPlayer2.x = 850;
        this._nameBitmapPlayer2.y = 20;
        this.addChild(this._nameBitmapPlayer2);

        this.insertNames();
    }

    private insertNames() {
        TweenMax.to(this._nameBitmapPlayer1, 1, {
            x: 50,
        });

        TweenMax.to(this._nameBitmapPlayer2, 1, {
            x: 650,
        });
    }

    onExit(): void {
        throw new Error("Method not implemented.");
    }
}
