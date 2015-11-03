var expect = require("chai").expect;
var bu = require("../dist/js/Main").BoardUtils;
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

var sampleElements = [1,2,3,4,5,6,7,8,9];

var compareFunc2 = function(ele1, ele2){
	return (ele1 === ele2) ? true : false;
};

var valueFunc = function(ele){
	return ele;
};

var genFunc = function(){
	var index = Math.floor(Math.random() * sampleElements.length);
	return sampleElements[index];
}

describe("BoardUtils", function(){
	describe("removeMatchedDuplicates", function(){
		it("should work as intention", function(){
			var compareFunc1 = function(ele1, ele2){
				return (ele1.num === ele2.num) ? true : false;
			};
			var dup = [];
			for(var i = 0; i < 10; i++){
				dup.push({x: 1, y: 2, element: {num: 5}});
			}
			var dup2 = bu._removeMatchedDuplicates(dup, compareFunc1);
			expect(dup2).to.have.length(1);
		});
	});

	describe("findMatched", function(){
		it("should work as intention", function(){
			var result = bu.findMatched(sampleBoard, 5, 3, compareFunc2);
			expect(result).to.have.length(3);
			result = bu.findMatched(sampleBoard, 0, 5, compareFunc2);
			expect(result).to.have.length(5);
			result = bu.findMatched(sampleBoard, 1, 1, compareFunc2);
			expect(result).to.have.length(0);
		});
	});

	describe("findMatchedAll", function(){
		it("should work as intention", function(){
			var result = bu.findMatchedAll(sampleBoard, compareFunc2);
			expect(result).to.have.length(15);
		});
	});

	describe("testSwap", function(){
		it("should return false when it's not valid", function(){
			var result = bu.testSwap(sampleBoard2, 1, 4, 0, 4, compareFunc2);
			expect(result).to.equal(false);
			var result = bu.testSwap(sampleBoard2, 1, 4, 3, 4, compareFunc2);
			expect(result).to.equal(false);
			var result = bu.testSwap(sampleBoard2, 1, 4, 1, 4, compareFunc2);
			expect(result).to.equal(false);
			var result = bu.testSwap(sampleBoard2, 1, 4, 5, 5, compareFunc2);
			expect(result).to.equal(false);
			var result = bu.testSwap(sampleBoard2, 1, 4, -1, 5, compareFunc2);
			expect(result).to.equal(false);
			var result = bu.testSwap(sampleBoard3, 1, 4, 2, 4, compareFunc2);
			expect(result).to.equal(false);
			var result = bu.testSwap(sampleBoard3, 1, 4, 1, 3, compareFunc2);
			expect(result).to.equal(false);
			var result = bu.testSwap(sampleBoard3, 1, 4, 1, 5, compareFunc2);
			expect(result).to.equal(false);
		});
		it("should return result when it's valid", function(){
			var result = bu.testSwap(sampleBoard3, 1, 4, 0, 4, compareFunc2);
			expect(result).to.have.length(3);
		});
	});

	describe("swap", function(){
		it("should not modify source on failure", function(){
			var clone = Matrix.clone(sampleBoard2);
			var result = bu.swap(clone, 1, 4, 0, 4, compareFunc2);
			expect(clone).to.eql(sampleBoard2);
		});
		it("should modify source on success", function(){
			var clone = Matrix.clone(sampleBoard3);
			var result = bu.swap(clone, 1, 4, 0, 4, compareFunc2);
			expect(clone).to.not.eql(sampleBoard3);
		});
	});

	describe("findPossibleMatch", function(){
		it("should work as intention", function(){
			var result1 = bu.findPossibleMatch(sampleBoard2, compareFunc2);
			var result2 = bu.findPossibleMatch(sampleBoard3, compareFunc2);
			var result3 = bu.findPossibleMatch(sampleBoard, compareFunc2);
			expect(result1).to.have.length(0);
			expect(result2).to.have.length(19);
			expect(result3).to.have.length(22);
		});
	});

	describe("clearMatched", function(){
		it("should work as intention", function(){
			var clone = Matrix.clone(sampleBoard);
			var matchedResult = bu.findMatchedAll(clone, compareFunc2);
			var removedList = bu.clearMatched(clone, matchedResult, 0, compareFunc2);
			expect(matchedResult).to.eql(removedList);
		});
	});

	describe("triggerGravity", function(){
		it("should work as intention", function(){
			var clone = Matrix.clone(sampleBoard);
			var matchedResult = bu.findMatchedAll(clone, compareFunc2);
			var removedList = bu.clearMatched(clone, matchedResult, 0);
			var shiftedList = bu.triggerGravity(clone, 0);
			expect(shiftedList).to.eql([
				{ fromX: 0, fromY: 5, toX: 0, toY: 4, element: 2 },
			  { fromX: 0, fromY: 4, toX: 0, toY: 3, element: 1 },
			  { fromX: 0, fromY: 3, toX: 0, toY: 2, element: 1 },
			  { fromX: 0, fromY: 2, toX: 0, toY: 1, element: 3 },
			  { fromX: 0, fromY: 1, toX: 0, toY: 0, element: 2 },
			  { fromX: 1, fromY: 5, toX: 1, toY: 4, element: 3 },
			  { fromX: 1, fromY: 4, toX: 1, toY: 3, element: 1 },
			  { fromX: 2, fromY: 5, toX: 2, toY: 4, element: 7 },
			  { fromX: 2, fromY: 4, toX: 2, toY: 3, element: 4 },
			  { fromX: 2, fromY: 3, toX: 2, toY: 2, element: 1 },
			  { fromX: 2, fromY: 2, toX: 2, toY: 1, element: 4 },
			  { fromX: 2, fromY: 1, toX: 2, toY: 0, element: 4 },
			  { fromX: 3, fromY: 5, toX: 3, toY: 4, element: 8 },
			  { fromX: 3, fromY: 4, toX: 3, toY: 3, element: 3 },
			  { fromX: 3, fromY: 3, toX: 3, toY: 2, element: 2 },
			  { fromX: 3, fromY: 2, toX: 3, toY: 1, element: 5 },
			  { fromX: 3, fromY: 1, toX: 3, toY: 0, element: 5 },
			  { fromX: 4, fromY: 5, toX: 4, toY: 0, element: 6 },
			  { fromX: 5, fromY: 3, toX: 5, toY: 2, element: 1 },
			  { fromX: 5, fromY: 2, toX: 5, toY: 1, element: 1 },
			  { fromX: 5, fromY: 1, toX: 5, toY: 0, element: 7 },
			  { fromX: 6, fromY: 3, toX: 6, toY: 2, element: 1 },
			  { fromX: 6, fromY: 2, toX: 6, toY: 1, element: 1 },
			  { fromX: 6, fromY: 1, toX: 6, toY: 0, element: 8 },
			  { fromX: 7, fromY: 3, toX: 7, toY: 2, element: 6 },
			  { fromX: 7, fromY: 2, toX: 7, toY: 1, element: 2 },
			  { fromX: 7, fromY: 1, toX: 7, toY: 0, element: 9 } ]);
		});
	});

	describe("fillEmpty", function(){
		it("should work as intention", function(){
			var clone = Matrix.clone(sampleBoard);
			var matchedResult = bu.findMatchedAll(clone, compareFunc2);
			var removedList = bu.clearMatched(clone, matchedResult, 0);
			// bu.debugPrint(clone, null, valueFunc);
			var shiftedList = bu.triggerGravity(clone, 0);
			// bu.debugPrint(clone, null, valueFunc);
			var filledList = bu.fillEmpty(clone, 0, genFunc);
			// bu.debugPrint(clone, null, valueFunc);
		});
	});

	describe("createBoard", function(){
		it("should work as intention", function(){
			var board, matched, possibleMatched;
			for(var i = 0; i < 100; i++){
				board = bu.createBoard(8, 8, genFunc, compareFunc2);
				matched = bu.findMatchedAll(board, compareFunc2);
				possibleMatched = bu.findPossibleMatch(board, compareFunc2);
				expect(matched).to.be.empty;
				expect(possibleMatched).to.have.length.of.at.least(3);
			}
		});
	});
});
