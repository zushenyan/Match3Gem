import BoardUtils from "./BoardUtils";
import GameConstants from "./GameConstants";
import "babel-polyfill";

export default class GameManager{
	constructor(board){
		this._board = null;
		this._timer = GameConstants.TIME_LIMIT;

		this.start(board);
	}

	start(board){
		this.newBoard(board);
	}

	newBoard(board){
		return this._board = board ? board : BoardUtils.createBoard(GameConstants.SIZE_WIDTH, GameConstants.SIZE_HEIGHT, GameConstants.TYPES);
	}

	hint(){
		return BoardUtils.findPossibleMatch(this._board);
	}

	*swap(sourceX, sourceY, targetX, targetY){
		let matchedList = BoardUtils.swap(this._board, sourceX, sourceY, targetX, targetY);
		if(!matchedList){ return; }
		do{
			yield matchedList;
			yield BoardUtils.clearMatched(this._board, matchedList, GameConstants.EMPTY);
			yield BoardUtils.triggerGravity(this._board, GameConstants.EMPTY);
			yield BoardUtils.fillEmpty(this._board, GameConstants.TYPES, GameConstants.EMPTY);
			matchedList = BoardUtils.findMatchedAll(this._board);
		}while(matchedList.length >= 3);

		if(BoardUtils.findPossibleMatch(this._board).length < 3){
			return this.newBoard();
		}
	}

	getBoard(){
		return this._board;
	}
}
