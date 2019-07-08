import Sign from "./Sign";
import { TimelineMax, TweenMax } from "gsap";
export default class X extends Sign {

    private readonly _delay: number;
    

    constructor(size: number, timeline: TimelineMax) {
        super(size + size / 6, timeline);
        this._delay = 0.03;
    }

    public drawSign(): void {
        this._feather.x = this.x;
        this._feather.y = this.y - this._featherView.texture.height * this._featherScale;
        this._timeline.add(this._feather.arrive(this._featherScale));
        this.beginFill(this._color);

        this.drawDiagonalLine(true, this.x, this.y, this.x + this._size, this.y + this._size);
        this.drawDiagonalLine(false, this.x + this._size, this.y, this.x, this.y - this._size);
        
        this.endFill();
        this._timeline.add(this._feather.fadeAway());
      
    }

    private drawDiagonalLine(isDirectionRight: boolean, fromX: number, fromY: number, toX: number, toY: number): void {
        const diffX = Math.abs(fromX - toX);
        const diffY = Math.abs(fromY - toY);
        const rate = diffX > diffY ? diffX : diffY;

        let currentX = fromX;
        let currentY = fromY;

        this._timeline.add(this._feather.goTo(currentX, currentY - (this._featherView.texture.height * this._featherScale), 1));

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
