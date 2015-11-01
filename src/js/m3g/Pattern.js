import Matrix from "./Matrix";

let Pattern = {
	makePattern: function(pattern, anchorX, anchorY){
		if(!(Matrix.isInBound(pattern, anchorX, anchorY))){ throw new Error(`Anchor is out of bound! ${anchorX}, ${anchorY}`); }
		let diff = [];
		let targetType = pattern[anchorY][anchorX];
		let counter = 0;
		for(let y = 0; y < pattern.length; y++){
			for(let x = 0; x < pattern[y].length; x++){
				if(pattern[y][x] === targetType){
					let diffX = x - anchorX;
					let diffY = y - anchorY;
					diff.push({x: diffX, y: diffY});
					counter++;
				}
			}
		}
		return {diff: diff, counter: counter};
	},

	comparePattern: function(board, x, y, pattern, anchorX, anchorY){
		let patternResult = Pattern.makePattern(pattern, anchorX, anchorY);
		let result = [];
		let targetType = board[y][x];
		let counter = 0;
		for(let i = 0; i < patternResult.diff.length; i++){
			let newX = x + patternResult.diff[i].x;
			let newY = y + patternResult.diff[i].y;
			if(Matrix.isInBound(board, newX, newY)){
				if(board[newY][newX] === targetType){
					counter++;
					result.push({x: newX, y: newY, type: board[newY][newX]});
				}
			}
		}
		return counter === patternResult.counter ? result : null;
	},
};

export {Pattern as default};
