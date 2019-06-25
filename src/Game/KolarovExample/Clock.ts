// import ClockEvent from "./ClockEvent";
//
// export default class Clock extends PIXI.utils.EventEmitter {
//
//     static TICK = 'tick'
//
//     private _currTick: number = 0
//
//     constructor() {
//         super()
//
//         setInterval(this.onInterval.bind(this), 1000)
//     }
//
//     private onInterval(): void {
//         this._currTick++
//
//         const event = new ClockEvent()
//         event.tickCount = this._currTick
//
//         this.emit(Clock.TICK, event)
//     }
// }