var GameLayer = cc.Layer.extend({
	BOARD_SIZE: m3g.Board.SIZE,
	GEM_SCORE: 100,

	_board: null,
	_gemSprites: null,
	_destinationPositionBoard: null,
	_labels: null,

	_switchedSprite1: null,
	_switchedSprite2: null,
	_mouseSuspended: null,
	_action: null,

	_gameManager: null,

	_bg: null,

	_controlController: null,

	ctor: function(gm){
		this._super();
		this._board = new m3g.Board();
		this._mouseSuspended = false;
		this._action = new m3g.Action();

		this._gameManager = gm;

		this.initBackground();
		this.initGemSprites();
		this.initDestinationPositionBoard();
		this.initSpritesPositionAndDestination();
		this.initControlController();
		// this.initDebugBoard();
	},
	onEnter: function(){
		this._super();
		this.setTouchEnabled(true);

		this.schedule(this.update, 0);

		return true;
	},



	initBackground: function(){
		this._bg = cc.Sprite.create(s_boardBackground);
		this._bg.setAnchorPoint(cc.p(0,0));
		this.addChild(this._bg);
	},
	initGemSprites: function(){
		this._gemSprites = [];

		for(var y = 0; y < this.BOARD_SIZE; y++){
			for(var x = 0; x < this.BOARD_SIZE; x++){
				var index = this.BOARD_SIZE * y + x;
				var type = this._board.getBoardXY(x, y).getType();
				var gem = GemSprite.createGemSprite(type);
				this.addChild(gem);
				this._gemSprites.push(gem);
			}
		}
	},
	initDestinationPositionBoard: function(){
		this._destinationPositionBoard = new Array(this.BOARD_SIZE);

		for(var i = 0; i < this._destinationPositionBoard.length; i++){
			this._destinationPositionBoard[i] = new Array(this.BOARD_SIZE);
		}

		for(var y = this._destinationPositionBoard.length - 1, arrY = 0; y >= 0; y--, arrY++){
			for(var x = 0; x < this._destinationPositionBoard[y].length; x++){
				var px = GemSprite.getSpriteWidth() * x;
				var py = GemSprite.getSpriteHeight() * y;
				this._destinationPositionBoard[arrY][x] = cc.p(px, py);
			}
		}
	},
	initSpritesPositionAndDestination: function(){
		var graphicsY = this._destinationPositionBoard.length - 1;
		for(var y = 0; y < this._destinationPositionBoard.length; y++){
			for(var x = 0; x < this._destinationPositionBoard[y].length; x++){
				var index = this.BOARD_SIZE * y + x;
				var px = GemSprite.getSpriteWidth() * x;
				var py = GemSprite.getSpriteHeight() * graphicsY;
				this._gemSprites[index].setPosition(cc.p(px,py));
				this._gemSprites[index].setDestinationPosition(cc.p(px,py));
			}
			graphicsY--;
		}
	},
	initControlController: function(){
		this._controlController = new ControlController();
		var me = this;
		this._controlController.setOnTouchesMovedCallback(function(){
			me.swapGem();
		});
		this._controlController.setConverter(function(px, py){
			var totalY = GemSprite.getSpriteHeight() * me.BOARD_SIZE;

			var x = Math.floor(px / GemSprite.getSpriteWidth());
			var y = Math.floor((totalY - py) / GemSprite.getSpriteHeight());

			return {x:x, y:y};
		});

		// register events
		this.onTouchesBegan = function(touches, event){ me._controlController.onTouchesBegan(touches, event); };
		this.onTouchesMoved = function(touches, event){ me._controlController.onTouchesMoved(touches, event); };
		this.onTouchesEnded = function(touches, event){ me._controlController.onTouchesEnded(touches, event); };
	},



	convertCoordinateToBoard: function(px, py){
		var totalY = GemSprite.getSpriteWidth() * this.BOARD_SIZE;

		var x = Math.floor(px / GemSprite.getSpriteWidth());
		var y = Math.floor((totalY - py) / GemSprite.getSpriteHeight());

		return {x:x, y:y};
	},
	convertBoardToCoordinate: function(x, y){
		var newY = Math.abs(y - this.BOARD_SIZE + 1);

		var px = GemSprite.getSpriteWidth() * x;
		var py = GemSprite.getSpriteHeight() * newY;

		return {x:px, y:py};
	},
	findSpriteWithBoardLocation: function(bx, by){
		for(var i = 0; i < this._gemSprites.length; i++){
			var x = Math.floor(this._gemSprites[i].getPositionX() / GemSprite.getSpriteWidth());
			var y = Math.floor(this._gemSprites[i].getPositionY() / GemSprite.getSpriteHeight());
			y = Math.abs(y - this.BOARD_SIZE + 1);

			if(bx === x && by === y){
				return this._gemSprites[i];
			}
		}
		return null;
	},
	findSpriteWithCoordinate: function(px, py){
		var x = Math.floor(px / GemSprite.getSpriteWidth());
		var y = Math.floor(py / GemSprite.getSpriteHeight());

		var result = null;
		for(var i = 0; i < this._gemSprites.length; i++){
			var tempX = Math.floor(this._gemSprites[i].getPositionX() / GemSprite.getSpriteWidth());
			var tempY = Math.floor(this._gemSprites[i].getPositionY() / GemSprite.getSpriteHeight());
			if(tempX === x && tempY === y){
				return this._gemSprites[i];
			}
		}
		return null;
	},



	update: function(dt){
		if(this._gameManager.isGameOver()){
			return;
		}

		this._gameManager.updateTime(dt);

		if(this.allGemsHaveLanded()){
			if(this.hasAnimationRunningDone(this._switchedSprite1, this._switchedSprite2)){
				this._board.applyAction(this._action);

				this._switchedSprite1 = null;
				this._switchedSprite2 = null;
				// this._action = new Action();
			}
			this._mouseSuspended = false;
			if(this.hasMatchedGems()){
				this.removedGems();
				this.makeGemsFall();
				this.filledGems();
				this._mouseSuspended = true;
			}
		}

		//update all gems position
		this.updateAllGemSpritesPosition(dt);

		// this.updateDebugBoard();
	},
	swapGem: function(){
		if(this._mouseSuspended){
			return;
		}
		var boardLocation = this._controlController.getBoardLocation();
		if((boardLocation[0] !== null && boardLocation[1] !== null) &&
			(this._switchedSprite1 === null && this._switchedSprite2 === null)){
			var x1 = boardLocation[0].x;
			var y1 = boardLocation[0].y;
			var x2 = boardLocation[1].x;
			var y2 = boardLocation[1].y;

			this._action = m3g.BoardAction.actionSwapGems(this._board, x1, y1, x2, y2);

			if(m3g.BoardAction.isValidActionSwapGems(x1, y1, x2, y2)){
				var tempSprite1 = this.findSpriteWithBoardLocation(x1, y1);
				var tempSprite2 = this.findSpriteWithBoardLocation(x2, y2);

				if(tempSprite1 !== null && tempSprite2 !== null){
					if(this.hasAnimationRunningDone(tempSprite1, tempSprite2)){
						this._switchedSprite1 = tempSprite1;
						this._switchedSprite2 = tempSprite2;
						if(this._action.hasNoChanges()){
							this.animateSwap(this._switchedSprite1, this._switchedSprite2, false);
						}
						else{
							this.animateSwap(this._switchedSprite1, this._switchedSprite2, true);
						}	
					}
				}			
			}
		}
	},
	animateSwap: function(sp1, sp2, validSwap){
		var p1 = sp1.getPosition();
		var p2 = sp2.getPosition();

		var action1 = cc.MoveTo.create(0.25, p1);
		var action2 = cc.MoveTo.create(0.25, p2);

		if(validSwap){
			sp1.runAction(action2);
			sp2.runAction(action1);
		}
		else{
			sp1.runAction(cc.Sequence.create(action2.copy(), action1.copy()));
			sp2.runAction(cc.Sequence.create(action1.copy(), action2.copy()));
		}
	},
	removedGems: function(){
		var removedGems = m3g.BoardAction.findAllMatchedGemsWithCombo(this._board, 3, m3g.BoardAction.FIND_FILTER_GREATER_EQUAL);
		var removeAction = m3g.BoardAction.actionRemoveGemsWithList(removedGems);
		this._board.applyAction(removeAction);
		for(var i = 0; i < removedGems.length; i++){
			var x = removedGems[i].getX();
			var y = removedGems[i].getY();

			var sprite = this.findSpriteWithBoardLocation(x, y);

			if(sprite !== null){
				var action = cc.FadeOut.create(0.25);
				var action2 = cc.CallFunc.create(this.onRemoveFromParent, this);
				sprite.runAction(cc.Sequence.create(action, action2));
			}
		}

		this._gameManager.addScore(removedGems.length * this.GEM_SCORE);
	},
	makeGemsFall: function(){
		var fallAction = m3g.BoardAction.actionMakeGemsFall(this._board);
		this._board.applyAction(fallAction);
		var fallingGems = fallAction.getChanges();
		for(var i = 0; i < fallingGems.length; i++){
			var fromX = fallingGems[i].getFromPoint().getX();
			var fromY = fallingGems[i].getFromPoint().getY();
			var toX = fallingGems[i].getToPoint().getX();
			var toY = fallingGems[i].getToPoint().getY();

			var pos = this.convertBoardToCoordinate(toX, toY);

			var sprite = this.findSpriteWithBoardLocation(fromX, fromY);
			sprite.setDestinationPosition(cc.p(pos.x, pos.y));
			sprite.toggleGravityOn(true);			
		}
	},
	filledGems: function(filledLocation){
		var fillAction = m3g.BoardAction.actionFillEmptyGems(this._board);
		this._board.applyAction(fillAction);
		var filledGems = fillAction.getChanges();
		for(var i = 0; i < filledGems.length; i++){
			var oriX = filledGems[i].getFromPoint().getX();
			var oriY = filledGems[i].getFromPoint().getY();
			var type = this._board.getBoardXY(oriX, oriY).getType();
			var desPos = this.convertBoardToCoordinate(oriX, oriY);
			var y = Math.abs(oriY - this.BOARD_SIZE + 1);

			//start from the edge of top board
			var posY = this._bg.getContentSize().height + GemSprite.getSpriteHeight() * y;

			var sprite = GemSprite.createGemSprite(type);
			sprite.setPosition(desPos.x, posY);
			sprite.setDestinationPosition(cc.p(desPos.x, desPos.y));

			this._gemSprites.push(sprite);
			this.addChild(sprite);
		}
	},
	hasMatchedGems: function(){
		var result = m3g.BoardAction.findAllMatchedGemsWithCombo(this._board, 3, m3g.BoardAction.FIND_FILTER_GREATER_EQUAL);
		return result.length > 0 ? true : false;
	},
	allGemsHaveLanded: function(){
		for(var i = 0; i < this._gemSprites.length; i++){
			if(!this._gemSprites[i].hasLanded()){
				return false;
			}
		}
		return true;
	},
	onRemoveFromParent: function(node){
		node.getParent().removeChild(node, true);
		//remove from sprites
		var i = this._gemSprites.indexOf(node);
		this._gemSprites.splice(i, 1);
	},
	updateAllGemSpritesPosition: function(dt){
		for(var i = 0; i < this._gemSprites.length; i++){
			this._gemSprites[i].update(dt);
		}
	},
	//receive multiple arguments
	hasAnimationRunningDone: function(){
		for(var i = 0; i < arguments.length; i++){
			if(arguments[i] === null ||
				arguments[i].numberOfRunningActions() > 0){
				return false;
			}
		}
		return true;
	},
	hint: function(){
		var result = m3g.BoardAction.hint(this._board);

		for(var i = 0; i < result.length; i++){
			var x = result[i].getX();
			var y = result[i].getY();

			var sprite = this.findSpriteWithBoardLocation(x, y);
			if(sprite && this.hasAnimationRunningDone(sprite)){
				var action = cc.FadeOut.create(0.5);
				sprite.runAction(cc.Sequence.create(action, action.reverse()));
			}
		}
	},
	//for debug
	initDebugBoard: function(){
		this._labels = new Array(this.BOARD_SIZE);

		for(var i = 0; i < this._labels.length; i++){
			this._labels[i] = new Array(this.BOARD_SIZE);
		}

		var board = this._board.getBoard();
		var size = this._gemSprites[0].getContentSize();
		for(var y = board.length - 1, arrY = 0; y >= 0 ; y--, arrY++){
			for(var x = 0; x < board[y].length; x++){
				var px = size.width * x;
				var py = size.height * y;

				var label = cc.LabelTTF.create(board[arrY][x].getType(), "", 32, size, cc.TEXT_ALIGNMENT_CENTER);
				label.setColor(cc.c3b(150,150,150));
				label.setPosition(cc.p(px, py));
				label.setAnchorPoint(cc.p(0, 0));
				label.setVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
				this._labels[arrY][x] = label;
				this.addChild(label, 1);
			}
		}
	},
	updateDebugBoard: function(){
		var board = this._board.getBoard();
		for(var y = 0; y < board.length; y++){
			for(var x = 0; x < board[y].length; x++){
				this._labels[y][x].setString(board[y][x].getType());
			}
		}
	}
});