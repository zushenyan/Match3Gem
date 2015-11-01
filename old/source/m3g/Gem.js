m3g.Gem = (function(){
	/*
		instance zone
	*/
	var Gem = function(type){
		//list member variables
		this._type = null;

		this.setType(type);
	};

	Gem.prototype.setType = function(type) {
		if(typeof type !== "number"){
			throw new Error("type: " + type + " is not a number");
		}
		else if(type < 0 || type >= Gem.GEM_TYPE_NORMAL.length){
			throw new Error("type: " + type + " is out of bound");
		}
		this._type = type;
	};

	Gem.prototype.getType = function() {
		return this._type; 
	};

	/*
		static zone
	*/

	Gem.GEM_TYPE_NORMAL = [0,1,2,3,4,5,6,7];
	Gem.GEM_TYPE_EMPTY = 0;

	Gem.createRandomGem = function(){
		return new Gem(Gem.generateRandomGemType());
	};

	Gem.generateRandomGemType = function(){
		return Math.floor(Math.random() * (Gem.GEM_TYPE_NORMAL.length - 1) + 1);
	};

	Gem.isAType = function(type){
		if(typeof type !== "number"){
			return false;
		}
		else if(type < 0 || type >= Gem.GEM_TYPE_NORMAL.length){
			return false;
		}
		return true;
	};

	return Gem;
})();