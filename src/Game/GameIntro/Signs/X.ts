import Sign from "./Sign";
import { TimelineMax, TweenMax } from "gsap";
import Square from "../Board/Square/Square";
export default class X extends Sign {
    private readonly _delay: number;

    constructor(timeline: TimelineMax, square: Square) {
        super(timeline, square);
        this._delay = 0.03;
        
    }

    public drawSign(): void {
      
        this._feather.x = this._square.x;
        this._feather.y = this._square.y - (this._featherView.texture.height * this._featherScale);
        this._timeline.add(this._feather.arrive(this._featherScale));
        this.beginFill(this._color);

        this.drawDiagonalLine(
            true,
            this._square.x,
            this._square.y,
            this._square.x + this._size,
            this._square.y + this._size
        );
        this.drawDiagonalLine(false, this._square.x + this._size, this._square.y, this._square.x, this._square.y - this._size);

        this.endFill();
        this._timeline.add(this._feather.fadeAway());
    }

    private drawDiagonalLine(isDirectionRight: boolean, fromX: number, fromY: number, toX: number, toY: number): void {
        const diffX = Math.abs(fromX - toX);
        const diffY = Math.abs(fromY - toY);
        const rate = diffX > diffY ? diffX : diffY;

        let currentX = fromX;
        let currentY = fromY;

        this._timeline.add(
            this._feather.goTo(currentX, currentY - this._featherView.texture.height * this._featherScale, 1)
        );

        for (let currentRate = 0; currentRate < rate; currentRate++) {
            this._timeline.add(
                TweenMax.delayedCall(this._delay, () => {
                    this.moveTo(currentX, currentY);
                    if (isDirectionRight) {
                        currentX += diffX / rate;
                    } else {
                        currentX -= diffX / rate;
                    }
                    currentY += diffY / rate;
                    this._feather.goTo(currentX, currentY, 0);
                    this.lineTo(currentX, currentY);
                })
            );
        }
    }
}
