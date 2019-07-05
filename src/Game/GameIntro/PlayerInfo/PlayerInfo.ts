import * as PIXI from "pixi.js";
import Sign from "../Signs/Sign";
import FeatherView from "../../Feather/FeatherView";
import FeatherModel from "../../Feather/FeatherModel";
import FeatherController from "../../Feather/FeatherController";

export default class PlayerInfo extends PIXI.Container {
    private _name: PIXI.BitmapText;
    private _sign: Sign;

    constructor(sign: Sign) {
        super();
        const loader = new PIXI.Loader();
        loader.load(this.onAssetsLoaded.bind(this));
       
       
        this._sign = sign;
        this._sign.x = this._name.x - 20;
        this._sign.y = this._name.y + 8;
       
        this.addChild(this._sign);
        this.addChild(this._name);
      
    }

    get name() {
        return this.name;
    }

    set name(name: string) {
        this._name.text = name;
    }

    onAssetsLoaded() {
        this._name = new PIXI.BitmapText("", {
            font: {
                name: "Desyrel",
                size: 50,
            },
        });
    }

    public drawSign() {
       this._sign.drawSign();
    }


   
}
