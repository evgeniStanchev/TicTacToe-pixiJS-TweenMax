import * as PIXI from "pixi.js";
import Sprite from "../Utilities/Sprite";
import TextFieldBitmap from "../Utilities/TextFieldBitmap";
import Spinner from "./Spinner";

export default class HeadOrTail {
    public readonly MAX_SIZE_COIN: number = 225;
    public readonly TAIL_PATH: string = 'assets/images/tail.png';
    public readonly HEAD_PATH: string = 'assets/images/head.png';

    private readonly app: PIXI.Application;
    private readonly containerHOT: PIXI.Container;
    private readonly namePlayer1: string;
    private readonly namePlayer2: string;

    private head: PIXI.Sprite;
    private tail: PIXI.Sprite;
    private spinner: Spinner;
    private coin: PIXI.Sprite;
    private bitmapNamePlayer1: PIXI.BitmapText;
    private bitmapNamePlayer2: PIXI.BitmapText;
    private firstPlayer: PIXI.BitmapText;

    constructor(app: PIXI.Application, namePlayer1: string, namePlayer2: string) {
        this.containerHOT = new PIXI.Container;
        this.app = app;
        this.namePlayer1 = namePlayer1;
        this.namePlayer2 = namePlayer2;
        this.init();
    }

    public start() {
        this.spinner.spin();
    }

    private init() {
        const tailTexture = PIXI.Texture.from(this.TAIL_PATH);
        const headTexture = PIXI.Texture.from(this.HEAD_PATH);

        this.app.stage.addChild(this.containerHOT);
        this.bitmapNamePlayer1 = new TextFieldBitmap(this.namePlayer1, 50, "center", this.app.screen.width / 5.5, this.app.screen.height / 10);
        this.containerHOT.addChild(this.bitmapNamePlayer1);

        this.bitmapNamePlayer2 = new TextFieldBitmap(this.namePlayer2, 50, "center", this.app.screen.width / 1.5, this.app.screen.height / 10);
        this.containerHOT.addChild(this.bitmapNamePlayer2);

        this.coin = new Sprite(headTexture, true, true, this.app.screen.width / 2, this.app.screen.height / 1.5, this.MAX_SIZE_COIN, this.MAX_SIZE_COIN);
        this.containerHOT.addChild(this.coin);

        this.head = new Sprite(headTexture, false, false, this.app.screen.width / 4, this.app.screen.height / 3.5, 100, 100);
        this.containerHOT.addChild(this.head);

        this.tail = new Sprite(tailTexture, false, false, this.app.screen.width / 1.35, this.app.screen.height / 3.25, 100, 100);
        this.containerHOT.addChild(this.tail);

        this.firstPlayer = new TextFieldBitmap("", 50, "center", this.app.screen.width / 3.5, this.app.screen.height / 2);
        this.firstPlayer.width = 0;
        this.firstPlayer.height = 0;
        this.containerHOT.addChild(this.firstPlayer);

        this.spinner = new Spinner(this.app, this.containerHOT, this.coin, this.head, this.tail, this.firstPlayer, this.namePlayer1, this.namePlayer2, this.bitmapNamePlayer1, this.bitmapNamePlayer2);
    }

}