m3g.Board = (function(){
	/*
		instance zone
	*/
	var Board = function(){
		//list member variables
		this._board = null;

		this.initBoard();
		// this.generateBoard();
		this.generateSampleBoard();
	};

	Board.prototype.initBoard = function() {
		this._board = new Array(Board.SIZE);

		for(var i = 0; i < Board.SIZE; i++){
			this._board[i] = new Array(Board.SIZE);
		}

		for(var y = 0; y < this._board.length; y++){
	        for(var x = 0; x < this._board[y].length; x++){
	            this._board[y][x] = new m3g.Gem(0);
	        }
	    }
	};

	Board.prototype.generateBoard = function() {
		generateBoardHelper(this);

	    var result = m3g.BoardAction.findAllMatchedGemsWithCombo(this, 3, m3g.BoardAction.FIND_FILTER_GREATER_EQUAL);
	    while(result.length > 0){
	        generateBoardHelper(this);
	        result = m3g.BoardAction.findAllMatchedGemsWithCombo(this, 3, m3g.BoardAction.FIND_FILTER_GREATER_EQUAL);
	    }

	    function generateBoardHelper(that){
	        for(var y = 0; y < that._board.length; y++){
	            for(var x = 0; x < that._board[y].length; x++){
	                that._board[y][x].setType(m3g.Gem.generateRandomGemType());
	            }
	        }
	    }
	};

	Board.prototype.generateSampleBoard = function() {
		// var tempBoard = [
	 //            [7,1,5,7,1,5,4,5],
	 //            [5,2,3,2,3,6,7,2],
	 //            [7,6,7,5,1,2,2,5],
	 //            [2,6,3,3,6,5,3,3],
	 //            [7,1,2,1,6,4,5,2],
	 //            [7,7,7,4,6,4,6,1],
	 //            [7,2,3,1,6,6,5,6],
	 //            [6,3,2,6,6,1,2,3]
	 //        ];

	    var tempBoard = [
	            [7,1,2,7,4,5,4,5],
	            [5,5,4,1,3,6,7,1],
	            [6,2,5,5,1,2,2,5],
	            [5,7,3,3,6,1,3,3],
	            [4,1,2,1,5,4,5,2],
	            [4,2,6,4,2,4,6,1],
	            [6,7,7,3,6,1,5,6],
	            [6,3,2,6,6,1,2,3]
	        ];

	    // var tempBoard = [
	    //         [0,0,0,0,0,0,0,0],
	    //         [0,0,0,0,0,0,0,0],
	    //         [0,6,0,6,6,0,0,0],
	    //         [0,0,0,0,0,0,0,0],
	    //         [0,0,0,0,0,0,0,0],
	    //         [0,0,0,0,0,0,0,0],
	    //         [0,0,0,0,0,0,0,0],
	    //         [0,0,0,0,0,0,0,0],
	    //     ];

	    for(var y = 0; y < this._board.length; y++){
	        for(var x = 0; x < this._board[y].length; x++){
	            this._board[y][x].setType(tempBoard[y][x]);
	        }
	    }
	};

	Board.prototype.applyAction = function(action) {
		action.applyChanges(this);
	};

	Board.prototype.toStringBoard = function() {
		var str = "";
	    for(var y = 0; y < this._board.length; y++){
	        for(var x = 0; x < this._board[y].length; x++){
	            str += this._board[y][x].getType() + " ";
	        }
	        str += "\n";
	    }
	    return str;
	};

	Board.prototype.getBoard = function() {
		return this._board;
	};

	Board.prototype.getBoardXY = function(x, y) {
		if(!this.isInBound(x , y)){
			throw new Error(x + " " + y + " is out of bound");
		}

		return this.getBoard()[y][x];
	};

	Board.prototype.isInBound = function(x, y) {
		if((x < this._board[0].length && y < this._board.length) &&
	        (x >= 0 && y >= 0)){
	        return true;
	    }
	    return false;
	};

	/*
		static zone
	*/

	Board.SIZE = 8;

	return Board;
})();