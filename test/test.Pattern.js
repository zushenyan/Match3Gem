var expect = require("chai").expect;
var Pattern = require("../dist/js/Main").Pattern;

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
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
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

var pattern1 = [
	[0,0,1],
	[1,1,0]
];
var pattern2 = [
	[1,1],
	[1,1]
];
var pattern3 = [
	[1,0],
	[1,0],
	[0,1]
];
var pattern4 = [
	[1,0]
];

var compareFunc2 = function(ele1, ele2){
	return (ele1 === ele2) ? true : false;
};

describe("Pattern", function(){
	describe("makePattern", function(){
		it("should throw", function(){
			function run(){
				Pattern.makePattern(pattern1, 3, 3);
			}
			expect(run).to.throw(Error);
		});
		it("shuold work as intended", function(){
			var result1 = Pattern.makePattern(pattern1, 0, 0);
			var result2 = Pattern.makePattern(pattern1, 0, 1);
			var result3 = Pattern.makePattern(pattern4, 0, 0);
			expect(result1.diff).to.have.length(3);
			expect(result1.counter).to.equal(3);
			expect(result2.diff).to.have.length(3);
			expect(result2.counter).to.equal(3);
			expect(result3.diff).to.have.length(1);
			expect(result3.counter).to.equal(1);
		});
	});

	describe("comparePattern", function(){
		it("should work as intended", function(){
			var result1 = Pattern.comparePattern(sampleBoard, 0, 3, pattern1, 0, 1, compareFunc2);
			var result2 = Pattern.comparePattern(sampleBoard, 5, 1, pattern2, 0, 0, compareFunc2);
			var result3 = Pattern.comparePattern(sampleBoard, 7, 2, pattern3, 0, 0, compareFunc2);
			var result4 = Pattern.comparePattern(sampleBoard, 7, 7, pattern3, 0, 0, compareFunc2);
			var result5 = Pattern.comparePattern(sampleBoard, 7, 2, pattern3, 1, 0, compareFunc2);
			expect(result1).to.have.length(3);
			expect(result2).to.have.length(4);
			expect(result3).to.equal(null);
			expect(result4).to.equal(null);
			expect(result5).to.have.length(3);
		});
	});
});
