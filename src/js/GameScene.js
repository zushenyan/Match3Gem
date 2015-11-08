import Board from "./m3g/Board";
import GameConstants from "./GameConstants";
import GameUtils from "./GameUtils";
import GameInput from "./GameInput";
import AnimationManager from "./AnimationManager";
import TaskManager from "./TaskManager";

// var sampleBoard1 = [
// 	[1,2,3,4,5,6,7,8],
// 	[8,7,6,5,4,3,2,1],
// 	[1,2,3,4,5,6,7,8],
// 	[8,7,6,5,4,3,2,1],
// 	[1,8,3,4,5,6,7,8],
// 	[8,7,6,5,4,3,2,1],
// 	[1,2,3,4,5,6,7,8],
// 	[8,7,6,5,4,3,2,1]
// ];
//
// var sampleBoard2 = [
// 	[8,2,3,4,5,6,7,8],
// 	[8,7,6,2,1,3,2,1],
// 	[6,2,3,4,5,6,7,8],
// 	[8,7,6,5,1,3,2,1],
// 	[1,2,3,4,2,6,7,8],
// 	[8,7,6,5,1,3,2,1],
// 	[1,2,3,4,2,6,7,8],
// 	[8,7,6,5,4,3,2,1]
// ];

export default class GameScene{
	constructor(game){
		this.game = game;
		this.board = new Board();
		this.gameInput = new GameInput(this.game, this._inputCallback.bind(this));
		this.animationManager = new AnimationManager(this.game);
		this.taskManager = new TaskManager();

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

		this._newBoard();
	}

	update(){
		if(!this.animationManager.isTweening()){ this.taskManager.runTasks() };
		this.gameInput.listen();
	}

	_inputCallback(oldCoord, newCoord){
		this._swap(oldCoord, newCoord);
	}

	_swap(oldCoord, newCoord){
		this.taskManager.addTask(() => {
			this.gameInput.disableInput();
		});
		this.taskManager.addTask(() => {
			let sourceId = this.board.getElementWithXY(oldCoord.x, oldCoord.y).id;
			let targetId = this.board.getElementWithXY(newCoord.x, newCoord.y).id;
			let isValid = this.board.swap(oldCoord.x, oldCoord.y, newCoord.x, newCoord.y);
			let isNear = this.board.isNear(oldCoord.x, oldCoord.y, newCoord.x, newCoord.y);
			if(isValid){
				this._validSwap(sourceId, targetId);
				this._checkMatched();
			}
			else if(!isValid && isNear){
				this._invalidSwap(sourceId, targetId);
			}
			else {
				// to solve a problem that when player swipes his mouse through a corner of a gem, 
				// which will make left mouse button remain disable state.
				this.taskManager.addTask(() => {
					this.gameInput.enableInput();
				});
			}
		});
	}

	_validSwap(sourceId, targetId){
		this.taskManager.addTask(() => {
			this.animationManager.spriteSwap(sourceId, targetId);
		});
	}

	_invalidSwap(sourceId, targetId){
		// swap twice to play swap back and forth animation.
		this.taskManager.addTask(() => {
			this.animationManager.spriteSwap(sourceId, targetId);
		});
		this.taskManager.addTask(() => {
			this.animationManager.spriteSwap(sourceId, targetId);
		});
		this.taskManager.addTask(() => {
			this.gameInput.enableInput();
		});
	}

	_checkMatched(){
		this.taskManager.addTask(() => {
			let matchedResults = this.board.findMatchedAll();
			let hasPossibleMatch = this.board.findPossibleMatch();
			if(matchedResults.length > 0){
				this._clearMatchedGems(matchedResults);
				this._makeGemsFall();
				this._addGems();
				this.taskManager.addTask(() => { this._checkMatched(); });
			}
			else if(hasPossibleMatch.length > 0){
				this.taskManager.addTask(() => { this.gameInput.enableInput(); });
			}
			else {
				this._renewBoardAnimations();
				this._newBoard();
			}
		});
	}

	_clearMatchedGems(matchedResults){
		this.taskManager.addTask(() => {
			matchedResults.forEach((ele) => {
				this.animationManager.spriteFadeOut(ele.element.id, 250);
			});
		});
		// clear model data after animation ends.
		this.taskManager.addTask(() => {
			this.board.clearMatched(matchedResults);
		});
		// clear sprites
		this.taskManager.addTask(() => {
			matchedResults.forEach((ele) => {
				this.animationManager.removeSprite(ele.element.id);
			});
		});
	}

	_makeGemsFall(){
		let results;
		this.taskManager.addTask(() => {
			results = this.board.triggerGravity();
		});
		this.taskManager.addTask(() => {
			results.forEach((ele) => {
				let destY = ele.toY * GameConstants.TILE_SIZE;
				this.animationManager.spriteFallTo(destY, ele.element.id, 225);
			});
		});
	}

	_addGems(){
		let results;
		this.taskManager.addTask(() => {
			results = this.board.fillEmpty();
		});
		this.taskManager.addTask(() => {
			results.forEach((ele) => {
				this._createGem(ele.x, ele.y, ele.element.type, ele.element.id);
			});
		});
	}

	_renewBoardAnimations(){
		// add "no more movement" text.
		this.taskManager.addTask(() => {
			this.animationManager.addTextSprite(this.game.world.centerX, this.game.world.centerY, "renew_board", "No\nMore\nMove");
			this.animationManager.spriteFallFrom(-100, "renew_board", 100);
		});
		// fade out all sprites.
		this.taskManager.addTask(() => {
			let board = this.board.getBoard();
			for(let y = 0; y < board.length; y++){
				for(let x = 0; x < board[y].length; x++){
					this.animationManager.spriteFadeOut(board[y][x].id, 2500);
				}
			}
			this.animationManager.spriteFadeOut("renew_board", 2500);
		});
		// remove all sprites
		this.taskManager.addTask(() => {
			let board = this.board.getBoard();
			for(let y = 0; y < board.length; y++){
				for(let x = 0; x < board[y].length; x++){
					this.animationManager.removeSprite(board[y][x].id);
				}
			}
			this.animationManager.removeSprite("renew_board");
		});
	}

	_newBoard(){
		// generate board and make gems fall
		this.taskManager.addTask(() => {
			// this.board.newBoardWithSample(sampleBoard2);
			this.board.newBoard(8,8);
			let board = this.board.getBoard();
			for(let y = 0; y < board.length; y++){
				for(let x = 0; x < board[y].length; x++){
					this._createGem(x, y, board[y][x].type, board[y][x].id);
				}
			}
		});
		// after the previous one is done, allow mouse input.
		this.taskManager.addTask(() => {
			this.gameInput.enableInput();
		});
	}

	_createGem(x, y, type, id){
		let startX = x * GameConstants.TILE_SIZE;
		let startY = (y - GameConstants.BOARD_HEIGHT) * GameConstants.TILE_SIZE;
		let destX = startX;
		let destY = y * GameConstants.TILE_SIZE;
		let spriteName = "gem" + type;
		this.animationManager.addSprite(destX, destY, spriteName, id);
		this.animationManager.spriteFallFrom(startY, id, 225);
	}
}
