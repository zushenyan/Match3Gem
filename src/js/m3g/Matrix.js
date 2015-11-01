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
};

export {Matrix as default};
