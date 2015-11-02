var expect = require("chai").expect;
var Matrix = require("../dist/js/Main").Matrix;

var pattern1 = [
	[1,0],
	[1,0],
	[0,1]
];
var pattern2 = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
];
var pattern3 = [
	[1,2],
	[3,4],
	[5,6]
];
var pattern4 = [
	[1,3,5,7],
	[2,4,6,8]
];
var pattern5 = [
	[1,2]
];
var pattern6 = [
	[1],
	[2]
];

describe("Matrix", function(){
	describe("transpose", function(){
		it("should work as intention", function(){
			var result1 = Matrix.transpose(pattern1);
			var result2 = Matrix.transpose(pattern2);
			var result3 = Matrix.transpose(pattern3);
			var result4 = Matrix.transpose(pattern4);
			var result5 = Matrix.transpose(pattern5);
			var result6 = Matrix.transpose(pattern6);
			expect(result1).to.be.eql([ [ 1, 1, 0 ], [ 0, 0, 1 ] ]);
			expect(result2).to.be.eql([ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]);
			expect(result3).to.be.eql([ [ 1, 3, 5 ], [ 2, 4, 6 ] ]);
			expect(result4).to.be.eql([ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ] ]);
			expect(result5).to.be.eql([ [ 1 ], [ 2 ] ]);
			expect(result6).to.be.eql([ [ 1, 2 ] ]);
		});
	});

	describe("isInBound", function(){
		it("should work as intention", function(){
			var result1 = Matrix.isInBound(pattern1, 0, 0);
			var result2 = Matrix.isInBound(pattern1, 3, 0);
			var result3 = Matrix.isInBound(pattern5, 1, 0);
			var result4 = Matrix.isInBound(pattern5, 5, 5);
			var result5 = Matrix.isInBound(pattern6, -5, 5);
			expect(result1).to.be.true;
			expect(result2).to.be.false;
			expect(result3).to.be.true;
			expect(result4).to.be.false;
			expect(result5).to.be.false;
		});
	});

	describe("create", function(){
		it("should work as intention", function(){
			var matrix1 = Matrix.create(2, 3, [0]);
			var matrix2 = Matrix.create(3, 2, [1]);
			var matrix3 = Matrix.create(1, 1, [2]);
			expect(matrix1).to.eql([ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ]);
			expect(matrix2).to.eql([ [ 1, 1, 1 ], [ 1, 1, 1 ] ]);
			expect(matrix3).to.eql([ [ 2 ] ]);
		});
	});

	describe("create", function(){
		it("should work as intention", function(){
			var matrix1 = Matrix.clone(pattern1);
			var matrix2 = Matrix.clone(pattern2);
			var matrix3 = Matrix.clone(pattern3);
			expect(matrix1).to.eql(pattern1);
			expect(matrix2).to.eql(pattern2);
			expect(matrix3).to.eql(pattern3);
		});
	});
});
