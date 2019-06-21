import Player from "./Player";
import * as PIXI from "pixi.js";
import TextFieldBitmap from "../Utilities/TextFieldBitmap";
import {TweenMax} from "gsap";
import Sprite from "../Utilities/Sprite";
import {Linear} from "gsap";

export default class Gameplay {
    private readonly PATH_IMG_FEATHER: string = `assets/images/feather.png`;
    private readonly PATH_BITMAP_FONT: string = `assets/bitmap-font/`;
    private readonly LINE_WIDTH: number = 4;
    private xRectangle: number = 190;
    private yRectangle: number = 125;
    private widthRectangle: number = 420;
    private heightRectangle: number = 420;
    private app: PIXI.Application;
    private player1: Player;
    private player2: Player;
    private nameBitmapPlayer1: PIXI.BitmapText;
    private nameBitmapPlayer2: PIXI.BitmapText;
    private readonly containerGame: PIXI.Container;
    private readonly containerBoard: PIXI.Container;
    private readonly containerFeather: PIXI.Container;
    private readonly graphics: PIXI.Graphics;
    private readonly whiteSprite: PIXI.Sprite;
    private readonly feather: PIXI.Sprite;

    constructor(app: PIXI.Application, namePlayer1: string, namePlayer2: string) {
        this.loadBitmap();
        this.createPlayers(namePlayer1, namePlayer2);
        this.graphics = new PIXI.Graphics();

        this.app = app;
        this.app.stage.interactive = true;

        this.containerGame = new PIXI.Container();
        this.setupContainerGame();

        this.containerBoard = new PIXI.Container();
        this.setupContainerBoard();

        //TODO Draw the texture with graphics
        this.whiteSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.setupWhiteSprite();

        this.createWhiteBoardFrames();

        this.containerFeather = new PIXI.Container();
        this.setupContainerFeather();

        this.feather = new Sprite(PIXI.Texture.from(this.PATH_IMG_FEATHER), true, false, -25, 0, 160, 150);
        this.feather.anchor.set(0, 0);
        this.containerFeather.addChild(this.feather);
        this.move1(2.00, 1, this.containerBoard.width - (this.feather.width/2), 0);
    }

    private loadBitmap() {
        const loader = new PIXI.Loader();
        loader.add('desyrel', this.PATH_BITMAP_FONT + 'desyrel.xml').load(this.onAssetsLoaded.bind(this));
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

    private setupContainerFeather() {
        this.containerBoard.addChild(this.containerFeather);
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

    private drawLines() {
        this.graphics.lineStyle(4, 0xBF9B30);

        let x = this.containerBoard.width - this.LINE_WIDTH / 2;
        let y = (this.containerBoard.height / 3) - this.LINE_WIDTH / 2;
        TweenMax.delayedCall(1, this.drawHorizontalLine, [x, y], this);

        y *= 2;
        TweenMax.delayedCall(4.00, this.drawHorizontalLine, [x, y], this);


        //
        // x = (this.containerBoard.width / 3) - this.LINE_WIDTH / 2;
        // y = this.containerBoard.height - this.LINE_WIDTH / 2;
        // TweenMax.delayedCall(6, this.drawVerticalLine, [x, y], this);
        //
        // x *= 2;
        // TweenMax.delayedCall(8, this.drawVerticalLine, [x, y], this);

        this.containerBoard.addChild(this.graphics);
    }

    private drawHorizontalLine(x: number, y: number) {
        let currentX = 0;
        while (currentX <= x) {
            TweenMax.delayedCall(currentX * 0.005, this.drawHorizontalPoint, [++currentX, y], this);
        }
    }

    private drawVerticalLine(x: number, y: number) {
        let currentY = 0;
        while (currentY <= y) {
            TweenMax.delayedCall(currentY * 0.0035, this.drawVerticalPoint, [x, currentY], this);
        }
    }

    private move1(duration: number, delay: number, x: number, y: number) {
        console.log(this.feather.width)
        TweenMax.to(this.feather, duration, {
            x: x,
            y: y,
            delay: delay,
            ease: Linear.easeNone,
            onComplete: this.move2,
            onCompleteParams: [1, 0, - 80, this.containerBoard.height/3],
            onCompleteScope: this
        });
    }

    private move2(duration: number, delay: number, x: number, y: number) {
        TweenMax.to(this.feather, duration, {
            x: x,
            y: y,
            delay: delay,
            ease: Linear.easeNone,
            onComplete: this.move3,
            onCompleteParams: [2, 0, 370, 140],
            onCompleteScope: this
        });
    }

    private move3(duration: number, delay: number, x: number, y: number) {
        TweenMax.to(this.feather, duration, {
            x: x,
            y: y,
            delay: delay,
            ease: Linear.easeNone,
            onComplete: this.move4,
            onCompleteParams: [1, 0, 100, -140],
            onCompleteScope: this
        });
    }

    private move4(duration: number, delay: number, x: number, y: number) {
        TweenMax.to(this.feather, duration, {
            x: x,
            y: y,
            delay: delay,
            ease: Linear.easeNone,
            onComplete: this.move5,
            onCompleteParams: [2, 0, 100, 270],
            onCompleteScope: this
        });
    }

    private move5(duration: number, delay: number, x: number, y: number) {
        TweenMax.to(this.feather, duration, {
            x: x,
            y: y,
            delay: delay,
            ease: Linear.easeNone,
            onComplete: this.move6,
            onCompleteParams: [1, 0, 240, -140],
            onCompleteScope: this
        });
    }

    private move6(duration: number, delay: number, x: number, y: number) {
        TweenMax.to(this.feather, duration, {
            x: x,
            y: y,
            delay: delay,
            ease: Linear.easeNone,
            onComplete: this.move7,
            onCompleteParams: [2, 0, 240, this.containerBoard.height - y],
            onCompleteScope: this
        });
    }

    private move7(duration: number, delay: number, x: number, y: number) {
        TweenMax.to(this.feather, duration, {
            x: x,
            y: y,
            delay: delay,
            ease: Linear.easeNone,
        });
    }


//   onCompleteParams: [-50, 140, 1],

    // private startFeatherMoves() {
    // TweenMax.delayedCall(1, this.moveFeather, [380, 0, 2.75], this);
    // TweenMax.delayedCall(4.75, this.moveFeather, [380, 140, 2.75], this);
    // }

    private createWhiteBoardFrames() {
        this.graphics.lineStyle(this.LINE_WIDTH, 0xBF9B30, 1);
        this.graphics.drawRect(-2, -2, this.widthRectangle, this.heightRectangle);
        this.drawLines();
    }

    private drawHorizontalPoint(x: number, y: number) {
        this.graphics.beginFill();
        this.graphics.moveTo(x, y);
        this.graphics.lineTo(x + 1, y);
        this.graphics.endFill();
    }

    private drawVerticalPoint(x: number, y: number) {
        this.graphics.beginFill();
        this.graphics.moveTo(x, y);
        this.graphics.lineTo(x, y + 1);
        this.graphics.endFill();
    }
}