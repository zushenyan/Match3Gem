/*
	In BoardAction class function 
	prefix with "action" will return an Action class,
	prefix with "find" will return an array of simple Point.
	prefix with others will return return whatever type it will be.
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
	    var result = BoardAction.findAllMatchedGemsWithCombo(board, 2, BoardAction.FIND_FILTER_EQUAL);

	    if(result.length === 0){
	        return [];
	    }

	    for(var i = 0; i < result.length; i++){
	        var x = result[i].getX();
	        var y = result[i].getY();
	        var visitedGems = [];

	        findConnectedGems(board, x, y, board.getBoardXY(x, y).getType(), visitedGems);

	        var possibleMatchedGems = [];
	        if(visitedGems.length === 2){
	            var higherTopPoint = null;
	            var lowerBottomPoint = null;
	            var farerLeftPoint = null;
	            var farerRightPoint = null;

	            if(isHorizontalMatched(board, x, y)){
	                farerLeftPoint   = getGemPosition(board, x, y, x - 2, y);
	                farerRightPoint  = getGemPosition(board, x, y, x + 2, y);    
	            }
	            else{
	                higherTopPoint   = getGemPosition(board, x, y, x, y - 2);
	                lowerBottomPoint = getGemPosition(board, x, y, x, y + 2);
	            }
	            
	            var rightBottomPoint = getGemPosition(board, x, y, x + 1, y + 1);
	            var rightTopPoint    = getGemPosition(board, x, y, x + 1, y - 1);
	            var leftBottomPoint  = getGemPosition(board, x, y, x - 1, y + 1);
	            var leftTopPoint     = getGemPosition(board, x, y, x - 1, y - 1);

	            possibleMatchedGems = visitedGems.slice();

	            if(higherTopPoint){         possibleMatchedGems.push(higherTopPoint); }
	            else if(lowerBottomPoint){  possibleMatchedGems.push(lowerBottomPoint); }
	            else if(farerRightPoint){   possibleMatchedGems.push(farerRightPoint); }
	            else if(farerLeftPoint){    possibleMatchedGems.push(farerLeftPoint); }
	            else if(rightBottomPoint){  possibleMatchedGems.push(rightBottomPoint); }
	            else if(rightTopPoint){     possibleMatchedGems.push(rightTopPoint); }
	            else if(leftBottomPoint){   possibleMatchedGems.push(leftBottomPoint); }
	            else if(leftTopPoint){      possibleMatchedGems.push(leftTopPoint); }
	        }

	        if(possibleMatchedGems.length === 3){
	            return possibleMatchedGems;
	        }
	    }

	    return [];

	    function findConnectedGems(board, x, y, gemType, visitedGems){
	        if(!board.isInBound(x, y)){
	            return;
	        }

	        if(board.getBoardXY(x, y).getType() !== gemType){
	            return;
	        }

	        for(var i = 0; i < visitedGems.length; i++){
	            if((x === visitedGems[i].getX()) &&
	                (y === visitedGems[i].getY())){
	                return;
	            }
	        };

	        visitedGems.push(new m3g.Point(x, y));

	        findConnectedGems(board, x + 1, y, gemType, visitedGems);
	        findConnectedGems(board, x - 1, y, gemType, visitedGems);
	        findConnectedGems(board, x, y + 1, gemType, visitedGems);
	        findConnectedGems(board, x, y - 1, gemType, visitedGems);
	    }

	    function isHorizontalMatched(board, x, y){
	        if(!board.isInBound(x + 1, y) || !board.isInBound(x - 1, y)){
	            return false;
	        }
	        if((board.getBoardXY(x, y).getType() === board.getBoardXY(x + 1, y).getType()) ||
	            (board.getBoardXY(x, y).getType() === board.getBoardXY(x - 1, y).getType())){
	            return true;
	        }
	        return false;
	    }

	    function getGemPosition(board, x1, y1, x2, y2){
	        if(!board.isInBound(x2, y2)){
	            return null;
	        }
	        return board.getBoardXY(x2, y2).getType() === board.getBoardXY(x1, y1).getType() ? new m3g.Point(x2, y2) : null;
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
	}

	return BoardAction;
})();