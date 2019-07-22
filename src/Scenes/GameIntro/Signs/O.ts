import Sign from "./Sign";
import { TimelineMax, TweenMax } from "gsap";
import Board from "../Board/Board";

export default class O extends Sign {
    private readonly _delay: number;
    private _currentX: number;
    private _currentY: number;
    private _radius: number;

    constructor(timeline: TimelineMax, width: number, height: number) {
        super(timeline, width, height);
        this._delay = 0.03;
        this._radius = this._area.width / 2;
        this._currentX = this._radius - 4;
        this._currentY = 4;
    }

    public drawSign(): void {
        this._feather.x = this._currentX;
        this._feather.y = this._currentY - this._feather.view.texture.height * this._featherScale;
        this._timeline.add(this._feather.arrive(this._featherScale));
        this.beginFill(this._color);
        this.drawCircleWithFeather();
        this.endFill();
        this._timeline.add(this._feather.fadeAway());
        this._timeline.add(this.onComplete());
    }

    private drawCircleWithFeather(): void {
        for (let i = 0; i < Math.PI * 2; i += 0.112) {
            this._timeline.add(
                TweenMax.delayedCall(this._delay, () => {
                    this.moveTo(this._currentX, this._currentY);
                    this._currentX += Math.cos(i) * (this._radius / Math.PI / 3);
                    this._currentY += Math.sin(i) * (this._radius / Math.PI / 3);
                    this._feather.goTo(this._currentX, this._currentY, this._delay);
                    this.lineTo(this._currentX, this._currentY);
                })
            );
        }
    }
}
