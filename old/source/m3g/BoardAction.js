/*
	In BoardAction class function 
	prefix with "action" will return an Action class,
	prefix with "find" will return an array of simple Point.
	prefix with others will return whatever type it wants to but will not be action.
*/
m3g.BoardAction = (function(){
	/*
		instance zone
	*/
	var BoardAction = function(){};

	/*
		static zone
	*/
	BoardAction.FIND_FILTER_EQUAL = function(gemList, combo){ return gemList.length === combo ? gemList : []; };
	BoardAction.FIND_FILTER_GREATER = function(gemList, combo){ return gemList.length > combo ? gemList : []; };
	BoardAction.FIND_FILTER_GREATER_EQUAL = function(gemList, combo){ return gemList.length >= combo ? gemList : []; };

	BoardAction.findMatchedGemsWithCombo = function(board, x, y, combo, filter){
		if(board.getBoardXY(x, y).getType() === m3g.Gem.GEM_TYPE_EMPTY){
			return [];
		}

	    combo = combo || 3;
	    filter = filter || BoardAction.FIND_FILTER_GREATER_EQUAL;

	    var matchedUp = [];
	    var matchedDown = [];
	    var matchedRight = [];
	    var matchedLeft = [];

	    findDirection(x, y, board.getBoardXY(x, y).getType(), matchedUp, 1, board);
	    findDirection(x, y, board.getBoardXY(x, y).getType(), matchedRight, 2, board);
	    findDirection(x, y, board.getBoardXY(x, y).getType(), matchedDown, 3, board);
	    findDirection(x, y, board.getBoardXY(x, y).getType(), matchedLeft, 4, board);

	    var horizontalMatched = matchedLeft.concat(matchedRight);
	    var verticalMatched = matchedUp.concat(matchedDown);

	    removeDuplicate(horizontalMatched);
	    removeDuplicate(verticalMatched);

	    horizontalMatched = filter(horizontalMatched, combo);
	    verticalMatched = filter(verticalMatched, combo);

	    var matchedGems = horizontalMatched.concat(verticalMatched);

	    removeDuplicate(matchedGems);

	    return matchedGems;

	    /* 
	        direction
	        1 - up
	        2 - right
	        3 - down
	        4 - left
	    */
	    function findDirection(x, y, gemType, matchedGems, direction, board){
	        if(board.isInBound(x, y) && board.getBoardXY(x, y).getType() === gemType){
	            var p = new m3g.Point(x, y);
	            matchedGems.push(p);

	            var newX = x;
	            var newY = y;

	            switch(direction){
	                case 1:
	                    newY--;
	                break;

	                case 2:
	                    newX++;
	                break;

	                case 3:
	                    newY++;
	                break;

	                case 4:
	                    newX--;
	                break;
	            }
	        
	            findDirection(newX, newY, gemType, matchedGems, direction, board);
	        }
	    }

	    function removeDuplicate(gemList){
	        for(var i = 0; i < gemList.length; i++){
	            var count = 0;
	            for(var i2 = i + 1; i2 < gemList.length; i2++){
	                if((gemList[i].getX() === gemList[i2].getX()) &&
	                    (gemList[i].getY() === gemList[i2].getY())){
	                    count++;
	                }
	            }
	            if(count > 0){
	                gemList.splice(i, 1);
	            }
	        }
	    }
	};

	BoardAction.findAllMatchedGemsWithCombo = function(board, combo, filter){
	    var allMatchedGems = [];
	    for(var y = 0; y < m3g.Board.SIZE; y++){
	        for(var x = 0; x < m3g.Board.SIZE; x++){
	            var result = BoardAction.findMatchedGemsWithCombo(board, x, y, combo, filter);
	            if(result.length > 0){
	                //dont push same gem twice
	                for(var i1 = 0; i1 < result.length; i1++){
	                    var isUnique = true;
	                    for(var i2 = 0; i2 < allMatchedGems.length; i2++){
	                        if((result[i1].getX() === allMatchedGems[i2].getX()) && 
	                        	(result[i1].getY() === allMatchedGems[i2].getY())
	                        	){
	                            isUnique = false;
	                        }
	                    }

	                    if(isUnique){
	                        allMatchedGems.push(result[i1]);
	                    }
	                }
	            }
	        }
	    }
	    return allMatchedGems;
	};

	BoardAction.actionRemoveGemsWithList = function(gems){
	    var changes = [];
	    for(var i = 0; i < gems.length; i++){
	        var x = gems[i].getX();
	        var y = gems[i].getY();
	        var change = new m3g.Change(
	        		new m3g.Point(x, y),
	        		new m3g.Point(x, y)
	        		);
	        changes.push(change);
	    }
	    return new m3g.Action(m3g.ActionProcessor.remove, changes);
	};

	BoardAction.actionMakeGemsFall = function(board){
	    var changes = [];

	    //clone board
	    var board2 = BoardAction.cloneBoard(board);

	    //start with board2
	    for(var x = 0; x < board2.length; x++){
	        var shiftCount = 0;
	        for(var y = board2.length - 1; y > -1; y--){
	            if(board2[y][x].getType() === m3g.Gem.GEM_TYPE_EMPTY){
	                shiftCount++;
	            }
	            else if(shiftCount > 0){
	            	var change = new m3g.Change(
	            			new m3g.Point(x, y),
	            			new m3g.Point(x, y + shiftCount)
	            			);
	            	changes.push(change);
	                swap(x,y,x,y + shiftCount, board2);
	            }
	        }
	    }

	    return new m3g.Action(m3g.ActionProcessor.fall, changes);

	    function swap(x1, y1, x2, y2, board){
	        var temp = board[y2][x2];
	        board[y2][x2] = board[y1][x1];
	        board[y1][x1] = temp;
	    }
	};

	BoardAction.actionFillEmptyGems = function(board){
	    var changes = [];
	    for(var y = 0; y < m3g.Board.SIZE; y++){
	        for(var x = 0; x < m3g.Board.SIZE; x++){
	            if(board.getBoardXY(x, y).getType() === m3g.Gem.GEM_TYPE_EMPTY){
	            	var change = new m3g.Change(
	            			new m3g.Point(x, y),
	            			new m3g.Point(x, y)
	            			);
	            	changes.push(change);
	            }
	        }
	    }
	    return new m3g.Action(m3g.ActionProcessor.generateRandomGemType, changes);
	};

	BoardAction.actionSwapGems = function(board, x1, y1, x2, y2){
	    if(!(board.isInBound(x1, y1) && board.isInBound(x2, y2))){
	        return new m3g.Action();
	    }
	    else if(!BoardAction.isValidActionSwapGems(x1, y1, x2 ,y2)){
	        return new m3g.Action();
	    }

	    swap(x1, y1, x2, y2, board);
	    var result = BoardAction.findAllMatchedGemsWithCombo(board, 3, BoardAction.FIND_FILTER_GREATER_EQUAL);
	    swap(x1, y1, x2, y2, board);

	    var changes = [];
	    if(result.length > 0){
	    	var change = new m3g.Change(
	    			new m3g.Point(x1, y1), 
	        		new m3g.Point(x2, y2)
	    			);
	        changes.push(change);

	        return new m3g.Action(m3g.ActionProcessor.swap, changes);
	    }

	    return new m3g.Action();

	    function swap(x1, y1, x2, y2, b){
	    	var board = b.getBoard();

	        var tempType = board[y2][x2].getType();
	        board[y2][x2].setType(board[y1][x1].getType());
	        board[y1][x1].setType(tempType);
	    }
	};

	BoardAction.isValidActionSwapGems = function(x1, y1, x2, y2){
	    if((x1 + 1 === x2 && y1 === y2) ||
	        (x1 - 1 === x2 && y1 === y2) ||
	        (x1 === x2 && y1 + 1 === y2) ||
	        (x1 === x2 && y1 - 1 === y2)){
	        return true;
	    }
	    return false;
	};

	BoardAction.hasNoMoreMove = function(board){
	    return BoardAction.hint(board).length >= 3 ? false : true;
	};

	BoardAction.hint = function(board){
		var results = findHintWithMatrix(3, 2, board);
		if(results){return results; }

		results = findHintWithMatrix(2, 3, board);
		if(results){return results; }

		results = findHintWithMatrix(4, 1, board);
		if(results){return results; }

		results = findHintWithMatrix(1, 4, board);
		if(results){return results; }

		return [];

		function findHintWithMatrix(width, height, board){
			for(var y = 0; y <= m3g.Board.SIZE - height; y++){
				for(var x = 0; x <= m3g.Board.SIZE - width; x++){
					var matrix = getMatrix(x, y, width, height, board);
					var points = comparePattern(matrix);
					if(points){
						var results = [];
						for(var i = 0; i < points.length; i++){
							var p = new m3g.Point(x + points[i].getX(), y + points[i].getY());
							results.push(p);
						}
						return results;
					}
				}
			}
			return null;
		}

		function getMatrix(startX, startY, width, height, board){
			var endX = startX + width - 1;
			var endY = startY + height - 1;

			if(!board.isInBound(startX, startY) && !board.isInBound(endX, endY)){
				throw new Error(startX + " " + startY + ", " + endX + " " + endY + " is not in bound!");
			}

			var matrix = new Array(height);
			for(var i = 0; i < matrix.length; i++){
				matrix[i] = new Array(width);
			}

			for(var y = startY; y <= endY; y++){
				for(var x = startX; x <= endX; x++){
					matrix[y - startY][x - startX] = board.getBoardXY(x, y).getType();
				}
			}

			return matrix;
		}

		/*
			will return shift point if there is a match.
			will return null if there matches none.
		*/
		function comparePattern(matrix){
			// [row] x [column] matrix
			// if it's a 2 x 3 matrix
			if(matrix.length === 2 && matrix[0].length === 3){
				/*
					pattern like this
					1 1 0	0 0 1	0 1 1	1 0 0 	1 0 1	0 1 0
					0 0 1	1 1 0	1 0 0	0 1 1	0 1 0	1 0 1
				*/
				if(		compareWithNoEmpty(0, 0, 1, 0, 2, 1, matrix)){ return [new m3g.Point(0,0), new m3g.Point(1,0), new m3g.Point(2, 1)]; }
				else if(compareWithNoEmpty(0, 1, 1, 1, 2, 0, matrix)){ return [new m3g.Point(0,1), new m3g.Point(1,1), new m3g.Point(2, 0)]; }
				else if(compareWithNoEmpty(0, 1, 1, 0, 2, 0, matrix)){ return [new m3g.Point(0,1), new m3g.Point(1,0), new m3g.Point(2, 0)]; }
				else if(compareWithNoEmpty(0, 0, 1, 1, 2, 1, matrix)){ return [new m3g.Point(0,0), new m3g.Point(1,1), new m3g.Point(2, 1)]; }
				else if(compareWithNoEmpty(0, 0, 1, 1, 2, 0, matrix)){ return [new m3g.Point(0,0), new m3g.Point(1,1), new m3g.Point(2, 0)]; }
				else if(compareWithNoEmpty(0, 1, 1, 0, 2, 1, matrix)){ return [new m3g.Point(0,1), new m3g.Point(1,0), new m3g.Point(2, 1)]; }
			}
			// if it's a 3 x 2 matrix
			else if(matrix.length === 3 && matrix[0].length === 2){
				/*
					pattern like this
					0 1		1 0		1 0		0 1		1 0		0 1
					0 1		1 0 	0 1		1 0		0 1		1 0
					1 0		0 1		0 1		1 0		1 0		0 1
				*/
				if(		compareWithNoEmpty(1, 0, 1, 1, 0, 2, matrix)){ return [new m3g.Point(1,0), new m3g.Point(1,1), new m3g.Point(0, 2)]; }
				else if(compareWithNoEmpty(0, 0, 0, 1, 1, 2, matrix)){ return [new m3g.Point(0,0), new m3g.Point(0,1), new m3g.Point(1, 2)]; }
				else if(compareWithNoEmpty(0, 0, 1, 1, 1, 2, matrix)){ return [new m3g.Point(0,0), new m3g.Point(1,1), new m3g.Point(1, 2)]; }
				else if(compareWithNoEmpty(1, 0, 0, 1, 0, 2, matrix)){ return [new m3g.Point(1,0), new m3g.Point(0,1), new m3g.Point(0, 2)]; }
				else if(compareWithNoEmpty(0, 0, 1, 1, 0, 2, matrix)){ return [new m3g.Point(0,0), new m3g.Point(1,1), new m3g.Point(0, 2)]; }
				else if(compareWithNoEmpty(1, 0, 0, 1, 1, 2, matrix)){ return [new m3g.Point(1,0), new m3g.Point(0,1), new m3g.Point(1, 2)]; }
			}
			// if it's a 1 x 4 matrix
			else if(matrix.length === 1 && matrix[0].length === 4){
				/*
					pattern like this
					1 1 0 1		1 0 1 1
				*/
				if(		compareWithNoEmpty(0, 0, 1, 0, 3, 0, matrix)){ return [new m3g.Point(0,0), new m3g.Point(1,0), new m3g.Point(3, 0)];}
				else if(compareWithNoEmpty(0, 0, 2, 0, 3, 0, matrix)){ return [new m3g.Point(0,0), new m3g.Point(2,0), new m3g.Point(3, 0)];}
			}
			// if it's a 4 x 1 matrix
			else if(matrix.length === 4 && matrix[0].length === 1){
				/*
					pattern like this
					1	1
					1	0
					0	1
					1	1
				*/
				if(		compareWithNoEmpty(0, 0, 0, 1, 0, 3, matrix)){ return [new m3g.Point(0,0), new m3g.Point(0,1), new m3g.Point(0, 3)];}
				else if(compareWithNoEmpty(0, 0, 0, 2, 0, 3, matrix)){ return [new m3g.Point(0,0), new m3g.Point(0,2), new m3g.Point(0, 3)];}
			}

			return null;

			function compareWithNoEmpty(x1, y1, x2, y2, x3, y3, matrix){
				if(matrix[y1][x1] === m3g.Gem.GEM_TYPE_EMPTY){return false; }
				return matrix[y1][x1] === matrix[y2][x2] && matrix[y1][x1] === matrix[y3][x3];
			}
		}
	};

	BoardAction.cloneBoard = function(b){
		var board = b.getBoard();
		var board2 = new Array(board.length);

	    for(var i = 0; i < board2.length; i++){
	    	board2[i] = new Array(board[i].length);
	    }

	    for(var y = 0; y < board2.length; y++){
	    	for(var x = 0; x < board2[y].length; x++){
	    		board2[y][x] = new m3g.Gem(board[y][x].getType());
	    	}
	    }

	    return board2;
	};

	return BoardAction;
})();