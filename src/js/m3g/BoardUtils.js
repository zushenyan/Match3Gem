import Matrix from "./Matrix";
import Pattern from "./Pattern";

let BoardUtils = {
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

	testSwap: function(board, sourceX, sourceY, targetX, targetY){
		if(!(Matrix.isInBound(board, sourceX, sourceY) && Matrix.isInBound(board, targetX, targetY))){ return false; }
		let cloneBoard = BoardUtils.cloneBoard(board);
		BoardUtils._swapHelpper(cloneBoard, sourceX, sourceY, targetX, targetY);
		let result = BoardUtils.findMatchedAll(cloneBoard);
		return result.length >= 3 ? result : false;
	},

	swap: function(board, sourceX, sourceY, targetX, targetY){
		let result = BoardUtils.testSwap(board, sourceX, sourceY, targetX, targetY);
		if(result){ BoardUtils._swapHelpper(board, sourceX, sourceY, targetX, targetY); }
		return result;
	},

	hasPossibleMatch: function(board){
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
		@arg {array} board - 2d array.
		@arg {boolean} onlySize - only copy its height and width, false on default.
	*/
	cloneBoard: function(board, onlySize = false){
		let clone = [];

		if(onlySize){
			for(let y = 0; y < board.length; y++){
				clone.push([]);
				for(let x = 0; x < board[y].length; x++){
					clone[y][x] = BoardUtils.UNVISITED;
				}
			}
		}
		else{
			board.forEach((ele) => {
				clone.push(ele.slice(0));
			});
		}
		return clone;
	},

	debugPrint: function(board, matchedResult){
		let boardOutput = "";
		let matchedOutput = "";
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				boardOutput += board[y][x] + ", ";

				let index = matchedResult.findIndex((ele, index, arr) => {
					if(x === ele.x && y === ele.y){
						return true;
					}
				});
				matchedOutput += (index >= 0) ? (matchedResult[index].type + ", ") : (" " + ", ");
			}
			boardOutput += "\n";
			matchedOutput += "\n";
		}

		console.log("board:");
		console.log(boardOutput);
		console.log("matched:");
		console.log(matchedOutput);
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

	_swapHelpper: function(board, sourceX, sourceY, targetX, targetY){
		let temp = board[targetY][targetX];
		board[targetY][targetX] = board[sourceY][sourceX];
		board[sourceY][sourceX] = temp;
		return {
			source: {x: sourceX, y: sourceY, type: board[sourceY][sourceX]},
			target: {x: targetX, y: targetY, type: board[targetY][targetX]}
		}
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

	VISITED: 2,
	UNVISITED: 1,
};

export {BoardUtils as default};
