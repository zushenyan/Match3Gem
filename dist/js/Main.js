(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.m3g = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _m3gBoardUtils = require("./m3g/BoardUtils");

var _m3gBoardUtils2 = _interopRequireDefault(_m3gBoardUtils);

var _m3gPattern = require("./m3g/Pattern");

var _m3gPattern2 = _interopRequireDefault(_m3gPattern);

var _m3gMatrix = require("./m3g/Matrix");

var _m3gMatrix2 = _interopRequireDefault(_m3gMatrix);

exports.BoardUtils = _m3gBoardUtils2["default"];
exports.Pattern = _m3gPattern2["default"];
exports.Matrix = _m3gMatrix2["default"];

},{"./m3g/BoardUtils":2,"./m3g/Matrix":3,"./m3g/Pattern":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Matrix = require("./Matrix");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _Pattern = require("./Pattern");

var _Pattern2 = _interopRequireDefault(_Pattern);

var BoardUtils = {
	findMatched: function findMatched(board, startX, startY) {
		var targetType = board[startY][startX];
		var rightList = [];
		var downList = [];
		var resultList = [];

		walkDirection(board, startX, startY, targetType, "right", rightList);
		walkDirection(board, startX, startY, targetType, "down", downList);

		resultList = rightList.length >= 3 ? resultList.concat(rightList) : resultList;
		resultList = downList.length >= 3 ? resultList.concat(downList) : resultList;

		return BoardUtils._removeMatchedDuplicates(resultList);

		function walkDirection(board, x, y, type, direction, matchedList) {
			if (!isValidDirection(board, x, y, type)) {
				return;
			}
			matchedList.push({ x: x, y: y, type: type });
			switch (direction) {
				case "right":
					walkDirection(board, x + 1, y, type, "right", matchedList);break;
				case "down":
					walkDirection(board, x, y + 1, type, "down", matchedList);break;
			}
		}

		function isValidDirection(board, x, y, type) {
			return _Matrix2["default"].isInBound(board, x, y) && board[y][x] === type;
		}
	},

	findMatchedAll: function findMatchedAll(board) {
		var resultList = [];
		for (var y = 0; y < board.length; y++) {
			for (var x = 0; x < board[y].length; x++) {
				var result = BoardUtils.findMatched(board, x, y);
				resultList = resultList.concat(result);
			}
		}
		return BoardUtils._removeMatchedDuplicates(resultList);
	},

	testSwap: function testSwap(board, sourceX, sourceY, targetX, targetY) {
		if (!(_Matrix2["default"].isInBound(board, sourceX, sourceY) && _Matrix2["default"].isInBound(board, targetX, targetY))) {
			return false;
		}
		var cloneBoard = BoardUtils.cloneBoard(board);
		BoardUtils._swapHelpper(cloneBoard, sourceX, sourceY, targetX, targetY);
		var result = BoardUtils.findMatchedAll(cloneBoard);
		return result.length >= 3 ? result : false;
	},

	swap: function swap(board, sourceX, sourceY, targetX, targetY) {
		var result = BoardUtils.testSwap(board, sourceX, sourceY, targetX, targetY);
		if (result) {
			BoardUtils._swapHelpper(board, sourceX, sourceY, targetX, targetY);
		}
		return result;
	},

	hasPossibleMatch: function hasPossibleMatch(board) {
		var patterns = BoardUtils._generatePatterns();
		var resultList = [];

		for (var y = 0; y < board.length; y++) {
			for (var x = 0; x < board[y].length; x++) {
				for (var i = 0; i < patterns.length; i++) {
					var result = _Pattern2["default"].comparePattern(board, x, y, patterns[i].pattern, patterns[i].anchorX, patterns[i].anchorY);
					if (result) {
						resultList = resultList.concat(result);
					}
				}
			}
		}
		resultList = BoardUtils._removeMatchedDuplicates(resultList);
		return resultList;
	},

	/**
 	@arg {array} board - 2d array.
 	@arg {boolean} onlySize - only copy its height and width, false on default.
 */
	cloneBoard: function cloneBoard(board) {
		var onlySize = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		var clone = [];

		if (onlySize) {
			for (var y = 0; y < board.length; y++) {
				clone.push([]);
				for (var x = 0; x < board[y].length; x++) {
					clone[y][x] = BoardUtils.UNVISITED;
				}
			}
		} else {
			board.forEach(function (ele) {
				clone.push(ele.slice(0));
			});
		}
		return clone;
	},

	debugPrint: function debugPrint(board, matchedResult) {
		var boardOutput = "";
		var matchedOutput = "";

		var _loop = function (y) {
			var _loop2 = function (x) {
				boardOutput += board[y][x] + ", ";

				var index = matchedResult.findIndex(function (ele, index, arr) {
					if (x === ele.x && y === ele.y) {
						return true;
					}
				});
				matchedOutput += index >= 0 ? matchedResult[index].type + ", " : " " + ", ";
			};

			for (var x = 0; x < board[y].length; x++) {
				_loop2(x);
			}
			boardOutput += "\n";
			matchedOutput += "\n";
		};

		for (var y = 0; y < board.length; y++) {
			_loop(y);
		}

		console.log("board:");
		console.log(boardOutput);
		console.log("matched:");
		console.log(matchedOutput);
	},

	_removeMatchedDuplicates: function _removeMatchedDuplicates(list) {
		var resultList = [];

		var _loop3 = function (i) {
			var hasOne = resultList.find(function (ele) {
				if (list[i].x === ele.x && list[i].y === ele.y && list[i].type === ele.type) {
					return true;
				}
			});
			if (!hasOne) {
				resultList.push(list[i]);
			}
		};

		for (var i = 0; i < list.length; i++) {
			_loop3(i);
		}
		return resultList;
	},

	_swapHelpper: function _swapHelpper(board, sourceX, sourceY, targetX, targetY) {
		var temp = board[targetY][targetX];
		board[targetY][targetX] = board[sourceY][sourceX];
		board[sourceY][sourceX] = temp;
		return {
			source: { x: sourceX, y: sourceY, type: board[sourceY][sourceX] },
			target: { x: targetX, y: targetY, type: board[targetY][targetX] }
		};
	},

	_generatePatterns: function _generatePatterns() {
		var horizontalPattern1 = [[1, 1, 0], [0, 0, 1]];
		var horizontalPattern2 = [[1, 0, 0], [0, 1, 1]];
		var horizontalPattern3 = [[1, 0, 1], [0, 1, 0]];
		var verticalPattern1 = _Matrix2["default"].transpose(horizontalPattern1);
		var verticalPattern2 = _Matrix2["default"].transpose(horizontalPattern2);
		var verticalPattern3 = _Matrix2["default"].transpose(horizontalPattern3);

		return [{ pattern: horizontalPattern1, anchorX: 0, anchorY: 0 }, { pattern: horizontalPattern1, anchorX: 0, anchorY: 1 }, { pattern: horizontalPattern2, anchorX: 0, anchorY: 0 }, { pattern: horizontalPattern2, anchorX: 0, anchorY: 1 }, { pattern: horizontalPattern3, anchorX: 0, anchorY: 0 }, { pattern: horizontalPattern3, anchorX: 0, anchorY: 1 }, { pattern: verticalPattern1, anchorX: 0, anchorY: 0 }, { pattern: verticalPattern1, anchorX: 1, anchorY: 0 }, { pattern: verticalPattern2, anchorX: 0, anchorY: 0 }, { pattern: verticalPattern2, anchorX: 1, anchorY: 0 }, { pattern: verticalPattern3, anchorX: 0, anchorY: 0 }, { pattern: verticalPattern3, anchorX: 1, anchorY: 0 }];
	},

	VISITED: 2,
	UNVISITED: 1
};

exports["default"] = BoardUtils;
module.exports = exports["default"];

},{"./Matrix":3,"./Pattern":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Matrix = {
	transpose: function transpose(matrix) {
		var height = matrix.length;
		var width = matrix[0].length;
		var newArray = [];
		var newMatrix = [];

		// to one-dimensional first
		for (var i = 0; i < height; i++) {
			newArray = newArray.concat(matrix[i]);
		}

		/*
  	if origin size:		width = 2, height = 3
  	new one will be:	width = 3, height = 2
  */
		for (var i = 0; i < width; i++) {
			var row = [];
			var indexToNewArray = i;
			while (newArray[indexToNewArray] !== undefined) {
				row.push(newArray[indexToNewArray]);
				indexToNewArray += width;
			}
			if (row.length > 0) {
				newMatrix.push(row);
			};
		}

		return newMatrix;
	},

	isInBound: function isInBound(matrix, x, y) {
		var height = matrix.length;
		var width = matrix[0].length;
		return x >= 0 && x < width && y >= 0 && y < height ? true : false;
	}
};

exports["default"] = Matrix;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Matrix = require("./Matrix");

var _Matrix2 = _interopRequireDefault(_Matrix);

var Pattern = {
	makePattern: function makePattern(pattern, anchorX, anchorY) {
		if (!_Matrix2["default"].isInBound(pattern, anchorX, anchorY)) {
			throw new Error("Anchor is out of bound! " + anchorX + ", " + anchorY);
		}
		var diff = [];
		var targetType = pattern[anchorY][anchorX];
		var counter = 0;
		for (var y = 0; y < pattern.length; y++) {
			for (var x = 0; x < pattern[y].length; x++) {
				if (pattern[y][x] === targetType) {
					var diffX = x - anchorX;
					var diffY = y - anchorY;
					diff.push({ x: diffX, y: diffY });
					counter++;
				}
			}
		}
		return { diff: diff, counter: counter };
	},

	comparePattern: function comparePattern(board, x, y, pattern, anchorX, anchorY) {
		var patternResult = Pattern.makePattern(pattern, anchorX, anchorY);
		var result = [];
		var targetType = board[y][x];
		var counter = 0;
		for (var i = 0; i < patternResult.diff.length; i++) {
			var newX = x + patternResult.diff[i].x;
			var newY = y + patternResult.diff[i].y;
			if (_Matrix2["default"].isInBound(board, newX, newY)) {
				if (board[newY][newX] === targetType) {
					counter++;
					result.push({ x: newX, y: newY, type: board[newY][newX] });
				}
			}
		}
		return counter === patternResult.counter ? result : null;
	}
};

exports["default"] = Pattern;
module.exports = exports["default"];

},{"./Matrix":3}]},{},[1])(1)
});


//# sourceMappingURL=Main.js.map
