m3g.Point = (function(){
	var Point = function(x, y){
		//list member variables
		this._x = null;
		this._y = null;

		this.setX(x);
		this.setY(y);
	};

	Point.prototype.setX = function(x) {
		if(typeof x !== "number"){
			throw new Error("x is not a number");
		}
		this._x = x || 0; 
	};

	Point.prototype.setY = function(y) {
		if(typeof y !== "number"){
			throw new Error("y is not a number");
		}
		this._y = y || 0; 
	};

	Point.prototype.getX = function() {return this._x; };
	Point.prototype.getY = function() {return this._y; };

	return Point;
})();