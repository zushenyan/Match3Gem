import Matrix from "./Matrix";
import Pattern from "./Pattern";

let BoardUtils = {
	/**
		find same type of a element with given point on board.
		@arg {array} board - 2d array.
		@arg {number} startX - startX.
		@arg {number} startY - startY.
		@return {object} - will return a list of matched elements, like following example: (will return an empty array if not found)
			[
			{x: 1, y: 3, type: type},
			{x: x, y: y, type: type},
			...
			]
	*/
	findMatched: function(board, startX, startY){
		let targetType = board[startY][startX];
		let rightList = [];
		let downList = [];
		let resultList = [];

		walkDirection(board, startX, startY, targetType, "right", rightList);
		walkDirection(board, startX, startY, targetType, "down", downList);

		resultList = (rightList.length >= 3) ? resultList.concat(rightList) : resultList;
		resultList = (downList.length >= 3) ? resultList.concat(downList) : resultList;

		return BoardUtils._removeMatchedDuplicates(resultList);

		function walkDirection(board, x, y, type, direction, matchedList){
			if(!isValidDirection(board, x, y, type)){ return; }
			matchedList.push({x: x, y: y, type: type});
			switch(direction){
				case "right": walkDirection(board, x + 1, y, type, "right", matchedList); break;
				case "down": walkDirection(board, x, y + 1, type, "down", matchedList); break;
			}
		}

		function isValidDirection(board, x, y, type){
			return Matrix.isInBound(board, x, y) && board[y][x] === type;
		}
	},

	/**
		find same type of all elements with given board.
		@arg {array} board - 2d array.
		@return {object} - will return a list of matched elements, like following example: (will return an empty array if not found)
			[
			{x: 1, y: 3, type: type},
			{x: x, y: y, type: type},
			...
			]
	*/
	findMatchedAll: function(board){
		let resultList = [];
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				let result = BoardUtils.findMatched(board, x, y);
				resultList = resultList.concat(result);
			}
		}
		return BoardUtils._removeMatchedDuplicates(resultList);
	},

	/**
		test if it's a successful swap with given points. Won't modify the original board.
		@arg {array} board - 2d array.
		@arg {number} sourceX - sourceX.
		@arg {number} sourceY - sourceY.
		@arg {number} targetX - targetX.
		@arg {number} targetY - targetY.
		@return {array, boolean} - will return an list of matched elements. Only returns array with 3+ elements on success or false on failure.
	*/
	testSwap: function(board, sourceX, sourceY, targetX, targetY){
		if(!(Matrix.isInBound(board, sourceX, sourceY) && Matrix.isInBound(board, targetX, targetY))){ return false; }
		let cloneBoard = Matrix.clone(board);
		Matrix.swap(cloneBoard, sourceX, sourceY, targetX, targetY);
		let result = BoardUtils.findMatchedAll(cloneBoard);
		return result.length >= 3 ? result : false;
	},

	/**
		Almost identical to testSwap, however will modify on success.
	*/
	swap: function(board, sourceX, sourceY, targetX, targetY){
		let result = BoardUtils.testSwap(board, sourceX, sourceY, targetX, targetY);
		if(result){ Matrix.swap(board, sourceX, sourceY, targetX, targetY); }
		return result;
	},

	/**
		Find all possible match on a board.
		@arg {array} board - 2d array.
		@return {array} - will return a list of matched elements. Returns an empty array if no matched elements was found.
	*/
	findPossibleMatch: function(board){
		let patterns = BoardUtils._generatePatterns();
		let resultList = [];

		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				for(let i = 0; i < patterns.length; i++){
					let result = Pattern.comparePattern(board, x, y, patterns[i].pattern, patterns[i].anchorX, patterns[i].anchorY);
					if(result){ resultList = resultList.concat(result); }
				}
			}
		}
		resultList = BoardUtils._removeMatchedDuplicates(resultList);
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
			removedList.push({x: ele.x, y: ele.y, type: board[ele.y][ele.x]});
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
							resultList.push({fromX: x, fromY: y, toX: x, toY: y2, type: board[y2][x]});
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
		@arg {array} types - used for picking randomly to fill empty elements.
		@arg {object} empty - tell this function what does empty look like in the given board.
		@return {array} - will return an array with elements used for filling the empty.
	*/
	fillEmpty: function(board, types, empty){
		let resultList = [];
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				if(board[y][x] === empty){
					board[y][x] = Matrix.generateTypes(types);
					resultList.push({x: x, y: y, type: board[y][x]});
				}
			}
		}
		return resultList;
	},

	createBoard: function(width, height, types){
		let board, matchedList, possibleMatchedList;
		do{
			board = Matrix.create(width, height, types);
			matchedList = BoardUtils.findMatchedAll(board);
			possibleMatchedList = BoardUtils.findPossibleMatch(board);
		}while(matchedList.length > 0 || possibleMatchedList.length < 3);
		return board;
	},

	debugPrint: function(board, matchedResult){
		let boardOutput = "";
		let matchedOutput = "";
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				boardOutput += board[y][x] + ", ";
				if(matchedResult){
					let index = matchedResult.findIndex((ele, index, arr) => {
						if(x === ele.x && y === ele.y){
							return true;
						}
					});
					matchedOutput += (index >= 0) ? (matchedResult[index].type + ", ") : (" " + ", ");
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

	_removeMatchedDuplicates: function(list){
		let resultList = [];
		for(let i = 0; i < list.length; i++){
			let hasOne = resultList.find((ele) => {
				if(list[i].x === ele.x && list[i].y === ele.y && list[i].type === ele.type){
					return true;
				}
			});
			if(!hasOne){ resultList.push(list[i]); }
		}
		return resultList;
	},

	_generatePatterns: function(){
		let horizontalPattern1 = [
			[1,1,0],
			[0,0,1]
		];
		let horizontalPattern2 = [
			[1,0,0],
			[0,1,1]
		];
		let horizontalPattern3 = [
			[1,0,1],
			[0,1,0]
		];
		let verticalPattern1 = Matrix.transpose(horizontalPattern1);
		let verticalPattern2 = Matrix.transpose(horizontalPattern2);
		let verticalPattern3 = Matrix.transpose(horizontalPattern3);

		return [
			{pattern: horizontalPattern1, anchorX: 0, anchorY: 0},
			{pattern: horizontalPattern1, anchorX: 0, anchorY: 1},
			{pattern: horizontalPattern2, anchorX: 0, anchorY: 0},
			{pattern: horizontalPattern2, anchorX: 0, anchorY: 1},
			{pattern: horizontalPattern3, anchorX: 0, anchorY: 0},
			{pattern: horizontalPattern3, anchorX: 0, anchorY: 1},
			{pattern: verticalPattern1, anchorX: 0, anchorY: 0},
			{pattern: verticalPattern1, anchorX: 1, anchorY: 0},
			{pattern: verticalPattern2, anchorX: 0, anchorY: 0},
			{pattern: verticalPattern2, anchorX: 1, anchorY: 0},
			{pattern: verticalPattern3, anchorX: 0, anchorY: 0},
			{pattern: verticalPattern3, anchorX: 1, anchorY: 0},
		];
	},
};

export {BoardUtils as default};
