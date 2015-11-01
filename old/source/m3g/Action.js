m3g.Action = (function(){
	var Action = function(processor, changes){
		this._processor = processor || m3g.ActionProcessor.none;
    	this._changes = changes || [];
	};

	Action.prototype.applyChanges = function(board) {
		this._processor(board, this._changes);
	};

	Action.prototype.hasNoChanges = function() {
	    return this._changes.length === 0;
	};

	Action.prototype.getChanges = function() {
		return this._changes;
	};

	return Action;
})();