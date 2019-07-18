import { TimelineMax } from "gsap";
import PlayersInfoView from "../View/PlayersInfoView";

export default class PlayersInfoController {
    private _view: PlayersInfoView;

    constructor(timeline: TimelineMax, namePlayer1: string, namePlayer2: string) {
        this._view = new PlayersInfoView(timeline, namePlayer1, namePlayer2);
        this._view.y = 35;
    }

    get view(): PlayersInfoView{
        return this._view;
    }

    get player1() {
        return this._view.player1;
    }

    get player2() {
        return this._view.player2;
    }

    public insertSigns() {
        this._view.insertSigns();
    }

    public insertPlayers() {
        this._view.insertPlayers();
    }
}
