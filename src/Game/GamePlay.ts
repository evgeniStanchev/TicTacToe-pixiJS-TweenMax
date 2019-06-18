import Player from "./Player";
export default class GamePlay {

    private player1: Player;
    private player2: Player;

    constructor(namePlayer1: string, namePlayer2: string) {
        this.player1 = new Player(namePlayer1);
        this.player2 = new Player(namePlayer2);
    }
}