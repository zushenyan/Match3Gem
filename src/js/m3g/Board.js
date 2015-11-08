import BoardUtils from "./BoardUtils";
import Matrix from "./Matrix";

export default class Board {
	constructor(){
		this._idCounter = 0;
		this._board = null;
	}

	newBoard(width, height){
		this.resetIdCounter();
		this._board = BoardUtils.createBoard(width, height,
			this._generatorFunction.bind(this),
			this._compareFunction,
			this._isDuplicateFunction,
			this.resetIdCounter.bind(this));
	}

	newBoardWithSample(sampleBoard){
		this.resetIdCounter();
		let board = [];
		for(let y = 0, row = []; y < sampleBoard.length; y++, row = []){
			for(let x = 0; x < sampleBoard[y].length; x++){
				row.push({type: sampleBoard[y][x], id: this._idCounter++});
			}
			board.push(row);
		}
		this._board = board;
	}

	findMatchedAll(){
		return BoardUtils.findMatchedAll(this._board, this._compareFunction, this._isDuplicateFunction);
	}

	testSwap(sourceX, sourceY, targetX, targetY){
		return BoardUtils.testSwap(this._board, sourceX, sourceY, targetX, targetY, this._compareFunction, this._isDuplicateFunction);
	}

	isNear(sourceX, sourceY, targetX, targetY){
		return BoardUtils.isNear(sourceX, sourceY, targetX, targetY);
	}

	swap(sourceX, sourceY, targetX, targetY){
		return BoardUtils.swap(this._board, sourceX, sourceY, targetX, targetY, this._compareFunction, this._isDuplicateFunction);
	}

	findPossibleMatch(){
		return BoardUtils.findPossibleMatch(this._board, this._compareFunction, this._isDuplicateFunction);
	}

	clearMatched(matchedResult){
		return BoardUtils.clearMatched(this._board, matchedResult, this._toEmptyFunction);
	}

	triggerGravity(){
		return BoardUtils.triggerGravity(this._board, this._isEmptyFunction);
	}

	fillEmpty(){
		return BoardUtils.fillEmpty(this._board, this._isEmptyFunction, this._generatorFunction.bind(this));
	}

	debugPrint(matchedResult, printWhat){
		BoardUtils.debugPrint(this._board, matchedResult, printWhat);
	}

	getBoard(){ return this._board; }
	getIdCounter(){ return this.idCounter; }

	getElementWithXY(x, y){
		if(!Matrix.isInBound(this.getBoard(), x, y)){ return null; }
		let board = this.getBoard();
		return board[y][x];
	}

	getElementWithId(id){
		let board = this.getBoard();
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				if(board[y][x].id === id){
					return {
						x: x,
						y: y,
						element: board[y][x]
					}
				}
			}
		}
		return null;
	}

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

	_isDuplicateFunction(ele1, ele2){
		return (ele1.type === ele2.type && ele1.id === ele2.id);
	}

	_toEmptyFunction(ele){
		return {type: Board.EMPTY, id: -1};
	}

	_isEmptyFunction(ele){
		return ele.type === Board.EMPTY;
	}

	resetIdCounter(){
		this._idCounter = 0;
	}

	static PRINT_TYPE(ele){ return ele.type; }
	static PRINT_ID(ele){ return ele.id; }
	static get TYPES(){ return [1,2,3,4,5,6,7,8]; }
	static get EMPTY(){ return 0; }
}
