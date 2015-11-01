var expect = require("chai").expect;
var bu = require("../dist/js/Main").BoardUtils;

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

var dup = [];
for(var i = 0; i < 10; i++){
	dup.push({x: 1, y: 2, type: 5});
}

describe("BoardUtils", function(){
	describe("cloneBoard", function(){
		it("should with onlySize = false", function(){
			var clone = bu.cloneBoard(sampleBoard);
			expect(clone).to.not.equal(sampleBoard);
			expect(clone).to.eql(sampleBoard);
		});
		it("should with onlySize = true", function(){
			var clone = bu.cloneBoard(sampleBoard, true);
			for(var y = 0; y < clone.length; y++){
				for(var x = 0; x < clone[y].length; x++){
					expect(clone[y][x]).to.eql(bu.UNVISITED);
				}
			}
		});
	});

	describe("removeMatchedDuplicates", function(){
		it("should work as intention", function(){
			var dup2 = bu._removeMatchedDuplicates(dup);
			expect(dup2).to.have.length(1);
		});
	});

	describe("findMatched", function(){
		it("should work as intention", function(){
			var result = bu.findMatched(sampleBoard, 5, 3);
			expect(result).to.have.length(3);
			result = bu.findMatched(sampleBoard, 0, 5);
			expect(result).to.have.length(5);
			result = bu.findMatched(sampleBoard, 1, 1);
			expect(result).to.have.length(0);
		});
	});

	describe("findMatchedAll", function(){
		it("should work as intention", function(){
			var result = bu.findMatchedAll(sampleBoard);
			expect(result).to.have.length(15);
		});
	});

	describe("testSwap", function(){
		it("should return false on not valid", function(){
			var result = bu.testSwap(sampleBoard2, 1, 4, 0, 4);
			expect(result).to.equal(false);
		});
		it("should return result on valid", function(){
			var result = bu.testSwap(sampleBoard3, 1, 4, 0, 4);
			expect(result).to.have.length(3);
		});
	});

	describe("swap", function(){
		it("should not modify source on failure", function(){
			var clone = bu.cloneBoard(sampleBoard2);
			var result = bu.swap(clone, 1, 4, 0, 4);
			expect(clone).to.eql(sampleBoard2);
		});
		it("should modify source on success", function(){
			var clone = bu.cloneBoard(sampleBoard3);
			var result = bu.swap(clone, 1, 4, 0, 4);
			expect(clone).to.not.eql(sampleBoard3);
		});
	});

	describe("hasPossibleMatch", function(){
		it("should work as intention", function(){
			var result1 = bu.hasPossibleMatch(sampleBoard2);
			var result2 = bu.hasPossibleMatch(sampleBoard3);
			var result3 = bu.hasPossibleMatch(sampleBoard);
			expect(result1).to.have.length(0);
			expect(result2).to.have.length(19);
			expect(result3).to.have.length(22);
		});
	});
});
