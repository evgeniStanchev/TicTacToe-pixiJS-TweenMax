import Player from "../Player/Player";
import * as PIXI from "pixi.js";
import TextFieldBitmap from "../../Utilities/TextFieldBitmap";
import { TweenMax } from "gsap";
import LinesDrawer from "../GameIntro/Lines/LinesDrawer";

export default class Gameplay {
    private readonly _PATH_BITMAP_FONT: string = `assets/bitmap-font/`;
    private readonly _LINE_WIDTH: number = 4;

    private readonly _containerGame: PIXI.Container;
    private readonly _containerBoard: PIXI.Container;
    private readonly _linesDrawer: LinesDrawer;
    private readonly _whiteSprite: PIXI.Sprite;

    private _xRectangle: number = 190;
    private _yRectangle: number = 125;
    private _widthRectangle: number = 420;
    private _heightRectangle: number = 420;
    private _app: PIXI.Application;
    private _player1: Player;
    private _player2: Player;
    private _nameBitmapPlayer1: PIXI.BitmapText;
    private _nameBitmapPlayer2: PIXI.BitmapText;

    constructor(app: PIXI.Application, namePlayer1: string, namePlayer2: string) {
        this.loadBitmap();
        this.createPlayers(namePlayer1, namePlayer2);
        this._app = app;
        this._app.stage.interactive = true;

        this._containerGame = new PIXI.Container();
        this.setupContainerGame();

        this._containerBoard = new PIXI.Container();
        this.setupContainerBoard();

        //TODO Draw the texture with graphics
        this._whiteSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.setupWhiteSprite();
        this._linesDrawer = new LinesDrawer(this._containerBoard, this._LINE_WIDTH, 0xbf9b30, 2.25);
        this._linesDrawer.drawRect(-2, -2, this._widthRectangle, this._heightRectangle);
        this._linesDrawer.drawLines(this._containerBoard);
    }

    private loadBitmap() {
        const loader = new PIXI.Loader();
        loader.add("desyrel2", this._PATH_BITMAP_FONT + "desyrel.xml").load(this.onAssetsLoaded.bind(this));
    }

    private createPlayers(namePlayer1: string, namePlayer2: string) {
        this._player1 = new Player(namePlayer1, "X");
        this._player2 = new Player(namePlayer2, "Y");
    }

    private setupWhiteSprite() {
        this._whiteSprite.width = this._widthRectangle;
        this._whiteSprite.height = this._heightRectangle;
        this._containerBoard.addChild(this._whiteSprite);
    }

    private setupContainerGame() {
        this._app.stage.addChild(this._containerGame);
    }

    private setupContainerBoard() {
        this._containerBoard.x = this._xRectangle;
        this._containerBoard.y = this._yRectangle;
        this._containerBoard.width = this._widthRectangle;
        this._containerBoard.height = this._heightRectangle;
        this._containerGame.addChild(this._containerBoard);
    }

    onAssetsLoaded() {
        this._nameBitmapPlayer1 = new TextFieldBitmap(this._player1.name, 30, "center", -50, 20);
        this._containerGame.addChild(this._nameBitmapPlayer1);

        this._nameBitmapPlayer2 = new TextFieldBitmap(this._player2.name, 30, "center", 850, 20);
        this._containerGame.addChild(this._nameBitmapPlayer2);

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
}
