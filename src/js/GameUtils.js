let GameUtils = {
	convertToBoardPosition: function(x, y, tileSize){
		return {
			x: Math.floor(x / tileSize),
			y: Math.floor(y / tileSize)
		};
	},

	convertToViewPosition: function(x, y, tileSize){
		return {
			x: x * tileSize,
			y: y * tileSize
		};
	},
};

export {GameUtils as default}
