var GameManager = (function(){
	var GameManager = function(time, score){
		this._isGameOver = false;
		this._listeners = [];

		this.setTimeLeft(time);
		this.setScore(score || 0);
	};

	GameManager.prototype.updateTime = function(dt) {
		this.setTimeLeft(this.getTimeLeft() - dt);
		this.message("onTimeUpdated", this.getTimeLeft());
	};

	GameManager.prototype.isGameOver = function() {
		return this._isGameOver;
	};

	GameManager.prototype.setTimeLeft = function(time) {
		this._timeLeft = time <= 0 ? 0 : time;

		if(this.getTimeLeft() <= 0){
			this._isGameOver = true;
			this.message("onGameOver");
		}
		else{
			this._isGameOver = false;
		}
	};

	GameManager.prototype.getTimeLeft = function() {
		return this._timeLeft; 
	};

	GameManager.prototype.setScore = function(score) {
		this._score = score;
		this.message("onScore", this.getScore());
	};

	GameManager.prototype.getScore = function() {
		return this._score;
	};

	GameManager.prototype.addScore = function(score) {
		this.setScore(this.getScore() + score);
	};

	/*
		listener will send message to these functions below
		onScore(score)		
		onTimeUpdated(time)
		onGameOver()
	*/
	GameManager.prototype.addListener = function(listener) {
		this._listeners.push(listener);
	};

	GameManager.prototype.message = function(name, args) {
		for(index in this._listeners){
			if(this._listeners[index] && (this._listeners[index])[name]){
				(this._listeners[index])[name](args);
			}
		}
	};

	return GameManager;
})();