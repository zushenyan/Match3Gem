var expect = require("chai").expect;
var Board = require("../dist/js/Main").Board;
var Matrix = require("../dist/js/Main").Matrix;

var sampleBoard = [
	[2,3,4,5,6,7,8,9],
	[3,3,4,5,2,1,1,2],
	[1,3,1,2,2,1,1,6],
	[1,1,4,3,2,6,6,6],
	[2,3,7,8,2,5,6,7],
	[8,8,8,8,8,2,1,1],
	[8,7,6,5,4,3,3,2],
	[1,3,5,7,9,2,4,6]
];

var sampleBoard2 = [
	[1,2,3,4,5,6,7,8],
	[8,7,6,2,1,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,1,3,2,1],
	[1,2,3,4,2,6,7,8],
	[8,7,6,5,1,3,2,1],
	[1,2,3,4,2,6,7,8],
	[8,7,6,5,4,3,2,1]
];

var sampleBoard3 = [
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,8,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1]
];

describe("Board", function(){
	describe("newBoard", function(){
		it("should work as intention", function(){
			var board = new Board();
			board.newBoard(8,8);
			// board.debugPrint(null, Board.PRINT_TYPE);
			// board.debugPrint(null, Board.PRINT_ID);
		});
	});

	describe("newBoardWithSample", function(){
		it("should work as intention", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard3);
			// board.debugPrint(null, Board.PRINT_TYPE);
			// board.debugPrint(null, Board.PRINT_ID);
		});
	});

	describe("findMatchedAll", function(){
		it("should work as intention", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard);
			var result = board.findMatchedAll();
			expect(result).to.have.length(15);
		});
	});

	describe("testSwap", function(){
		it("should return false when it's not valid", function(){
			var board1 = new Board();
			board1.newBoardWithSample(sampleBoard2);
			var board2 = new Board();
			board2.newBoardWithSample(sampleBoard3);

			var result = board1.testSwap(1, 4, 0, 4);
			expect(result).to.equal(false);
			result = board1.testSwap(1, 4, 3, 4);
			expect(result).to.equal(false);
			result = board1.testSwap(1, 4, 1, 4);
			expect(result).to.equal(false);
			result = board1.testSwap(1, 4, 5, 5);
			expect(result).to.equal(false);
			result = board1.testSwap(1, 4, -1, 5);
			expect(result).to.equal(false);
			result = board2.testSwap(1, 4, 2, 4);
			expect(result).to.equal(false);
			result = board2.testSwap(1, 4, 1, 3);
			expect(result).to.equal(false);
			result = board2.testSwap(1, 4, 1, 5);
			expect(result).to.equal(false);
		});
		it("should return result when it's valid", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard3);
			var result = board.testSwap(1, 4, 0, 4);
			expect(result).to.have.length(3);
		});
	});

	describe("swap", function(){
		it("should not modify source on failure", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard2);
			var clone = Matrix.clone(board.getBoard());
			var result = board.swap(1, 4, 0, 4);
			expect(clone).to.eql(board.getBoard());
		});
		it("should modify source on success", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard3);
			var clone = Matrix.clone(board.getBoard());
			var result = board.swap(1, 4, 0, 4);
			expect(clone).to.not.eql(board.getBoard());
		});
	});

	describe("findPossibleMatch", function(){
		it("should work as intention", function(){
			var board1 = new Board();
			var board2 = new Board();
			var board3 = new Board();
			board1.newBoardWithSample(sampleBoard2);
			board2.newBoardWithSample(sampleBoard3);
			board3.newBoardWithSample(sampleBoard);
			var result1 = board1.findPossibleMatch();
			var result2 = board2.findPossibleMatch();
			var result3 = board3.findPossibleMatch();
			expect(result1).to.have.length(0);
			expect(result2).to.have.length(19);
			expect(result3).to.have.length(30);
		});
	});

	describe("clearMatched", function(){
		it("should work as intention", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard);
			var matchedResult = board.findMatchedAll();
			// board.debugPrint(matchedResult, Board.PRINT_ID);
			var removedList = board.clearMatched(matchedResult);
			// board.debugPrint(removedList, Board.PRINT_ID);
			expect(matchedResult).to.eql(removedList);
		});
	});

	describe("triggerGravity", function(){
		it("should work as intention", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard);
			var matchedResult = board.findMatchedAll();
			var removedList = board.clearMatched(matchedResult);
			var shiftedList = board.triggerGravity();
			expect(shiftedList).to.eql([
				{ fromX: 0, fromY: 4, toX: 0, toY: 5, element: { type: 2, id: 32 } },
  			{ fromX: 0, fromY: 3, toX: 0, toY: 4, element: { type: 1, id: 24 } },
			  { fromX: 0, fromY: 2, toX: 0, toY: 3, element: { type: 1, id: 16 } },
			  { fromX: 0, fromY: 1, toX: 0, toY: 2, element: { type: 3, id: 8 } },
			  { fromX: 0, fromY: 0, toX: 0, toY: 1, element: { type: 2, id: 0 } },
			  { fromX: 1, fromY: 4, toX: 1, toY: 5, element: { type: 3, id: 33 } },
			  { fromX: 1, fromY: 3, toX: 1, toY: 4, element: { type: 1, id: 25 } },
			  { fromX: 2, fromY: 4, toX: 2, toY: 5, element: { type: 7, id: 34 } },
			  { fromX: 2, fromY: 3, toX: 2, toY: 4, element: { type: 4, id: 26 } },
			  { fromX: 2, fromY: 2, toX: 2, toY: 3, element: { type: 1, id: 18 } },
			  { fromX: 2, fromY: 1, toX: 2, toY: 2, element: { type: 4, id: 10 } },
			  { fromX: 2, fromY: 0, toX: 2, toY: 1, element: { type: 4, id: 2 } },
			  { fromX: 3, fromY: 4, toX: 3, toY: 5, element: { type: 8, id: 35 } },
			  { fromX: 3, fromY: 3, toX: 3, toY: 4, element: { type: 3, id: 27 } },
			  { fromX: 3, fromY: 2, toX: 3, toY: 3, element: { type: 2, id: 19 } },
			  { fromX: 3, fromY: 1, toX: 3, toY: 2, element: { type: 5, id: 11 } },
			  { fromX: 3, fromY: 0, toX: 3, toY: 1, element: { type: 5, id: 3 } },
			  { fromX: 4, fromY: 0, toX: 4, toY: 5, element: { type: 6, id: 4 } },
			  { fromX: 5, fromY: 2, toX: 5, toY: 3, element: { type: 1, id: 21 } },
			  { fromX: 5, fromY: 1, toX: 5, toY: 2, element: { type: 1, id: 13 } },
			  { fromX: 5, fromY: 0, toX: 5, toY: 1, element: { type: 7, id: 5 } },
			  { fromX: 6, fromY: 2, toX: 6, toY: 3, element: { type: 1, id: 22 } },
			  { fromX: 6, fromY: 1, toX: 6, toY: 2, element: { type: 1, id: 14 } },
			  { fromX: 6, fromY: 0, toX: 6, toY: 1, element: { type: 8, id: 6 } },
			  { fromX: 7, fromY: 2, toX: 7, toY: 3, element: { type: 6, id: 23 } },
			  { fromX: 7, fromY: 1, toX: 7, toY: 2, element: { type: 2, id: 15 } },
			  { fromX: 7, fromY: 0, toX: 7, toY: 1, element: { type: 9, id: 7 } } ]);
		});
	});

	describe("fillEmpty", function(){
		it("should work as intention", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard);
			var matchedResult = board.findMatchedAll();
			var removedList = board.clearMatched(matchedResult);
			// board.debugPrint(null, Board.PRINT_TYPE);
			var shiftedList = board.triggerGravity();
			// board.debugPrint(null, Board.PRINT_TYPE);
			var filledList = board.fillEmpty();
			// board.debugPrint(null, Board.PRINT_TYPE);
			// board.debugPrint(null, Board.PRINT_ID);
		});
	});

	describe("createBoard", function(){
		it("should work as intention", function(){
			var board = new Board(), matched, possibleMatched;
			for(var i = 0; i < 100; i++){
				board.newBoard(8, 8);
				matched = board.findMatchedAll();
				possibleMatched = board.findPossibleMatch();
				expect(matched).to.be.empty;
				expect(possibleMatched).to.have.length.of.at.least(3);
			}
		});
	});

	describe("getElementWithXY", function(){
		it("should work as intention", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard);
			var ele1 = board.getElementWithXY(0, 0);
			var ele2 = board.getElementWithXY(7, 7);
			var ele3 = board.getElementWithXY(-1, 0);
			expect(ele1).not.to.be.null;
			expect(ele1.id).to.be.equal(0);
			expect(ele2).not.to.be.null;
			expect(ele2.id).to.be.equal(63);
			expect(ele3).to.be.null;
		});
	});

	describe("getElementWithId", function(){
		it("should work as intention", function(){
			var board = new Board();
			board.newBoardWithSample(sampleBoard);
			var ele1 = board.getElementWithId(0);
			var ele2 = board.getElementWithId(63);
			var ele3 = board.getElementWithId(-1);
			expect(ele1).not.to.be.null;
			expect(ele1.x).to.be.equal(0);
			expect(ele1.y).to.be.equal(0);
			expect(ele2).not.to.be.null;
			expect(ele2.x).to.be.equal(7);
			expect(ele2.y).to.be.equal(7);
			expect(ele3).to.be.null;
		});
	});
});
