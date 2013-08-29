//use converter to deal with coordinate to board location
function ControlController(converter){
	this._boardLocation = [null, null];
	this._converter = converter || null;
	this.setOnTouchesMovedCallback(null);
};

ControlController.prototype.constructor = ControlController;

ControlController.prototype.onTouchesBegan = function(touches, event){
	if(this._boardLocation[0] === null){
		var x = touches[0].getLocation().x;
		var y = touches[0].getLocation().y;
		var pos = this._converter(x, y);
		this._boardLocation[0] = pos;
	}
};

ControlController.prototype.onTouchesMoved = function(touches, event){
	if(this._boardLocation[1] === null){
		var x = touches[0].getLocation().x;
		var y = touches[0].getLocation().y;
		var pos = this._converter(x, y);
		if((this._boardLocation[0].x !== pos.x) ||
			(this._boardLocation[0].y !== pos.y)){
			this._boardLocation[1] = pos;
			this._onTouchesMovedCallback();
		}
	}
};

ControlController.prototype.onTouchesEnded = function(touches, event){
	this._boardLocation[0] = null;
	this._boardLocation[1] = null;
};

ControlController.prototype.getBoardLocation = function() {
	return this._boardLocation;
};

ControlController.prototype.setOnTouchesMovedCallback = function(callback) {
	this._onTouchesMovedCallback = callback;
};

ControlController.prototype.setConverter = function(converter) {
	this._converter = converter;
};