function Gem(type){
	this._type = null;

	this.init();
	this.setType(type);
}

Gem.prototype.constructor = Gem;

/*
	static zone
*/

Gem.GEMS_NORMAL = [0,1,2,3,4,5,6,7];
Gem.GEMS_EMPTY = 0;

Gem.createGem = function(type){
	return new Gem(type);
};

Gem.createRandomGem = function(){
	var type = Math.floor(Math.random() * (Gem.GEMS_NORMAL.length - 1) + 1);

	var gem = new Gem(type);

	return gem;
};

/*
	instance zone
*/

Gem.prototype.init = function(){
	this._type = 0;
};

Gem.prototype.setType = function(type){
	if(type < 0 || type >= Gem.GEMS_NORMAL.length){
		throw "type is not in bound " + type;
	}

	this._type = type;
};

Gem.prototype.getType = function(){
	return this._type;
};