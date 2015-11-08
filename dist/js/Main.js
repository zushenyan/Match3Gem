(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.m3g = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimationManager = (function () {
	function AnimationManager(game) {
		_classCallCheck(this, AnimationManager);

		this._spritePool = {};
		this._tweenPool = {};
		this._game = game;
	}

	_createClass(AnimationManager, [{
		key: "addTextSprite",
		value: function addTextSprite(x, y, id, text) {
			var style = { font: "32px Arial", fill: "#ffffff", align: "center" };
			var textSprite = this._game.add.text(x, y, text, style);
			textSprite.anchor.set(0.5);
			this._spritePool[id] = textSprite;
		}
	}, {
		key: "addSprite",
		value: function addSprite(x, y, spriteName, id) {
			var sprite = this._game.add.sprite(x, y, spriteName);
			this._spritePool[id] = sprite;
		}
	}, {
		key: "getSprite",
		value: function getSprite(id) {
			return this._spritePool[id];
		}
	}, {
		key: "removeSprite",
		value: function removeSprite(id) {
			this._spritePool[id].destroy();
			delete this._spritePool[id];
			delete this._tweenPool[id];
		}
	}, {
		key: "isTweening",
		value: function isTweening() {
			var isTweening = false;
			for (var key in this._tweenPool) {
				if (this._tweenPool[key].isRunning) {
					isTweening = true;
					break;
				}
			}
			return isTweening;
		}
	}, {
		key: "spriteFallFrom",
		value: function spriteFallFrom(y, id, speed) {
			var duration = this._duration(this._spritePool[id], this._spritePool[id].x, y, speed);
			return this._tweenPool[id] = this._game.add.tween(this._spritePool[id]).from({ y: y }, duration, Phaser.Easing.Linear.None, true);
		}
	}, {
		key: "spriteFallTo",
		value: function spriteFallTo(y, id, speed) {
			var duration = this._duration(this._spritePool[id], this._spritePool[id].x, y, speed);
			return this._tweenPool[id] = this._game.add.tween(this._spritePool[id]).to({ y: y }, duration, Phaser.Easing.Linear.None, true);
		}
	}, {
		key: "spriteSwap",
		value: function spriteSwap(sourceId, targetId) {
			var sourceX = this._spritePool[sourceId].x;
			var sourceY = this._spritePool[sourceId].y;
			var targetX = this._spritePool[targetId].x;
			var targetY = this._spritePool[targetId].y;
			var sourceTween = this._game.add.tween(this._spritePool[sourceId]).to({ x: targetX, y: targetY }, 250, Phaser.Easing.Linear.None, true);
			var targetTween = this._game.add.tween(this._spritePool[targetId]).to({ x: sourceX, y: sourceY }, 250, Phaser.Easing.Linear.None, true);
			this._tweenPool[sourceId] = sourceTween;
			this._tweenPool[targetId] = targetTween;
			return { source: sourceTween, target: targetTween };
		}
	}, {
		key: "spriteFadeOut",
		value: function spriteFadeOut(id, duration) {
			return this._tweenPool[id] = this._game.add.tween(this._spritePool[id]).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true);
		}
	}, {
		key: "_duration",
		value: function _duration(movingObj, destX, destY, speed) {
			var point = new Phaser.Point(destX, destY);
			return Phaser.Point.distance(movingObj, point) / speed * 1000;
		}
	}]);

	return AnimationManager;
})();

exports["default"] = AnimationManager;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _GameScene = require("./GameScene");

var _GameScene2 = _interopRequireDefault(_GameScene);

var Boot = function Boot() {
	_classCallCheck(this, Boot);

	var game = new Phaser.Game(256, 256, Phaser.AUTO);
	game.state.add("GameScene", new _GameScene2["default"](game));
	game.state.start("GameScene");
};

exports["default"] = Boot;
module.exports = exports["default"];

},{"./GameScene":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var GameConstants = {
	BOARD_WIDTH: 8,
	BOARD_HEIGHT: 8,

	TILE_SIZE: 32
};

exports["default"] = GameConstants;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _GameUtils = require("./GameUtils");

var _GameUtils2 = _interopRequireDefault(_GameUtils);

var _GameConstants = require("./GameConstants");

var _GameConstants2 = _interopRequireDefault(_GameConstants);

var GameInput = (function () {
	function GameInput(game, callback) {
		_classCallCheck(this, GameInput);

		this._game = game;

		this._callback = callback;
		this._capture = false;
		this._firstPosition = null;
	}

	_createClass(GameInput, [{
		key: "enableInput",
		value: function enableInput() {
			this._capture = true;
		}
	}, {
		key: "disableInput",
		value: function disableInput() {
			this._capture = false;
		}
	}, {
		key: "listen",
		value: function listen() {
			if (!this._capture) {
				return;
			}
			if (this._game.input.mousePointer.isDown) {
				var newCoord = _GameUtils2["default"].convertToBoardPosition(this._game.input.x, this._game.input.y, _GameConstants2["default"].TILE_SIZE);
				if (this._firstPosition === null) {
					this._firstPosition = newCoord;
				}
				if (this._firstPosition.x !== newCoord.x || this._firstPosition.y !== newCoord.y) {
					this._callback(this._firstPosition, newCoord);
					this._firstPosition = null;
				}
			} else {
				this._firstPosition = null;
			}
		}
	}]);

	return GameInput;
})();

exports["default"] = GameInput;
module.exports = exports["default"];

},{"./GameConstants":3,"./GameUtils":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _m3gBoard = require("./m3g/Board");

var _m3gBoard2 = _interopRequireDefault(_m3gBoard);

var _GameConstants = require("./GameConstants");

var _GameConstants2 = _interopRequireDefault(_GameConstants);

var _GameUtils = require("./GameUtils");

var _GameUtils2 = _interopRequireDefault(_GameUtils);

var _GameInput = require("./GameInput");

var _GameInput2 = _interopRequireDefault(_GameInput);

var _AnimationManager = require("./AnimationManager");

var _AnimationManager2 = _interopRequireDefault(_AnimationManager);

var _TaskManager = require("./TaskManager");

var _TaskManager2 = _interopRequireDefault(_TaskManager);

// var sampleBoard1 = [
// 	[1,2,3,4,5,6,7,8],
// 	[8,7,6,5,4,3,2,1],
// 	[1,2,3,4,5,6,7,8],
// 	[8,7,6,5,4,3,2,1],
// 	[1,8,3,4,5,6,7,8],
// 	[8,7,6,5,4,3,2,1],
// 	[1,2,3,4,5,6,7,8],
// 	[8,7,6,5,4,3,2,1]
// ];
//
// var sampleBoard2 = [
// 	[8,2,3,4,5,6,7,8],
// 	[8,7,6,2,1,3,2,1],
// 	[6,2,3,4,5,6,7,8],
// 	[8,7,6,5,1,3,2,1],
// 	[1,2,3,4,2,6,7,8],
// 	[8,7,6,5,1,3,2,1],
// 	[1,2,3,4,2,6,7,8],
// 	[8,7,6,5,4,3,2,1]
// ];

var GameScene = (function () {
	function GameScene(game) {
		_classCallCheck(this, GameScene);

		this.game = game;
		this.board = new _m3gBoard2["default"]();
		this.gameInput = new _GameInput2["default"](this.game, this._inputCallback.bind(this));
		this.animationManager = new _AnimationManager2["default"](this.game);
		this.taskManager = new _TaskManager2["default"]();

		this.soundFall = null;
		this.soundMatch = null;
	}

	_createClass(GameScene, [{
		key: "preload",
		value: function preload() {
			for (var i = 0, j = i + 1; i < _m3gBoard2["default"].TYPES.length; i++, j++) {
				this.game.load.image("gem" + j, "../media/" + j + ".png");
			}
			this.game.load.audio("sound_fall", ["../media/gem_fall.wav", "../media/gem_fall.mp3"]);
			this.game.load.audio("sound_match", ["../media/gem_matched.wav", "../media/gem_matched.mp3"]);
		}
	}, {
		key: "create",
		value: function create() {
			this.soundFall = this.game.add.audio("sound_fall");
			this.soundMatch = this.game.add.audio("sound_match");
			this.soundFall.volume = 0.1;
			this.soundMatch.volume = 0.1;

			this._newBoard();
		}
	}, {
		key: "update",
		value: function update() {
			if (!this.animationManager.isTweening()) {
				this.taskManager.runTasks();
			};
			this.gameInput.listen();
		}
	}, {
		key: "_inputCallback",
		value: function _inputCallback(oldCoord, newCoord) {
			this._swap(oldCoord, newCoord);
		}
	}, {
		key: "_swap",
		value: function _swap(oldCoord, newCoord) {
			var _this = this;

			this.taskManager.addTask(function () {
				_this.gameInput.disableInput();
			});
			this.taskManager.addTask(function () {
				var sourceId = _this.board.getElementWithXY(oldCoord.x, oldCoord.y).id;
				var targetId = _this.board.getElementWithXY(newCoord.x, newCoord.y).id;
				var isValid = _this.board.swap(oldCoord.x, oldCoord.y, newCoord.x, newCoord.y);
				var isNear = _this.board.isNear(oldCoord.x, oldCoord.y, newCoord.x, newCoord.y);
				if (isValid) {
					_this._validSwap(sourceId, targetId);
					_this._checkMatched();
				} else if (!isValid && isNear) {
					_this._invalidSwap(sourceId, targetId);
				} else {
					// to solve a problem that when player swipes his mouse through a corner of a gem,
					// which will make left mouse button remain disable state.
					_this.taskManager.addTask(function () {
						_this.gameInput.enableInput();
					});
				}
			});
		}
	}, {
		key: "_validSwap",
		value: function _validSwap(sourceId, targetId) {
			var _this2 = this;

			this.taskManager.addTask(function () {
				_this2.animationManager.spriteSwap(sourceId, targetId);
			});
		}
	}, {
		key: "_invalidSwap",
		value: function _invalidSwap(sourceId, targetId) {
			var _this3 = this;

			// swap twice to play swap back and forth animation.
			this.taskManager.addTask(function () {
				_this3.animationManager.spriteSwap(sourceId, targetId);
			});
			this.taskManager.addTask(function () {
				_this3.animationManager.spriteSwap(sourceId, targetId);
			});
			this.taskManager.addTask(function () {
				_this3.gameInput.enableInput();
			});
		}
	}, {
		key: "_checkMatched",
		value: function _checkMatched() {
			var _this4 = this;

			this.taskManager.addTask(function () {
				var matchedResults = _this4.board.findMatchedAll();
				var hasPossibleMatch = _this4.board.findPossibleMatch();
				if (matchedResults.length > 0) {
					_this4._clearMatchedGems(matchedResults);
					_this4._makeGemsFall();
					_this4._addGems();
					_this4.taskManager.addTask(function () {
						_this4._checkMatched();
					});
				} else if (hasPossibleMatch.length > 0) {
					_this4.taskManager.addTask(function () {
						_this4.gameInput.enableInput();
					});
				} else {
					_this4._renewBoardAnimations();
					_this4._newBoard();
				}
			});
		}
	}, {
		key: "_clearMatchedGems",
		value: function _clearMatchedGems(matchedResults) {
			var _this5 = this;

			this.taskManager.addTask(function () {
				matchedResults.forEach(function (ele) {
					_this5.animationManager.spriteFadeOut(ele.element.id, 250);
				});
			});
			// clear model data after animation ends.
			this.taskManager.addTask(function () {
				_this5.board.clearMatched(matchedResults);
			});
			// clear sprites
			this.taskManager.addTask(function () {
				matchedResults.forEach(function (ele) {
					_this5.animationManager.removeSprite(ele.element.id);
				});
			});
			this.taskManager.addTask(function () {
				_this5.soundMatch.play();
			});
		}
	}, {
		key: "_makeGemsFall",
		value: function _makeGemsFall() {
			var _this6 = this;

			var results = undefined;
			this.taskManager.addTask(function () {
				results = _this6.board.triggerGravity();
			});
			this.taskManager.addTask(function () {
				results.forEach(function (ele) {
					var destY = ele.toY * _GameConstants2["default"].TILE_SIZE;
					_this6.animationManager.spriteFallTo(destY, ele.element.id, 225);
				});
			});
			this.taskManager.addTask(function () {
				_this6.soundFall.play();
			});
		}
	}, {
		key: "_addGems",
		value: function _addGems() {
			var _this7 = this;

			var results = undefined;
			this.taskManager.addTask(function () {
				results = _this7.board.fillEmpty();
			});
			this.taskManager.addTask(function () {
				results.forEach(function (ele) {
					_this7._createGem(ele.x, ele.y, ele.element.type, ele.element.id);
				});
			});
			this.taskManager.addTask(function () {
				_this7.soundFall.play();
			});
		}
	}, {
		key: "_renewBoardAnimations",
		value: function _renewBoardAnimations() {
			var _this8 = this;

			// add "no more movement" text.
			this.taskManager.addTask(function () {
				_this8.animationManager.addTextSprite(_this8.game.world.centerX, _this8.game.world.centerY, "renew_board", "No\nMore\nMove");
				_this8.animationManager.spriteFallFrom(-100, "renew_board", 100);
			});
			// fade out all sprites.
			this.taskManager.addTask(function () {
				var board = _this8.board.getBoard();
				for (var y = 0; y < board.length; y++) {
					for (var x = 0; x < board[y].length; x++) {
						_this8.animationManager.spriteFadeOut(board[y][x].id, 2500);
					}
				}
				_this8.animationManager.spriteFadeOut("renew_board", 2500);
			});
			// remove all sprites
			this.taskManager.addTask(function () {
				var board = _this8.board.getBoard();
				for (var y = 0; y < board.length; y++) {
					for (var x = 0; x < board[y].length; x++) {
						_this8.animationManager.removeSprite(board[y][x].id);
					}
				}
				_this8.animationManager.removeSprite("renew_board");
			});
		}
	}, {
		key: "_newBoard",
		value: function _newBoard() {
			var _this9 = this;

			// generate board and make gems fall
			this.taskManager.addTask(function () {
				// this.board.newBoardWithSample(sampleBoard2);
				_this9.board.newBoard(8, 8);
				var board = _this9.board.getBoard();
				for (var y = 0; y < board.length; y++) {
					for (var x = 0; x < board[y].length; x++) {
						_this9._createGem(x, y, board[y][x].type, board[y][x].id);
					}
				}
			});
			// after the previous one is done, allow mouse input.
			this.taskManager.addTask(function () {
				_this9.gameInput.enableInput();
			});
			this.taskManager.addTask(function () {
				_this9.soundFall.play();
			});
		}
	}, {
		key: "_createGem",
		value: function _createGem(x, y, type, id) {
			var startX = x * _GameConstants2["default"].TILE_SIZE;
			var startY = (y - _GameConstants2["default"].BOARD_HEIGHT) * _GameConstants2["default"].TILE_SIZE;
			var destX = startX;
			var destY = y * _GameConstants2["default"].TILE_SIZE;
			var spriteName = "gem" + type;
			this.animationManager.addSprite(destX, destY, spriteName, id);
			this.animationManager.spriteFallFrom(startY, id, 225);
		}
	}]);

	return GameScene;
})();

exports["default"] = GameScene;
module.exports = exports["default"];

},{"./AnimationManager":1,"./GameConstants":3,"./GameInput":4,"./GameUtils":6,"./TaskManager":8,"./m3g/Board":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var GameUtils = {
	convertToBoardPosition: function convertToBoardPosition(x, y, tileSize) {
		return {
			x: Math.floor(x / tileSize),
			y: Math.floor(y / tileSize)
		};
	},

	convertToViewPosition: function convertToViewPosition(x, y, tileSize) {
		return {
			x: x * tileSize,
			y: y * tileSize
		};
	}
};

exports["default"] = GameUtils;
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _m3gPattern = require("./m3g/Pattern");

var _m3gPattern2 = _interopRequireDefault(_m3gPattern);

var _m3gMatrix = require("./m3g/Matrix");

var _m3gMatrix2 = _interopRequireDefault(_m3gMatrix);

var _m3gBoardUtils = require("./m3g/BoardUtils");

var _m3gBoardUtils2 = _interopRequireDefault(_m3gBoardUtils);

var _m3gBoardPatterns = require("./m3g/BoardPatterns");

var _m3gBoardPatterns2 = _interopRequireDefault(_m3gBoardPatterns);

var _m3gBoard = require("./m3g/Board");

var _m3gBoard2 = _interopRequireDefault(_m3gBoard);

var _GameUtils = require("./GameUtils");

var _GameUtils2 = _interopRequireDefault(_GameUtils);

var _GameInput = require("./GameInput");

var _GameInput2 = _interopRequireDefault(_GameInput);

var _GameScene = require("./GameScene");

var _GameScene2 = _interopRequireDefault(_GameScene);

var _TaskManager = require("./TaskManager");

var _TaskManager2 = _interopRequireDefault(_TaskManager);

var _AnimationManager = require("./AnimationManager");

var _AnimationManager2 = _interopRequireDefault(_AnimationManager);

var _Boot = require("./Boot");

var _Boot2 = _interopRequireDefault(_Boot);

exports.Pattern = _m3gPattern2["default"];
exports.Matrix = _m3gMatrix2["default"];
exports.BoardUtils = _m3gBoardUtils2["default"];
exports.BoardPatterns = _m3gBoardPatterns2["default"];
exports.Board = _m3gBoard2["default"];
exports.GameUtils = _GameUtils2["default"];
exports.GameInput = _GameInput2["default"];
exports.GameScene = _GameScene2["default"];
exports.TaskManager = _TaskManager2["default"];
exports.AnimationManager = _AnimationManager2["default"];
exports.Boot = _Boot2["default"];

},{"./AnimationManager":1,"./Boot":2,"./GameInput":4,"./GameScene":5,"./GameUtils":6,"./TaskManager":8,"./m3g/Board":9,"./m3g/BoardPatterns":10,"./m3g/BoardUtils":11,"./m3g/Matrix":12,"./m3g/Pattern":13}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskManager = (function () {
	function TaskManager() {
		_classCallCheck(this, TaskManager);

		this._tasks = [];
	}

	_createClass(TaskManager, [{
		key: "addTask",
		value: function addTask(task) {
			this._tasks.push(task);
		}
	}, {
		key: "runTasks",
		value: function runTasks() {
			var taskArray = this._tasks.splice(0, 1);
			if (taskArray.length > 0) {
				taskArray[0]();
			}
		}
	}]);

	return TaskManager;
})();

exports["default"] = TaskManager;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _BoardUtils = require("./BoardUtils");

var _BoardUtils2 = _interopRequireDefault(_BoardUtils);

var _Matrix = require("./Matrix");

var _Matrix2 = _interopRequireDefault(_Matrix);

var Board = (function () {
	function Board() {
		_classCallCheck(this, Board);

		this._idCounter = 0;
		this._board = null;
	}

	_createClass(Board, [{
		key: "newBoard",
		value: function newBoard(width, height) {
			this.resetIdCounter();
			this._board = _BoardUtils2["default"].createBoard(width, height, this._generatorFunction.bind(this), this._compareFunction, this._isDuplicateFunction, this.resetIdCounter.bind(this));
		}
	}, {
		key: "newBoardWithSample",
		value: function newBoardWithSample(sampleBoard) {
			this.resetIdCounter();
			var board = [];
			for (var y = 0, row = []; y < sampleBoard.length; y++, row = []) {
				for (var x = 0; x < sampleBoard[y].length; x++) {
					row.push({ type: sampleBoard[y][x], id: this._idCounter++ });
				}
				board.push(row);
			}
			this._board = board;
		}
	}, {
		key: "findMatchedAll",
		value: function findMatchedAll() {
			return _BoardUtils2["default"].findMatchedAll(this._board, this._compareFunction, this._isDuplicateFunction);
		}
	}, {
		key: "testSwap",
		value: function testSwap(sourceX, sourceY, targetX, targetY) {
			return _BoardUtils2["default"].testSwap(this._board, sourceX, sourceY, targetX, targetY, this._compareFunction, this._isDuplicateFunction);
		}
	}, {
		key: "isNear",
		value: function isNear(sourceX, sourceY, targetX, targetY) {
			return _BoardUtils2["default"].isNear(sourceX, sourceY, targetX, targetY);
		}
	}, {
		key: "swap",
		value: function swap(sourceX, sourceY, targetX, targetY) {
			return _BoardUtils2["default"].swap(this._board, sourceX, sourceY, targetX, targetY, this._compareFunction, this._isDuplicateFunction);
		}
	}, {
		key: "findPossibleMatch",
		value: function findPossibleMatch() {
			return _BoardUtils2["default"].findPossibleMatch(this._board, this._compareFunction, this._isDuplicateFunction);
		}
	}, {
		key: "clearMatched",
		value: function clearMatched(matchedResult) {
			return _BoardUtils2["default"].clearMatched(this._board, matchedResult, this._toEmptyFunction);
		}
	}, {
		key: "triggerGravity",
		value: function triggerGravity() {
			return _BoardUtils2["default"].triggerGravity(this._board, this._isEmptyFunction);
		}
	}, {
		key: "fillEmpty",
		value: function fillEmpty() {
			return _BoardUtils2["default"].fillEmpty(this._board, this._isEmptyFunction, this._generatorFunction.bind(this));
		}
	}, {
		key: "debugPrint",
		value: function debugPrint(matchedResult, printWhat) {
			_BoardUtils2["default"].debugPrint(this._board, matchedResult, printWhat);
		}
	}, {
		key: "getBoard",
		value: function getBoard() {
			return this._board;
		}
	}, {
		key: "getIdCounter",
		value: function getIdCounter() {
			return this.idCounter;
		}
	}, {
		key: "getElementWithXY",
		value: function getElementWithXY(x, y) {
			if (!_Matrix2["default"].isInBound(this.getBoard(), x, y)) {
				return null;
			}
			var board = this.getBoard();
			return board[y][x];
		}
	}, {
		key: "getElementWithId",
		value: function getElementWithId(id) {
			var board = this.getBoard();
			for (var y = 0; y < board.length; y++) {
				for (var x = 0; x < board[y].length; x++) {
					if (board[y][x].id === id) {
						return {
							x: x,
							y: y,
							element: board[y][x]
						};
					}
				}
			}
			return null;
		}
	}, {
		key: "_generatorFunction",
		value: function _generatorFunction() {
			var index = Math.floor(Math.random() * Board.TYPES.length);
			return {
				type: Board.TYPES[index],
				id: this._idCounter++
			};
		}
	}, {
		key: "_compareFunction",
		value: function _compareFunction(ele1, ele2) {
			return ele1.type === ele2.type;
		}
	}, {
		key: "_isDuplicateFunction",
		value: function _isDuplicateFunction(ele1, ele2) {
			return ele1.type === ele2.type && ele1.id === ele2.id;
		}
	}, {
		key: "_toEmptyFunction",
		value: function _toEmptyFunction(ele) {
			return { type: Board.EMPTY, id: -1 };
		}
	}, {
		key: "_isEmptyFunction",
		value: function _isEmptyFunction(ele) {
			return ele.type === Board.EMPTY;
		}
	}, {
		key: "resetIdCounter",
		value: function resetIdCounter() {
			this._idCounter = 0;
		}
	}], [{
		key: "PRINT_TYPE",
		value: function PRINT_TYPE(ele) {
			return ele.type;
		}
	}, {
		key: "PRINT_ID",
		value: function PRINT_ID(ele) {
			return ele.id;
		}
	}, {
		key: "TYPES",
		get: function get() {
			return [1, 2, 3, 4, 5, 6, 7, 8];
		}
	}, {
		key: "EMPTY",
		get: function get() {
			return 0;
		}
	}]);

	return Board;
})();

exports["default"] = Board;
module.exports = exports["default"];

},{"./BoardUtils":11,"./Matrix":12}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Matrix = require("./Matrix");

var _Matrix2 = _interopRequireDefault(_Matrix);

var horizontalPattern1 = [[1, 1, 0], [0, 0, 1]];
var horizontalPattern2 = [[1, 0, 0], [0, 1, 1]];
var horizontalPattern3 = [[1, 0, 1], [0, 1, 0]];
var horizontalPattern4 = [[1, 1, 0, 1]];
var horizontalPattern5 = [[1, 0, 1, 1]];
var verticalPattern1 = _Matrix2["default"].transpose(horizontalPattern1);
var verticalPattern2 = _Matrix2["default"].transpose(horizontalPattern2);
var verticalPattern3 = _Matrix2["default"].transpose(horizontalPattern3);
var verticalPattern4 = _Matrix2["default"].transpose(horizontalPattern4);
var verticalPattern5 = _Matrix2["default"].transpose(horizontalPattern5);

var BoardPatterns = [{ pattern: horizontalPattern1, anchorX: 0, anchorY: 0 }, { pattern: horizontalPattern1, anchorX: 0, anchorY: 1 }, { pattern: horizontalPattern2, anchorX: 0, anchorY: 0 }, { pattern: horizontalPattern2, anchorX: 0, anchorY: 1 }, { pattern: horizontalPattern3, anchorX: 0, anchorY: 0 }, { pattern: horizontalPattern3, anchorX: 0, anchorY: 1 }, { pattern: horizontalPattern4, anchorX: 0, anchorY: 0 }, { pattern: horizontalPattern5, anchorX: 0, anchorY: 0 }, { pattern: verticalPattern1, anchorX: 0, anchorY: 0 }, { pattern: verticalPattern1, anchorX: 1, anchorY: 0 }, { pattern: verticalPattern2, anchorX: 0, anchorY: 0 }, { pattern: verticalPattern2, anchorX: 1, anchorY: 0 }, { pattern: verticalPattern3, anchorX: 0, anchorY: 0 }, { pattern: verticalPattern3, anchorX: 1, anchorY: 0 }, { pattern: verticalPattern4, anchorX: 0, anchorY: 0 }, { pattern: verticalPattern5, anchorX: 0, anchorY: 0 }];

exports["default"] = BoardPatterns;
module.exports = exports["default"];

},{"./Matrix":12}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Matrix = require("./Matrix");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _Pattern = require("./Pattern");

var _Pattern2 = _interopRequireDefault(_Pattern);

var _BoardPatterns = require("./BoardPatterns");

var _BoardPatterns2 = _interopRequireDefault(_BoardPatterns);

var BoardUtils = {
	/**
 	find same element with a given point on board.
 	@arg {array} board - 2d array.
 	@arg {number} startX - startX.
 	@arg {number} startY - startY.
 	@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@arg {function} isDuplicateFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@return {object} - will return a list of matched elements, like following example: (will return an empty array if not found)
 		[
 			{x: 1, y: 3, element: ele},
 			{x: x, y: y, element: ele},
 			...
 		]
 */
	findMatched: function findMatched(board, startX, startY, compareFunction, isDuplicateFunction) {
		var targetElement = board[startY][startX];
		var rightList = [];
		var downList = [];
		var resultList = [];

		walkDirection(board, startX, startY, targetElement, "right", rightList);
		walkDirection(board, startX, startY, targetElement, "down", downList);

		resultList = rightList.length >= 3 ? resultList.concat(rightList) : resultList;
		resultList = downList.length >= 3 ? resultList.concat(downList) : resultList;

		return BoardUtils._removeMatchedDuplicates(resultList, isDuplicateFunction);

		function walkDirection(board, x, y, targetElement, direction, matchedList) {
			if (!isValidDirection(board, x, y, targetElement)) {
				return;
			}
			matchedList.push({ x: x, y: y, element: board[y][x] });
			switch (direction) {
				case "right":
					walkDirection(board, x + 1, y, targetElement, "right", matchedList);break;
				case "down":
					walkDirection(board, x, y + 1, targetElement, "down", matchedList);break;
			}
		}

		function isValidDirection(board, x, y, targetElement) {
			return _Matrix2["default"].isInBound(board, x, y) && compareFunction(targetElement, board[y][x]);
		}
	},

	/**
 	find same element with a given board.
 	@arg {array} board - 2d array.
 	@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@arg {function} isDuplicateFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@return {object} - will return a list of matched elements, like following example: (will return an empty array if not found)
 		[
 			{x: 1, y: 3, element: ele},
 			{x: x, y: y, element: ele},
 			...
 		]
 */
	findMatchedAll: function findMatchedAll(board, compareFunction, isDuplicateFunction) {
		var resultList = [];
		for (var y = 0; y < board.length; y++) {
			for (var x = 0; x < board[y].length; x++) {
				var result = BoardUtils.findMatched(board, x, y, compareFunction, isDuplicateFunction);
				resultList = resultList.concat(result);
			}
		}
		return BoardUtils._removeMatchedDuplicates(resultList, isDuplicateFunction);
	},

	/**
 	test if it's a successful swap with given points. Won't modify the original board.
 	@arg {array} board - 2d array.
 	@arg {number} sourceX - sourceX.
 	@arg {number} sourceY - sourceY.
 	@arg {number} targetX - targetX.
 	@arg {number} targetY - targetY.
 	@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@arg {function} isDuplicateFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@return {array, boolean} - will return an list of matched elements. Only returns array with 3+ elements on success or false on failure.
 */
	testSwap: function testSwap(board, sourceX, sourceY, targetX, targetY, compareFunction, isDuplicateFunction) {
		if (!(_Matrix2["default"].isInBound(board, sourceX, sourceY) && _Matrix2["default"].isInBound(board, targetX, targetY))) {
			return false;
		}
		if (!BoardUtils.isNear(sourceX, sourceY, targetX, targetY)) {
			return false;
		}
		var cloneBoard = _Matrix2["default"].clone(board);
		_Matrix2["default"].swap(cloneBoard, sourceX, sourceY, targetX, targetY);
		var result = BoardUtils.findMatchedAll(cloneBoard, compareFunction, isDuplicateFunction);
		return result.length >= 3 ? result : false;
	},

	/**
 	Test if target point is only near center point's up, down, left, right. Center point is based on sourceX and sourceY.
 	@arg {number} sourceX - sourceX.
 	@arg {number} sourceY - sourceY.
 	@arg {number} targetX - targetX.
 	@arg {number} targetY - targetY.
 	@return {boolean} - true if it fulfills the requirements, false on not.
 */
	isNear: function isNear(sourceX, sourceY, targetX, targetY) {
		var diffX = Math.abs(targetX - sourceX);
		var diffY = Math.abs(targetY - sourceY);
		return diffX + diffY === 1 ? true : false;
	},

	/**
 	Almost identical to testSwap, except it will modify original board on success.
 */
	swap: function swap(board, sourceX, sourceY, targetX, targetY, compareFunction, isDuplicateFunction) {
		var result = BoardUtils.testSwap(board, sourceX, sourceY, targetX, targetY, compareFunction, isDuplicateFunction);
		if (result) {
			_Matrix2["default"].swap(board, sourceX, sourceY, targetX, targetY);
		}
		return result;
	},

	/**
 	Find all possible match on a board.
 	@arg {array} board - 2d array.
 	@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@arg {function} isDuplicateFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@return {array} - will return a list of matched elements. Returns an empty array if no matched elements was found.
 */
	findPossibleMatch: function findPossibleMatch(board, compareFunction, isDuplicateFunction) {
		var resultList = [];
		for (var y = 0; y < board.length; y++) {
			for (var x = 0; x < board[y].length; x++) {
				for (var i = 0; i < _BoardPatterns2["default"].length; i++) {
					var result = _Pattern2["default"].comparePattern(board, x, y, _BoardPatterns2["default"][i].pattern, _BoardPatterns2["default"][i].anchorX, _BoardPatterns2["default"][i].anchorY, compareFunction);
					if (result) {
						resultList = resultList.concat(result);
					}
				}
			}
		}
		resultList = BoardUtils._removeMatchedDuplicates(resultList, isDuplicateFunction);
		return resultList;
	},

	/**
 	Clear all matched elements with matchResult.
 	@arg {array} board - 2d array.
 	@arg {array} matchResult - can be obtained by invoking findMatchedAll.
 	@arg {function} toEmptyFunction - what are you gonna do when an element is set to empty. Has 1 parameter with ele.
 	@return {array} - will return an array with removed elements. Formation is same to findMatched's result.
 */
	clearMatched: function clearMatched(board, matchResult, toEmptyFunction) {
		var removedList = [];
		matchResult.forEach(function (ele) {
			removedList.push({ x: ele.x, y: ele.y, element: board[ele.y][ele.x] });
			board[ele.y][ele.x] = toEmptyFunction(ele);
		});
		return removedList;
	},

	/**
 	Make element fall when there are empty elements stay in the given board.
 	@arg {array} board - 2d array.
 	@arg {function} isEmptyFunction - tell this function what does empty look like in the given board. Has 1 parameter with board[y][x].
 	@return {array} - will return an array with elements affected by gravity. Formation looks like following:
 		[
 			{fromX: 2, fromY: 0, toX: 2, toY: 5, element: 6},
 			{fromX: 3, fromY: 5, toX: 3, toY: 7, element: 2},
 			...
 		]
 */
	triggerGravity: function triggerGravity(board, isEmptyFunction) {
		var resultList = [];
		for (var x = 0; x < board[0].length; x++) {
			for (var y = board[x].length - 1; y >= 0; y--) {
				if (isEmptyFunction(board[y][x])) {
					for (var y2 = y - 1; y2 >= 0; y2--) {
						if (!isEmptyFunction(board[y2][x])) {
							resultList.push({ fromX: x, fromY: y2, toX: x, toY: y, element: board[y2][x] });
							_Matrix2["default"].swap(board, x, y, x, y2);
							break;
						}
					}
				}
			}
		}
		return resultList;
	},

	/**
 	Fill empty elements with randomly picked element.
 	@arg {array} board - 2d array.
 	@arg {function} isEmptyFunction - tell this function what does empty look like in the given board. Has 1 parameter with board[y][x].
 	@arg {function} generatorFunction - let user decide how new elements were made.
 	@return {array} - will return an array with elements used for filling the empty.
 */
	fillEmpty: function fillEmpty(board, isEmptyFunction, generatorFunction) {
		var resultList = [];
		for (var y = 0; y < board.length; y++) {
			for (var x = 0; x < board[y].length; x++) {
				if (isEmptyFunction(board[y][x])) {
					board[y][x] = generatorFunction();
					resultList.push({ x: x, y: y, element: board[y][x] });
				}
			}
		}
		return resultList;
	},

	/**
 	Create an new board.
 	@arg {number} width - board width.
 	@arg {number} height - board height.
 	@arg {function} generatorFunction - let user decide how new elements were made.
 	@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@arg {function} isDuplicateFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
 	@arg {function} onAgain - will be exeucted when not successfully create.
 	@return {2d-array} - give you an new board.
 */
	createBoard: function createBoard(width, height, generatorFunction, compareFunction, isDuplicateFunction, onAgain) {
		var board = undefined,
		    matchedList = undefined,
		    possibleMatchedList = undefined;
		do {
			if (onAgain) {
				onAgain();
			}
			board = _Matrix2["default"].create(width, height, generatorFunction);
			matchedList = BoardUtils.findMatchedAll(board, compareFunction, isDuplicateFunction);
			possibleMatchedList = BoardUtils.findPossibleMatch(board, compareFunction, isDuplicateFunction);
		} while (matchedList.length > 0 || possibleMatchedList.length < 3);
		return board;
	},

	/**
 	@arg {2d-array} board - board.
 	@arg {arry} matchedResult - get one from findMatched or findMatchedAll.
 	@arg {function} valueFunction - decide what user want to output. Will pass in an element.
 */
	debugPrint: function debugPrint(board, matchedResult, valueFunction) {
		var boardOutput = "";
		var matchedOutput = "";
		for (var y = 0; y < board.length; y++) {
			for (var x = 0; x < board[y].length; x++) {
				boardOutput += valueFunction(board[y][x]) + ", ";
				if (matchedResult) {
					var index = undefined;
					for (var i = 0; i < matchedResult.length; i++) {
						if (x === matchedResult[i].x && y === matchedResult[i].y) {
							index = i;
						}
					}
					matchedOutput += index >= 0 ? valueFunction(matchedResult[index].element) + ", " : " " + ", ";
				}
			}
			boardOutput += "\n";
			matchedOutput += "\n";
		}

		console.log("board:");
		console.log(boardOutput);
		if (matchedResult) {
			console.log("matched:");
			console.log(matchedOutput);
		}
	},

	_removeMatchedDuplicates: function _removeMatchedDuplicates(list, isDuplicateFunction) {
		var resultList = [];

		var _loop = function (i) {
			var hasOne = false;
			resultList.forEach(function (ele) {
				if (list[i].x === ele.x && list[i].y === ele.y && isDuplicateFunction(list[i].element, ele.element)) {
					hasOne = true;
					return;
				}
			});
			if (!hasOne) {
				resultList.push(list[i]);
			}
		};

		for (var i = 0; i < list.length; i++) {
			_loop(i);
		}
		return resultList;
	}
};

exports["default"] = BoardUtils;
module.exports = exports["default"];

},{"./BoardPatterns":10,"./Matrix":12,"./Pattern":13}],12:[function(require,module,exports){
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
	},

	swap: function swap(matrix, sourceX, sourceY, targetX, targetY) {
		var temp = matrix[targetY][targetX];
		matrix[targetY][targetX] = matrix[sourceY][sourceX];
		matrix[sourceY][sourceX] = temp;
		return {
			source: { x: sourceX, y: sourceY, type: matrix[sourceY][sourceX] },
			target: { x: targetX, y: targetY, type: matrix[targetY][targetX] }
		};
	},

	/**
 	@arg {number} width		- Width.
 	@arg {number} height	- Height.
 	@arg {function} generatorFunction - let user decide how new elements were made.
 */
	create: function create(width, height, generatorFunction) {
		var matrix = [];
		for (var y = 0, row = []; y < height; y++, row = []) {
			for (var x = 0; x < width; x++) {
				row.push(generatorFunction());
			}
			matrix.push(row);
		};
		return matrix;
	},

	clone: function clone(matrix) {
		var clone = [];
		matrix.forEach(function (ele) {
			clone.push(ele.slice(0));
		});
		return clone;
	}
};

exports["default"] = Matrix;
module.exports = exports["default"];

},{}],13:[function(require,module,exports){
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
		var targetElement = pattern[anchorY][anchorX];
		var counter = 0;
		for (var y = 0; y < pattern.length; y++) {
			for (var x = 0; x < pattern[y].length; x++) {
				if (pattern[y][x] === targetElement) {
					var diffX = x - anchorX;
					var diffY = y - anchorY;
					diff.push({ x: diffX, y: diffY });
					counter++;
				}
			}
		}
		return { diff: diff, counter: counter };
	},

	comparePattern: function comparePattern(matrix, x, y, pattern, anchorX, anchorY, compareFunction) {
		var patternResult = Pattern.makePattern(pattern, anchorX, anchorY);
		var result = [];
		var targetElement = matrix[y][x];
		var counter = 0;
		for (var i = 0; i < patternResult.diff.length; i++) {
			var newX = x + patternResult.diff[i].x;
			var newY = y + patternResult.diff[i].y;
			if (_Matrix2["default"].isInBound(matrix, newX, newY)) {
				if (compareFunction(targetElement, matrix[newY][newX])) {
					counter++;
					result.push({ x: newX, y: newY, element: matrix[newY][newX] });
				}
			}
		}
		return counter === patternResult.counter ? result : null;
	}
};

exports["default"] = Pattern;
module.exports = exports["default"];

},{"./Matrix":12}]},{},[7])(7)
});


//# sourceMappingURL=Main.js.map
