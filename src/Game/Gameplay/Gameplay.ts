import Scene from "../GameController/Scene";
import Player from "../Player/Player";

export default class Gameplay extends Scene {
    private readonly _app: PIXI.Application;

    private  _player1 : Player;
    private  _player2 : Player;


    constructor(app: PIXI.Application) {
        super();
        this._app = app;
    }


    set player1(player1 : Player){
        this._player1 = player1;
    }

    
    set player2(player2 : Player){
        this._player2 = player2;
    }

    onStart(): void {
        throw new Error("Method not implemented.");
    }

    onExit(): void {
        throw new Error("Method not implemented.");
    }
}
