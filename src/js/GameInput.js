import GameUtils from "./GameUtils";
import GameConstants from "./GameConstants";

export default class GameInput {
	constructor(game){
		this._game = game;

		this._capture = false
		this._firstPosition = null;
	}

	enableCapture(){ this._capture = true; }
	disableCapture(){ this._capture = false; }

	update(callback){
		if(!this._capture){ return; }
		if(this._game.input.mousePointer.isDown){
			let newCoord = GameUtils.convertToBoardPosition(this._game.input.x, this._game.input.y, GameConstants.TILE_SIZE);
			if(this._firstPosition === null){
				this._firstPosition = newCoord;
			}
			if(this._firstPosition.x !== newCoord.x || this._firstPosition.y !== newCoord.y){
				callback(this._firstPosition, newCoord);
				this._firstPosition = null;
				this.disableCapture();
			}
		}
	}
}
