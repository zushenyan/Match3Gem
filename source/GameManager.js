var GameManager = (function(){
	var GameManager = function(time, score){
		this._isGameOver = false;
		this._listeners = [];

		this.setTimeLeft(time);
		this.setScore(score || 0);
	};

	GameManager.prototype.updateTime = function(dt) {
		this.setTimeLeft(this.getTimeLeft() - dt);
		this.messageTimeUpdated();
	};

	GameManager.prototype.isGameOver = function() {
		return this._isGameOver;
	};

	GameManager.prototype.setTimeLeft = function(time) {
		this._timeLeft = time <= 0 ? 0 : time;

		if(this.getTimeLeft() <= 0){
			this._isGameOver = true;
			this.messageGameOver();
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
		this.messageScore();
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

	GameManager.prototype.messageScore = function() {
		for(var i = 0; i < this._listeners.length; i++){
			if(this._listeners[i] && this._listeners[i].__proto__.hasOwnProperty("onScore")){
				this._listeners[i].onScore(this.getScore());
			}
		}
	};

	GameManager.prototype.messageTimeUpdated = function() {
		for(var i = 0; i < this._listeners.length; i++){
			if(this._listeners[i] && this._listeners[i].__proto__.hasOwnProperty("onTimeUpdated")){
				this._listeners[i].onTimeUpdated(this.getTimeLeft());
			}
		}
	};

	GameManager.prototype.messageGameOver = function() {
		for(var i = 0; i < this._listeners.length; i++){
			if(this._listeners[i] && this._listeners[i].__proto__.hasOwnProperty("onGameOver")){
				this._listeners[i].onGameOver();
			}
		}
	};

	return GameManager;
})();