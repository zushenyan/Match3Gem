import GameUtils from "./GameUtils";
import GameConstants from "./GameConstants";

export default class GameInput {
	constructor(game, callback){
		this._game = game;

		this._callback = callback;
		this._capture = false
		this._firstPosition = null;
	}

	enableInput(){ this._capture = true; }
	disableInput(){ this._capture = false; }

	listen(){
		if(!this._capture){ return; }
		if(this._game.input.mousePointer.isDown){
			let newCoord = GameUtils.convertToBoardPosition(this._game.input.x, this._game.input.y, GameConstants.TILE_SIZE);
			if(this._firstPosition === null){
				this._firstPosition = newCoord;
			}
			if(this._firstPosition.x !== newCoord.x || this._firstPosition.y !== newCoord.y){
				this._callback(this._firstPosition, newCoord);
				this._firstPosition = null;
			}
		}
		else{
			this._firstPosition = null;
		}
	}
}
