import BoardUtils from "./BoardUtils";

export class Board {
	constructor(sampleBoard){
		this._idCounter = 0;
		this._board = null;
	}

	newBoard(width, height){
		this._board = BoardUtils.createBoard(width, height, this._generatorFunction, this._compareFunction);
	}

	findMatchedAll(){ return BoardUtils.findMatchedAll(this._board, this._compareFunction); }
	testSwap(sourceX, sourceY, targetX, targetY){ return BoardUtils.testSwap(this._board, sourceX, sourceY, targetX, targetY, this._compareFunction); }
	swap(sourceX, sourceY, targetX, targetY){ return BoardUtils.swap(this._board, sourceX, sourceY, targetX, targetY, this._compareFunction); }
	findPossibleMatch(){ return BoardUtils.findPossibleMatch(this._board, this._compareFunction); }
	clearMatched(matchedResult){ return BoardUtils.clearMatched(this._board, matchedResult, Board.EMPTY); }
	triggerGravity(){ return BoardUtils.triggerGravity(this._board, Board.EMPTY); }
	fillEmpty(){ return BoardUtils.fillEmpty(this._board, Board.EMPTY, this._generatorFunction); }
	debugPrint(matchedResult){
		BoardUtils.debugPrint(this._board, matchedResult, function(ele){
			return ele.type;
		});
	}

	getBoard(){ return this._board; }

	_generatorFunction(){
		let index = Math.floor(Math.random() * Board.TYPES.length);
		return {
			type: Board.TYPES[index],
			id: this._idCounter++
		};
	}

	_compareFunction(ele1, ele2){
		return ele1.type === ele2.type;
	}

	static get TYPES(){ return [1,2,3,4,5,6,7,8]; }
	static get EMPTY(){ return 0; }
}
