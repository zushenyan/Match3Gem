function Board(){
    this._board = null;

    this.init();
    // this.generateBoard();
    this.generateSampleBoard();
};

Board.prototype.constructor = Board;

/*
    static zone
*/

Board.BOARD_SIZE = 8;

Board.findMatchedGemsWithLocation = function(b, x, y){
    var board = b.getBoard();

    if(board[y][x].getType() === Gem.GEMS_EMPTY){
        return [];
    }

    var matchedUp = [];
    var matchedDown = [];
    var matchedRight = [];
    var matchedLeft = [];

    findDirection(x, y, board[y][x].getType(), matchedUp, 1, board);
    findDirection(x, y, board[y][x].getType(), matchedRight, 2, board);
    findDirection(x, y, board[y][x].getType(), matchedDown, 3, board);
    findDirection(x, y, board[y][x].getType(), matchedLeft, 4, board);

    matchedUp = matchedUp.length < 3 ? [] : matchedUp;
    matchedDown = matchedDown.length < 3 ? [] : matchedDown;
    matchedRight = matchedRight.length < 3 ? [] : matchedRight;
    matchedLeft = matchedLeft.length < 3 ? [] : matchedLeft;

    var matchedGems = matchedUp.concat(matchedDown).concat(matchedRight).concat(matchedLeft);

    return matchedGems;

    /* 
        direction
        1 - up
        2 - right
        3 - down
        4 - left
    */
    function findDirection(x, y, gemType, matchedGems, direction, board){
        if(Board.isInBound(x, y) && board[y][x].getType() === gemType){
            var p = {x:x, y:y};
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
};

Board.findAllMatchedGems = function(b){
    var board = b.getBoard();
    var allMatchedGems = [];
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            var result = Board.findMatchedGemsWithLocation(b, x, y);
            if(result.length > 0){
                //dont push same gem twice
                for(var i1 = 0; i1 < result.length; i1++){
                    var isUnique = true;
                    for(var i2 = 0; i2 < allMatchedGems.length; i2++){
                        if(result[i1].x === allMatchedGems[i2].x && result[i1].y === allMatchedGems[i2].y){
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

Board.removeGemsWithList = function(b, gems){
    var board = b.getBoard();
    for(var i = 0; i < gems.length; i++){
        var x = gems[i].x;
        var y = gems[i].y;
        board[y][x].setType(Gem.GEMS_EMPTY);
    }
};

Board.makeGemsFall = function(b){
    var board = b.getBoard();
    var fallingGems = [];

    for(var x = 0; x < board.length; x++){
        var shiftCount = 0;
        for(var y = board.length - 1; y > -1; y--){
            if(board[y][x].getType() === Gem.GEMS_EMPTY){
                shiftCount++;
            }
            else if(shiftCount > 0){
                fallingGems.push({x:x, y:y, toX:x, toY:y + shiftCount});
                swap(x,y,x,y + shiftCount, board);
            }
        }
    }

    return fallingGems;

    function swap(x1, y1, x2, y2, board){
        var temp = board[y2][x2];
        board[y2][x2] = board[y1][x1];
        board[y1][x1] = temp;
    }
};

Board.fillEmptyGems = function(b){
    var board = b.getBoard();
    var filledGems = [];

    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            if(board[y][x].getType() === Gem.GEMS_EMPTY){
                board[y][x] = Gem.createRandomGem();
                filledGems.push({x:x, y:y, type:board[y][x].getType()});
            }
        }
    }

    return filledGems;
};

Board.isInBound = function(x, y){
    if((x < Board.BOARD_SIZE && y < Board.BOARD_SIZE) &&
        (x >= 0 && y >= 0)){
        return true;
    }
    return false;
};

Board.actionSwapGems = function(b, x1, y1, x2, y2){
    var board = b.getBoard();
    var action = new Action();

    if(!(Board.isInBound(x1, y1) && Board.isInBound(x2, y2))){
        return action;
    }
    else if(!Board.isValidActionSwapGems(x1, y1, x2 ,y2)){
        return action;
    }

    swap(x1, y1, x2, y2, board);
    var result = Board.findAllMatchedGems(b);
    swap(x1, y1, x2, y2, board);

    if(result.length > 0){
        var changes = [];
        changes.push(new Change(x1, y1, x2, y2));

        action._processor = Action.processor.swap;
        action._changes = changes;

        return action;
    }

    return action;

    function swap(x1, y1, x2, y2, board){
        var temp = board[y2][x2];
        board[y2][x2] = board[y1][x1];
        board[y1][x1] = temp;
    }
};

Board.isValidActionSwapGems = function(x1, y1, x2, y2){
    if((x1 + 1 === x2 && y1 === y2) ||
        (x1 - 1 === x2 && y1 === y2) ||
        (x1 === x2 && y1 + 1 === y2) ||
        (x1 === x2 && y1 - 1 === y2)){
        return true;
    }
    return false;
};

/*
    instance zone
*/

Board.prototype.init = function(){
    this._board = new Array(Board.BOARD_SIZE);

    for(var i = 0; i < this._board.length; i++){
        this._board[i] = new Array(Board.BOARD_SIZE);
    }
};

Board.prototype.generateBoard = function(){
    generateBoardHelper(this);

    var result = this.findAllMatchedGems();
    while(result.length > 0){
        generateBoardHelper(this);
        result = this.findAllMatchedGems();
    }

    function generateBoardHelper(that){
        for(var y = 0; y < that._board.length; y++){
            for(var x = 0; x < that._board[y].length; x++){
                that._board[y][x] = Gem.createRandomGem();
            }
        }
    }
};

//for debug propose
Board.prototype.generateSampleBoard = function(){
    // var tempBoard = [
    //         [7,1,5,7,1,5,4,5],
    //         [5,2,3,2,3,6,7,2],
    //         [7,7,7,5,1,2,2,5],
    //         [3,7,3,3,6,5,3,3],
    //         [4,1,2,1,6,4,5,2],
    //         [7,7,7,2,6,4,6,1],
    //         [7,7,1,3,6,6,5,6],
    //         [6,3,2,6,6,1,2,3]
    //     ];

    var tempBoard = [
            [7,1,5,7,1,5,4,5],
            [5,2,3,2,3,6,7,2],
            [7,2,5,5,1,2,2,5],
            [5,5,3,3,6,5,3,3],
            [4,1,2,1,5,4,5,2],
            [7,2,6,7,7,4,6,1],
            [6,7,7,3,6,6,5,6],
            [6,3,2,6,6,1,2,3]
        ];

    for(var y = 0; y < this._board.length; y++){
        for(var x = 0; x < this._board[y].length; x++){
            this._board[y][x] = Gem.createGem(tempBoard[y][x]);
        }
    }
};

Board.prototype.applyAction = function(action) {
    if(action){
        action.applyChanges(this._board);
    }
};

Board.prototype.printBoard = function(){
    var str = "";
    for(var y = 0; y < this._board.length; y++){
        for(var x = 0; x < this._board[y].length; x++){
            str += this._board[y][x].getType() + " ";
        }
        str += "\n";
    }
    console.log(str);
};

Board.prototype.getBoard = function(){
    return this._board;
};

/*
    change class area
*/

function Change(fromX, fromY, toX, toY){
    this.fromX = fromX || 0;
    this.fromY = fromY || 0;
    this.toX = toX || 0;
    this.toY = toY || 0;
};
Change.prototype.constructor = Change;

/*
    action class area
*/

function Action(processor, changes){
    this._processor = processor || Action.processor.none;
    this._changes = changes || [];
}

Action.prototype.constructor = Action;

Action.prototype.applyChanges = function(board) {
    this._processor(board, this._changes);
};

Action.prototype.hasNoChanges = function() {
    return this._changes.length === 0;
};

Action.processor = {};

Action.processor.none = function(){};

Action.processor.swap = function(board, changes){
    var x1 = changes[0].fromX;
    var y1 = changes[0].fromY;
    var x2 = changes[0].toX;
    var y2 = changes[0].toY;

    var temp = board[y2][x2];
    board[y2][x2] = board[y1][x1];
    board[y1][x1] = temp;
};