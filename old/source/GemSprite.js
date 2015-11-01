var GemSprite = cc.Sprite.extend({
	_velocityMode: null,
	_hasLanded: null,
	_toggleGravity: null,
	_velocity: null,
	_destinationPosition: null,

	ctor: function(){
		this._super();

		this.setVelocityMode(GemSprite.VELOCITY_MODE_ACCELERATION);
		this._velocity = cc.p(0, 0);
		this.toggleGravityOn(true);
		this._destinationPosition = cc.p(this.getPositionX(), this.getPositionY());
	},
	update: function(dt){
		this.updatePosition(dt);
	},
	setDestinationPosition: function(p){
		this._destinationPosition = p;
	},
	toggleGravityOn: function(b){
		this._toggleGravity = b;
	},
	isGravityOn: function(){
		return this._toggleGravity;
	},
	hasLanded: function(){
		return this._hasLanded;
	},
	setVelocityMode: function(mode){
		this._velocityMode = mode;
	},
	updateVelocity: function(){
		if(this._velocityMode === GemSprite.VELOCITY_MODE_CONSTANT){
			this._velocity.y = -300;
		}
		else if(this._velocityMode === GemSprite.VELOCITY_MODE_ACCELERATION){
			this._velocity.y -= 20;
		}
	},
	resetVelocity: function(){
		this._velocity.y = 0;
	},
	updatePosition: function(dt){
		//arrive bottom
		if(this.isGravityOn()){
			if(this.getPositionY() <= this._destinationPosition.y){
				this.setPositionY(this._destinationPosition.y);
				this.resetVelocity();
				this.toggleGravityOn(false);
				this._hasLanded = true;

				cc.AudioEngine.getInstance().playEffect(s_sound_gem_fall);
			}
			else{
				this.setPositionY(this.getPositionY() + this._velocity.y * dt);
				this.updateVelocity();
				this._hasLanded = false;
			}
		}
	}
});

GemSprite.GEM_TYPE = [s_gem_0, s_gem_1, s_gem_2, s_gem_3, s_gem_4, s_gem_5, s_gem_6, s_gem_7];

GemSprite.VELOCITY_MODE_CONSTANT = 0;
GemSprite.VELOCITY_MODE_ACCELERATION = 1;

GemSprite.SCALE = 1.0;

GemSprite.createGemSprite = function(gemType){
	if(gemType < 0 || gemType >= GemSprite.GEM_TYPE.length){
		throw "out of bound";
	}

	var sprite = new GemSprite();
	sprite.initWithFile(GemSprite.GEM_TYPE[gemType]);
	sprite.setAnchorPoint(cc.p(0,0));
	sprite.setScale(GemSprite.SCALE);

	return sprite;
};

GemSprite.getSpriteWidth = function(){
	return 64 * GemSprite.SCALE;
	// return cc.TextureCache.getInstance().textureForKey(GemSprite.GEM_TYPE[0]).getContentSize().width * GemSprite.SCALE;
};

GemSprite.getSpriteHeight = function(){
	return 64 * GemSprite.SCALE;
	// return cc.TextureCache.getInstance().textureForKey(GemSprite.GEM_TYPE[0]).getContentSize().height * GemSprite.SCALE;
};