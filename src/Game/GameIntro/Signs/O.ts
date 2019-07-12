import Sign from "./Sign";
import { TimelineMax, TweenMax } from "gsap";
import Square from "../Board/Square/Square";

export default class O extends Sign {
    private readonly _delay: number;
    private _currentX: number;
    private _currentY: number;

    constructor(timeline: TimelineMax, square: Square) {
        super((Math.PI / 2) * (1 / size), timeline, square);
        this._delay = 0.01;

        console.log(this._square.width/2);

        this._currentX = this._square.x + this._square.width/2;
        this._currentY = 0;
    }

    public drawSign(): void {
        this._feather.x = this._currentX;
        this._feather.y = this._currentY - this._featherView.texture.height * this._featherScale;
        this._timeline.add(this._feather.arrive(this._featherScale));
        this.beginFill(this._color);
        this.drawCircleWithFeather();
        this.endFill();
        this._timeline.add(this._feather.fadeAway());
    }



    private drawCircleWithFeather(): void {
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
