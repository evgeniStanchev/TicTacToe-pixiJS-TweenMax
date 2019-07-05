import Sign from "./Sign";
import _featherController from "../../Feather/FeatherController";
import { TimelineMax, TweenMax } from "gsap";
import GameIntro from "../GameIntro";

export default class O extends Sign {
    public readonly _delay: number;

    constructor(_size: number,  _timeline: TimelineMax) {
        super((Math.PI / 2) * (1 / _size),  _timeline);
        this._delay = 0.01;
    }

    public drawSign(): void {
        this._timeline.add(this._feather.arrive(GameIntro.FEATHER_SCALE));
        this.beginFill(this._color);
        this.drawCircleWith_feather();
        this.endFill();
    }

    private drawCircleWith_feather(): void {
        let currentX = this.x + 15;
        let currentY = this.y;
        this._timeline.add(this._feather.goTo(currentX, currentY, 1));
        for (let i = 0; i < Math.PI * 2; i += this._size) {
            this._timeline.add(
                TweenMax.delayedCall(this._delay, () => {
                    this.beginFill(this._color);
                    this.moveTo(currentX, currentY);
                    currentX += Math.cos(i);
                    currentY += Math.sin(i);
                    this._feather.goTo(currentX, currentY, this._delay);
                    this.lineTo(currentX, currentY);
                    this.endFill();
                })
            );
        }
    }
}
