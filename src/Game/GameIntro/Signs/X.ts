import Sign from "./Sign";
import { TweenMax, TimelineMax } from "gsap";
import FeatherController from "../../Feather/FeatherController";
import FeatherView from "../../Feather/FeatherView";
import FeatherModel from "../../Feather/FeatherModel";
export default class X extends Sign {
    private readonly _delay: number;
    

    constructor(size: number,  timeline: TimelineMax) {
        super(size + size/6, timeline);
        this._delay = 0.03;
        const featherView = new FeatherView();
        featherView.width = 0;
        featherView.height = 0;
        const featherModel = new FeatherModel(featherView);
        this._feather = new FeatherController(featherView, featherModel);
       
    }

    public drawSign(): void {
        this._timeline.add(this._feather.arrive(0.4));
        this.beginFill(this._color);
        this.drawDiagonalLine(true, this.x, this.y, this.x + this._size, this.y + this._size);
        this.drawDiagonalLine(false, this.x + this._size, this.y, this.x, this.y - this._size);
        this.endFill();
    }

    private drawDiagonalLine(isDirectionRight: boolean, fromX: number, fromY: number, toX: number, toY: number): void {
        const diffX = Math.abs(fromX - toX);
        const diffY = Math.abs(fromY - toY);
        const rate = diffX > diffY ? diffX : diffY;
        let currentX = fromX;
        let currentY = fromY;
        this._timeline.add(this._feather.goTo(currentX,currentY,1));
        for (let currentRate = 0; currentRate < rate; currentRate++) {
            this._timeline.add(
                TweenMax.delayedCall(this._delay, () => {
                    this.beginFill(this._color);
                    this.moveTo(currentX, currentY);
                    if (isDirectionRight) {
                        currentX += diffX / rate;
                    } else {
                        currentX -= diffX / rate;
                    }
                    currentY += diffY / rate;
                    this._feather.goTo(currentX + 2 * this._lineSize, currentY + 2 * this._lineSize, 0);
                    this.lineTo(currentX, currentY);
                    this.endFill();
                })
            );
        }
    }
}
