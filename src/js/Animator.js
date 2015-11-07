export default class Animator {
	constructor(game){
		this._spritePool = [];
		this._actionSequence = [];
		this._game = game;
		this.isGravityOn = false;
		this.hasAnimationFinished = null;
	}

	addSprite(startX, startY, destX, destY, spriteName, id){
		let sprite = this._game.add.sprite(startX, startY, spriteName);
		this._spritePool.push({sprite: sprite, destX: destX, destY: destY, id: id});
	}

	getSprite(id){
		let sprite = this._spritePool.find((ele) => {
			if(ele.id === id){
				return true;
			}
		});
		return sprite;
	}

	addAction(action){
		this._actionSequence.push(action);
	}

	swapDest(sourceId, targetId){
		this.addAction(() => {
			let sourceSprite = this.getSprite(sourceId);
			let targetSprite = this.getSprite(targetId);
			let tempX = sourceSprite.destX;
			let tempY = sourceSprite.destY;
			sourceSprite.destX = targetSprite.destX;
			targetSprite.destX = tempX;
			sourceSprite.destY = targetSprite.destY;
			targetSprite.destY = tempY;
		});
	}

	moveTo(id, destX, destY){
		this.addAction(() => {
			let sprite = this.getSprite(id);
			sprite.destX = destX;
			sprite.destY = destY;
		});
	}

	enableGravity(){ this.isGravityOn = true; }
	disableGravity(){ this.isGravityOn = false; }

	update(){
		let hasAnimationFinished = true;
		for(let i = 0; i < this._spritePool.length; i++){
			let sprite = this._spritePool[i].sprite;
			let destX = this._spritePool[i].destX;
			let destY = this._spritePool[i].destY;

			let diffX = destX - sprite.x;
			let diffY = destY - sprite.y;

			// deal with move to y
			if(diffX !== 0){
				hasAnimationFinished = false;
				if(diffX > 0){
					sprite.x += 2;
					if(sprite.x > destX){
						sprite.x = destX;
					}
				}
				else if(diffX < 0){
					sprite.x -= 2;
					if(sprite.x < destX){
						sprite.x = destX;
					}
				}
			}

			// deal with move to y
			if(diffY !== 0){
				hasAnimationFinished = false;
				if(diffY > 0){
					sprite.y += 2;
					if(sprite.y > destY){
						sprite.y = destY;
					}
				}
				else if(diffY < 0){
					sprite.y -= 2;
					if(sprite.y < destY){
						sprite.y = destY;
					}
				}
			}
		}
		this.hasAnimationFinished = hasAnimationFinished;
		this._doActions();
	}

	_doActions(){
		if(this.hasAnimationFinished){
			let action = this._actionSequence.pop();
			if(action){
				action();
			}
		}
	}
}
