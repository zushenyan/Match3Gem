export default class Animator {
	constructor(game){
		this._spritePool = [];
		this._game = game;
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

	moveToX(id, destX){
		
	}

	update(){
		let hasAnimationFinished = true;
		for(let i = 0; i < this._spritePool.length; i++){
			let sprite = this._spritePool[i].sprite;
			let destX = this._spritePool[i].destX;
			let destY = this._spritePool[i].destY;

			let diffX = destX - sprite.x;
			let diffY = destY - sprite.y;

			// deal with moveToX
			if(diffX !== 0){
				hasAnimationFinished = false;
				if(diffX > 0){
					sprite.x += 5;
					if(sprite.x > destX){
						sprite.x = destX;
					}
				}
				else if(diffX < 0){
					sprite.x -= 5;
					if(sprite.x < destX){
						sprite.x = destX;
					}
				}
			}

			// deal with gravity
			if(diffY !== 0){
				hasAnimationFinished = false;
				if(sprite.y < destY){
					sprite.y += 5;
				}
				else if(sprite.y > destY){
					sprite.y = destY;
				}
			}
		}
		this.hasAnimationFinished = hasAnimationFinished;
	}
}
