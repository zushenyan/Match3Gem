var expect = require("chai").expect;
var GameManager = require("../dist/js/Main").GameManager;
var BoardUtils = require("../dist/js/Main").BoardUtils;

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
	[1,1,8,4,5,6,7,8],
	[8,7,1,2,1,3,2,1],
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

var sampleBoard4 = [
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1]
];


var gm = new GameManager(sampleBoard2);

describe("GameManager", function(){
	describe("swap", function(){
		it("should work as intention", function(){
			// var gen = gm.swap(3, 6, 4, 6);
			// var ite = gen.next();
			// while(!ite.done){
			// 	BoardUtils.debugPrint(gm.getBoard());
			// 	ite = gen.next();
			// }
			// var gen = gm.swap(2, 1, 2, 0);
			// var ite = gen.next();
			// while(!ite.done){
			// 	BoardUtils.debugPrint(gm.getBoard());
			// 	ite = gen.next();
			// }
			// BoardUtils.debugPrint(gm.getBoard(), BoardUtils.findPossibleMatch(gm.getBoard()));
		});
	});
});
