import Matrix from "./Matrix";
import Pattern from "./Pattern";
import BoardPatterns from "./BoardPatterns";

let BoardUtils = {
	/**
		find same type of a element with given point on board.
		@arg {array} board - 2d array.
		@arg {number} startX - startX.
		@arg {number} startY - startY.
		@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
		@return {object} - will return a list of matched elements, like following example: (will return an empty array if not found)
			[
				{x: 1, y: 3, element: ele},
				{x: x, y: y, element: ele},
				...
			]
	*/
	findMatched: function(board, startX, startY, compareFunction){
		let targetElement = board[startY][startX];
		let rightList = [];
		let downList = [];
		let resultList = [];

		walkDirection(board, startX, startY, targetElement, "right", rightList);
		walkDirection(board, startX, startY, targetElement, "down", downList);

		resultList = (rightList.length >= 3) ? resultList.concat(rightList) : resultList;
		resultList = (downList.length >= 3) ? resultList.concat(downList) : resultList;

		return BoardUtils._removeMatchedDuplicates(resultList, compareFunction);

		function walkDirection(board, x, y, targetElement, direction, matchedList){
			if(!isValidDirection(board, x, y, targetElement)){ return; }
			matchedList.push({x: x, y: y, element: targetElement});
			switch(direction){
				case "right": walkDirection(board, x + 1, y, targetElement, "right", matchedList); break;
				case "down": walkDirection(board, x, y + 1, targetElement, "down", matchedList); break;
			}
		}

		function isValidDirection(board, x, y, targetElement){
			return (Matrix.isInBound(board, x, y) && compareFunction(targetElement, board[y][x]));
		}
	},

	/**
		find same type of all elements with given board.
		@arg {array} board - 2d array.
		@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
		@return {object} - will return a list of matched elements, like following example: (will return an empty array if not found)
			[
				{x: 1, y: 3, element: ele},
				{x: x, y: y, element: ele},
				...
			]
	*/
	findMatchedAll: function(board, compareFunction){
		let resultList = [];
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				let result = BoardUtils.findMatched(board, x, y, compareFunction);
				resultList = resultList.concat(result);
			}
		}
		return BoardUtils._removeMatchedDuplicates(resultList, compareFunction);
	},

	/**
		test if it's a successful swap with given points. Won't modify the original board.
		@arg {array} board - 2d array.
		@arg {number} sourceX - sourceX.
		@arg {number} sourceY - sourceY.
		@arg {number} targetX - targetX.
		@arg {number} targetY - targetY.
		@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
		@return {array, boolean} - will return an list of matched elements. Only returns array with 3+ elements on success or false on failure.
	*/
	testSwap: function(board, sourceX, sourceY, targetX, targetY, compareFunction){
		if(!(Matrix.isInBound(board, sourceX, sourceY) && Matrix.isInBound(board, targetX, targetY))){ return false; }
		if(!isNear(board, sourceX, sourceY, targetX, targetY)){ return false; }
		let cloneBoard = Matrix.clone(board);
		Matrix.swap(cloneBoard, sourceX, sourceY, targetX, targetY);
		let result = BoardUtils.findMatchedAll(cloneBoard, compareFunction);
		return result.length >= 3 ? result : false;

		function isNear(board, sourceX, sourceY, targetX, tagretY){
			let diffX = Math.abs(targetX - sourceX);
			let diffY = Math.abs(targetY - sourceY);
			if(diffX > 1 || diffY > 1){ return false; }
			return (Math.abs(diffX - diffY) === 1) ? true : false;
		}
	},

	/**
		Almost identical to testSwap, except it will modify original board on success.
	*/
	swap: function(board, sourceX, sourceY, targetX, targetY, compareFunction){
		let result = BoardUtils.testSwap(board, sourceX, sourceY, targetX, targetY, compareFunction);
		if(result){ Matrix.swap(board, sourceX, sourceY, targetX, targetY); }
		return result;
	},

	/**
		Find all possible match on a board.
		@arg {array} board - 2d array.
		@arg {function} compareFunction - used for comparing between two elements. Will pass two parameters: ele1 and ele2.
		@return {array} - will return a list of matched elements. Returns an empty array if no matched elements was found.
	*/
	findPossibleMatch: function(board, compareFunction){
		let resultList = [];
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				for(let i = 0; i < BoardPatterns.length; i++){
					let result = Pattern.comparePattern(board, x, y, BoardPatterns[i].pattern, BoardPatterns[i].anchorX, BoardPatterns[i].anchorY, compareFunction);
					if(result){ resultList = resultList.concat(result); }
				}
			}
		}
		resultList = BoardUtils._removeMatchedDuplicates(resultList, compareFunction);
		return resultList;
	},

	/**
		Clear all matched elements with matchResult.
		@arg {array} board - 2d array.
		@arg {array} matchResult - can be obtained by invoking findMatchedAll.
		@arg {object} empty - tell this function what is empty look like in the given board.
		@return {array} - will return an array with removed elements. Formation is same to findMatched's result.
	*/
	clearMatched: function(board, matchResult, empty){
		let removedList = [];
		matchResult.forEach((ele) => {
			removedList.push({x: ele.x, y: ele.y, element: board[ele.y][ele.x]});
			board[ele.y][ele.x] = empty;
		});
		return removedList;
	},

	/**
		Make element fall when there are empty elements stay in the given board.
		@arg {array} board - 2d array.
		@arg {object} empty - tell this function what does empty look like in the given board.
		@return {array} - will return an array with elements affected by gravity. Formation looks like following:
			[
				{fromX: 2, fromY: 0, toX: 2, toY: 5, type: 6},
				{fromX: 3, fromY: 5, toX: 3, toY: 7, type: 2},
				...
			]
	*/
	triggerGravity: function(board, empty){
		let resultList = [];
		for(let x = 0; x < board[0].length; x++){
			for(let y = board[x].length - 1; y >= 0; y--){
				if(board[y][x] === empty){
					for(let y2 = y - 1; y2 >= 0; y2--){
						if(board[y2][x] !== empty){
							resultList.push({fromX: x, fromY: y, toX: x, toY: y2, element: board[y2][x]});
							Matrix.swap(board, x, y, x, y2);
							break;
						}
					}
				}
			}
		}
		return resultList;
	},

	/**
		Fill empty elements with randomly picked type.
		@arg {array} board - 2d array.
		@arg {object} empty - tell this function what does empty look like in the given board.
		@arg {function} generatorFunction - let user decide how new elements were made.
		@return {array} - will return an array with elements used for filling the empty.
	*/
	fillEmpty: function(board, empty, generatorFunction){
		let resultList = [];
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				if(board[y][x] === empty){
					board[y][x] = generatorFunction();
					resultList.push({x: x, y: y, element: board[y][x]});
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
		@return {2d-array} - give you an new board.
	*/
	createBoard: function(width, height, generatorFunction, compareFunction){
		let board, matchedList, possibleMatchedList;
		do{
			board = Matrix.create(width, height, generatorFunction);
			matchedList = BoardUtils.findMatchedAll(board, compareFunction);
			possibleMatchedList = BoardUtils.findPossibleMatch(board, compareFunction);
		}while(matchedList.length > 0 || possibleMatchedList.length < 3);
		return board;
	},

	/**
		@arg {2d-array} board - board.
		@arg {arry} matchedResult - get one from findMatched or findMatchedAll.
		@arg {function} valueFunction - decide what user want to output. Will pass in an element.
	*/
	debugPrint: function(board, matchedResult, valueFunction){
		let boardOutput = "";
		let matchedOutput = "";
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				boardOutput += valueFunction(board[y][x]) + ", ";
				if(matchedResult){
					let index = matchedResult.findIndex((ele, index, arr) => {
						if(x === ele.x && y === ele.y){
							return true;
						}
					});
					matchedOutput += (index >= 0) ? (valueFunction(matchedResult[index].element) + ", ") : (" " + ", ");
				}
			}
			boardOutput += "\n";
			matchedOutput += "\n";
		}

		console.log("board:");
		console.log(boardOutput);
		if(matchedResult){
			console.log("matched:");
			console.log(matchedOutput);
		}
	},

	_removeMatchedDuplicates: function(list, compareFunction){
		let resultList = [];
		for(let i = 0; i < list.length; i++){
			let hasOne = resultList.find((ele) => {
				if(list[i].x === ele.x && list[i].y === ele.y && compareFunction(list[i].element, ele.element)){
					return true;
				}
			});
			if(!hasOne){ resultList.push(list[i]); }
		}
		return resultList;
	},
};

export {BoardUtils as default};
