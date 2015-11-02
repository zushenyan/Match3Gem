let Matrix = {
	transpose: function(matrix){
		let height = matrix.length;
		let width = matrix[0].length;
		let newArray = [];
		let newMatrix = [];

		// to one-dimensional first
		for(let i = 0; i < height; i++){
			newArray = newArray.concat(matrix[i]);
		}

		/*
			if origin size:		width = 2, height = 3
			new one will be:	width = 3, height = 2
		*/
		for(let i = 0; i < width; i++){
			let row = [];
			let indexToNewArray = i;
			while(newArray[indexToNewArray] !== undefined){
				row.push(newArray[indexToNewArray]);
				indexToNewArray += width;
			}
			if(row.length > 0){ newMatrix.push(row); };
		}

		return newMatrix;
	},

	isInBound: function(matrix, x, y){
		let height = matrix.length;
		let width = matrix[0].length;
		return ((x >= 0 && x < width) && (y >= 0 && y < height)) ? true : false;
	},

	swap: function(matrix, sourceX, sourceY, targetX, targetY){
		let temp = matrix[targetY][targetX];
		matrix[targetY][targetX] = matrix[sourceY][sourceX];
		matrix[sourceY][sourceX] = temp;
		return {
			source: {x: sourceX, y: sourceY, type: matrix[sourceY][sourceX]},
			target: {x: targetX, y: targetY, type: matrix[targetY][targetX]}
		}
	},

	/**
		@arg {number} width		- Width.
		@arg {number} height	- Height.
		@arg {array} 	types		- Initial value of every element. Pick up randomly from types array.
	*/
	create: function(width, height, types){
		let matrix = [];
		for(let y = 0, row = []; y < height; y++, row = []){
			for(let x = 0; x < width; x++){
				row.push(Matrix.generateTypes(types));
			}
			matrix.push(row);
		};
		return matrix;
	},

	clone: function(matrix){
		let clone = [];
		matrix.forEach((ele) => {
			clone.push(ele.slice(0));
		});
		return clone;
	},

	generateTypes: function(types){
		let index = Math.floor(Math.random() * types.length);
		return types[index];
	},
};

export {Matrix as default};
