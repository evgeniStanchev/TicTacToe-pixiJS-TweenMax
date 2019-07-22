import { TimelineMax, TweenMax } from "gsap";
import PlayersInfoView from "../View/PlayersInfoView";
import Player from "../../../../Player/Player";

export default class PlayersInfoController {
    private _view: PlayersInfoView;

    constructor(timeline: TimelineMax, namePlayer1: string, namePlayer2: string) {
        this._view = new PlayersInfoView(timeline, namePlayer1, namePlayer2);
        this._view.y = 35;
    }

    get view(): PlayersInfoView {
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

    public growUp(player: Player, size: number) {
        TweenMax.to(player, 0.5, {
            width: player.width + size,
            height: player.height + size,
        });
    }

    public shrink(player: Player, size: number) {
        TweenMax.to(player, 0.5, {
            width: player.width - size,
            height: player.height - size,
        });
    }
}
