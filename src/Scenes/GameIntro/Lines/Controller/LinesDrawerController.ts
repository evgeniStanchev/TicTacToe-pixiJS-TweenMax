import { TimelineMax } from "gsap";
import LinesDrawerView from "../View/LinesDrawerView";

export default class LinesDrawerController {
    private readonly _view: LinesDrawerView;

    constructor(timeline: TimelineMax) {
        this._view = new LinesDrawerView(timeline);
    }

    get view(): LinesDrawerView {
        return this._view;
    }

    public drawLines() {
        this._view.addChild(this._view.feather.view);
        this._view.drawHorizontalLines();
        this._view.drawVerticalLines();
        this._view.featherFadeAway();
    }
}
