m3g.Change = (function(){
	var Change = function(fromPoint, toPoint){
		//list member variables
		this._fromPoint = null;
		this._toPoint = null;

		this.setFromPoint(fromPoint);
		this.setToPoint(toPoint);
	}

	Change.prototype.setFromPoint = function(point) {
		if(!(point instanceof m3g.Point)){
			throw new Error("point: " + point + " should be m3g.Point");
		}
		this._fromPoint = point;
	};

	Change.prototype.setToPoint = function(point) {
		if(!(point instanceof m3g.Point)){
			throw new Error("point: " + point + " should be m3g.Point");
		}
		this._toPoint = point;
	};

	Change.prototype.getFromPoint = function() {return this._fromPoint; };
	Change.prototype.getToPoint = function() {return this._toPoint; };

	return Change;
})();