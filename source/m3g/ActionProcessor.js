//just an sub namespace
m3g.ActionProcessor = {};

m3g.ActionProcessor.none = function(board, changes){};

m3g.ActionProcessor.generateRandomGemType = function(board, changes){
	for(var i = 0; i < changes.length; i++){
		var x = changes[i].getFromPoint().getX();
		var y = changes[i].getFromPoint().getY();
		board.getBoardXY(x, y).setType(m3g.Gem.generateRandomGemType());
	}
};

m3g.ActionProcessor.remove = function(board, changes){
	for(var i = 0; i < changes.length; i++){
		var x = changes[i].getFromPoint().getX();
		var y = changes[i].getFromPoint().getY();
		board.getBoardXY(x, y).setType(m3g.Gem.GEM_TYPE_EMPTY);
	}
};

m3g.ActionProcessor.fall = function(board, changes){
	for(var i = 0; i < changes.length; i++){
		var x1 = changes[i].getFromPoint().getX();
	    var y1 = changes[i].getFromPoint().getY();
	    var x2 = changes[i].getToPoint().getX();
	    var y2 = changes[i].getToPoint().getY();

	    var tempType = board.getBoardXY(x2, y2).getType();
    	board.getBoardXY(x2, y2).setType(board.getBoardXY(x1, y1).getType());
    	board.getBoardXY(x1, y1).setType(tempType);;
	}
};

m3g.ActionProcessor.swap = function(board, changes){
	var x1 = changes[0].getFromPoint().getX();
    var y1 = changes[0].getFromPoint().getY();
    var x2 = changes[0].getToPoint().getX();
    var y2 = changes[0].getToPoint().getY();

    var tempType = board.getBoardXY(x2, y2).getType();
    board.getBoardXY(x2, y2).setType(board.getBoardXY(x1, y1).getType());
    board.getBoardXY(x1, y1).setType(tempType);;
};