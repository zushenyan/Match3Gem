/*
	registered listener should implement 3 functions:

	onRemovedGems(removedGems)
	onGemsFall(fallingGems)
	onFilledGems(filledLocation)

*/
function BoardController(listener){
	this._board = null;
	this._listener = null;

	this.init(listener);
}

BoardController.prototype.constructor = BoardController;

BoardController.prototype.init = function(listener){
	this._board = new Board();
	this._listener = listener;
};

BoardController.prototype.drySwapGem = function(x1, y1, x2, y2){
	var result = this._board.isValidSwap(x1, y1, x2, y2);
	return result;
};

BoardController.prototype.swapGem = function(x1, y1, x2, y2){
	var result = this._board.swapGem(x1, y1, x2, y2);

	if(!result){
		return;
	}

	var r = this._board.findAllMatchedGems();
	// while(r.length > 0){
		this._board.removeMatchedGems(r);
		this._listener.onRemovedGems(r);

		// var r2 = this._board.makeGemsFall();
		// this._listener.onGemsFall(r2);

		// var r3 = this._board.fillEmptyGems();
		// this._listener.onFilledGems(r3);

		// r = this._board.findAllMatchedGems();
	// }
};

BoardController.prototype.getBoard = function(){
	return this._board.getBoard();
};