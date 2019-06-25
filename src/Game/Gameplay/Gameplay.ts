import Player from "../Player/Player";
import * as PIXI from "pixi.js";
import TextFieldBitmap from "../../Utilities/TextFieldBitmap";
import { TweenMax } from "gsap";
import LinesDrawer from "../GameIntro/Lines/LinesDrawer";

export default class Gameplay {
    private readonly PATH_BITMAP_FONT: string = `assets/bitmap-font/`;
    private readonly LINE_WIDTH: number = 4;

    private readonly containerGame: PIXI.Container;
    private readonly containerBoard: PIXI.Container;
    private readonly linesDrawer: LinesDrawer;
    private readonly whiteSprite: PIXI.Sprite;

    private xRectangle: number = 190;
    private yRectangle: number = 125;
    private widthRectangle: number = 420;
    private heightRectangle: number = 420;
    private app: PIXI.Application;
    private player1: Player;
    private player2: Player;
    private nameBitmapPlayer1: PIXI.BitmapText;
    private nameBitmapPlayer2: PIXI.BitmapText;

    constructor(app: PIXI.Application, namePlayer1: string, namePlayer2: string) {
        this.loadBitmap();
        this.createPlayers(namePlayer1, namePlayer2);
        this.app = app;
        this.app.stage.interactive = true;

        this.containerGame = new PIXI.Container();
        this.setupContainerGame();

        this.containerBoard = new PIXI.Container();
        this.setupContainerBoard();

        //TODO Draw the texture with graphics
        this.whiteSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.setupWhiteSprite();
        this.linesDrawer = new LinesDrawer(this.containerBoard, this.LINE_WIDTH, 0xbf9b30, 2.25);
        this.linesDrawer.drawRect(-2, -2, this.widthRectangle, this.heightRectangle);
        this.linesDrawer.drawLines(this.containerBoard);
    }

    private loadBitmap() {
        const loader = new PIXI.Loader();
        loader.add("desyrel", this.PATH_BITMAP_FONT + "desyrel.xml").load(this.onAssetsLoaded.bind(this));
    }

    private createPlayers(namePlayer1: string, namePlayer2: string) {
        this.player1 = new Player(namePlayer1, "X");
        this.player2 = new Player(namePlayer2, "Y");
    }

    private setupWhiteSprite() {
        this.whiteSprite.width = this.widthRectangle;
        this.whiteSprite.height = this.heightRectangle;
        this.containerBoard.addChild(this.whiteSprite);
    }

    private setupContainerGame() {
        this.app.stage.addChild(this.containerGame);
    }

    private setupContainerBoard() {
        this.containerBoard.x = this.xRectangle;
        this.containerBoard.y = this.yRectangle;
        this.containerBoard.width = this.widthRectangle;
        this.containerBoard.height = this.heightRectangle;
        this.containerGame.addChild(this.containerBoard);
    }

    onAssetsLoaded() {
        this.nameBitmapPlayer1 = new TextFieldBitmap(this.player1.name, 30, "center", -50, 20);
        this.containerGame.addChild(this.nameBitmapPlayer1);

        this.nameBitmapPlayer2 = new TextFieldBitmap(this.player2.name, 30, "center", 850, 20);
        this.containerGame.addChild(this.nameBitmapPlayer2);

        this.insertNames();
    }

    private insertNames() {
        TweenMax.to(this.nameBitmapPlayer1, 1, {
            x: 50,
        });

        TweenMax.to(this.nameBitmapPlayer2, 1, {
            x: 650,
        });
    }
}
