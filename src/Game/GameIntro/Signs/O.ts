import Sign from "./Sign";
import { TimelineMax, TweenMax } from "gsap";

export default class O extends Sign {
    private readonly _delay: number;
    private _currentX : number;
    private _currentY : number;

    constructor(_size: number,  _timeline: TimelineMax) {
        super((Math.PI / 2) * (1 / _size),  _timeline);
        this._delay = 0.01;
        this._currentX = this.x - this._size / 2;
        this._currentY = this.y;
    }

    public drawSign(): void {
        this._feather.x = this._currentX;
        this._feather.y = this._currentY - this._featherView.texture.height * this._featherScale;
        this._timeline.add(this._feather.arrive(this._featherScale));
        this.beginFill(this._color);
        this.drawCircleWith_feather();
        this.endFill();
        this._timeline.add(this._feather.fadeAway());
    }

    private drawCircleWith_feather(): void {
        for (let i = 0; i < Math.PI * 2; i += this._size) {
            this._timeline.add(
                TweenMax.delayedCall(this._delay, () => {
                    this.moveTo(this._currentX, this._currentY);
                    this._currentX += Math.cos(i);
                    this._currentY += Math.sin(i);
                    this._feather.goTo(this._currentX, this._currentY, this._delay);
                    this.lineTo(this._currentX, this._currentY);
                })
            );
        }
      
    }
}
