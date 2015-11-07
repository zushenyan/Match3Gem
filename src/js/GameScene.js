import Board from "./m3g/Board";
import GameConstants from "./GameConstants";
import GameUtils from "./GameUtils";
import GameInput from "./GameInput";
import Animator from "./Animator";

var sampleBoard1 = [
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,8,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1]
];

let sampleBoard2 = [
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1]
];

export default class GameScene{
	constructor(game){
		this.game = game;
		this.board = new Board();
		this.board.newBoardWithSample(sampleBoard1);
		this.gameInput = new GameInput(this.game);
		this.animator = new Animator(this.game);

		this.soundFall = null;
		this.soundMatch = null;
	}

	preload(){
		for(let i = 0, j = i + 1; i < Board.TYPES.length; i++, j++){
			this.game.load.image("gem" + j, "../media/" + j + ".png");
		}
		this.game.load.audio("sound_fall", "../media/gem_fall.wav");
		this.game.load.audio("sound_match", "../media/gem_matched.wav");
	}

	create(){
		this.soundFall = this.game.add.audio("sound_fall");
		this.soundMatch = this.game.add.audio("sound_match");

		this.gameInput.enableInput();

		this._newBoard();
	}

	update(){
		this.animator.update();
		if(this.animator.hasAnimationFinished){
			this.gameInput.update(this._inputCallback.bind(this));
		}
	}

	_inputCallback(oldCoord, newCoord){
		let sourceId = this.board.getElementWithXY(oldCoord.x, oldCoord.y).id;
		let targetId = this.board.getElementWithXY(newCoord.x, newCoord.y).id;
		if(this.board.isNear(oldCoord.x, oldCoord.y, newCoord.x, newCoord.y)){
			this.animator.swapDest(sourceId, targetId);
			let swapResult = this.board.swap(oldCoord.x, oldCoord.y, newCoord.x, newCoord.y);
			if(!swapResult){ this.animator.swapDest(sourceId, targetId); }
			else{
				this._clearMatchedGems(swapResult);
			}
		}
		this.gameInput.enableInput();
	}

	_newBoard(){
		let board = this.board.getBoard();
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				this._addGem(x, y, board[y][x].type, board[y][x].id);
			}
		}
	}

	_addGem(x, y, type, id){
		let startX = x * GameConstants.TILE_SIZE;
		let startY = (y - GameConstants.BOARD_HEIGHT) * GameConstants.TILE_SIZE;
		let destX = startX;
		let destY = y * GameConstants.TILE_SIZE;
		let spriteName = "gem" + type;
		this.animator.addSprite(startX, startY, destX, destY, spriteName, id);
	}

	_clearMatchedGems(swapResult){
		swapResult.forEach((ele) => {
			let sprite = this.animator.getSprite(ele.element.id).sprite;
			this.game.add.tween(sprite).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
		});
		this.board.clearMatched(swapResult);
		this.board.debugPrint(swapResult, Board.PRINT_ID);
	}
}
