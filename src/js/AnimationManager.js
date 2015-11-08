export default class AnimationManager {
	constructor(game){
		this._spritePool = {};
		this._tweenPool = {};
		this._game = game;
	}

	addTextSprite(x, y, id, text){
		let style = { font: "32px Arial", fill: "#ffffff", align: "center" };
		let textSprite = this._game.add.text(x, y, text, style);
		textSprite.anchor.set(0.5);
		this._spritePool[id] = textSprite;
	}

	addSprite(x, y, spriteName, id){
		let sprite = this._game.add.sprite(x, y, spriteName);
		this._spritePool[id] = sprite;
	}

	getSprite(id){
		return this._spritePool[id];
	}

	removeSprite(id){
		this._spritePool[id].destroy();
		delete this._spritePool[id];
		delete this._tweenPool[id];
	}

	isTweening(){
		let isTweening = false;
		for(let key in this._tweenPool){
			if(this._tweenPool[key].isRunning){
				isTweening = true;
				break;
			}
		}
		return isTweening;
	}

	spriteFallFrom(y, id, speed){
		let duration = this._duration(this._spritePool[id], this._spritePool[id].x, y, speed);
		return this._tweenPool[id] = this._game.add.tween(this._spritePool[id]).from({y: y}, duration, Phaser.Easing.Linear.None, true);
	}

	spriteFallTo(y, id, speed){
		let duration = this._duration(this._spritePool[id], this._spritePool[id].x, y, speed);
		return this._tweenPool[id] = this._game.add.tween(this._spritePool[id]).to({y: y}, duration, Phaser.Easing.Linear.None, true);
	}

	spriteSwap(sourceId, targetId){
		let sourceX = this._spritePool[sourceId].x;
		let sourceY = this._spritePool[sourceId].y;
		let targetX = this._spritePool[targetId].x;
		let targetY = this._spritePool[targetId].y;
		let sourceTween = this._game.add.tween(this._spritePool[sourceId]).to({x: targetX, y: targetY}, 250, Phaser.Easing.Linear.None, true);
		let targetTween = this._game.add.tween(this._spritePool[targetId]).to({x: sourceX, y: sourceY}, 250, Phaser.Easing.Linear.None, true);
		this._tweenPool[sourceId] = sourceTween;
		this._tweenPool[targetId] = targetTween;
		return {source: sourceTween, target: targetTween};
	}

	spriteFadeOut(id, duration){
		return this._tweenPool[id] = this._game.add.tween(this._spritePool[id]).to({alpha: 0}, duration, Phaser.Easing.Linear.None, true);
	}

	_duration(movingObj, destX, destY, speed){
		let point = new Phaser.Point(destX, destY);
		return (Phaser.Point.distance(movingObj, point) / speed) * 1000;
	}
}
