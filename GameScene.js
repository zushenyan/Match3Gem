var TestLayer = cc.Layer.extend({
    _sprite: null,
    _sprite2: null,
    _sprite3: null,
    _mouseDown: null,
    _label1: null,

    init: function(){
        this._mouseDown = 1;
    },
    onEnter: function(){
        this._super();

        this.setTouchEnabled(true);

        // var texture = cc.TextureCache.getInstance().textureForKey(s_empty);
        // console.log(texture.getContentSize().width);

        this._sprite = GemSprite.createGemSprite(1);
        this._sprite.setPosition(cc.p(200,400));
        this._sprite.setDestinationPosition(cc.p(200, 0));
        this._sprite.runAction(cc.MoveTo.create(300, 400));
        this.addChild(this._sprite);

        this._label1 = cc.LabelTTF.create(1, "", 32, this._sprite.getContentSize(), cc.TEXT_ALIGNMENT_CENTER);
        this._label1.setPosition(cc.p(200, 400));
        this._label1.setAnchorPoint(cc.p(0, 0));
        this._label1.setColor(cc.c3b(0, 200, 200));
        this.addChild(this._label1);

        this._sprite2 = GemSprite.createGemSprite(2);
        this._sprite2.setPosition(cc.p(100,400));
        this._sprite2.setDestinationPosition(cc.p(200, 50));
        this.addChild(this._sprite2);

        this._sprite3 = GemSprite.createGemSprite(3);
        this._sprite3.setPosition(cc.p(300,400));
        var action = cc.FadeOut.create(2);
        var action2 = cc.CallFunc.create(this.onRemoveFromParent, this);
        this._sprite3.runAction(cc.Sequence.create(action, action2));
        this.addChild(this._sprite3);

        this.schedule(this.update, 0);

        return true;
    },
    onTouchesBegan: function(touches, event){
        // this._mouseDown++;

        // if(this._mouseDown % 2 === 0){
        //     this._sprite.toggleGravityOn(false);
        //     this._sprite2.toggleGravityOn(false);
        // }
        // else{
        //     this._sprite.toggleGravityOn(true);
        //     this._sprite2.toggleGravityOn(true);
        // }

        // if(this._sprite3.numberOfRunningActions() === 0){
        //     console.log("not running");
        // }
        // else{
        //     console.log("running");
        // }
        // this._sprite.setPosition(cc.p(200,400));
        // this._sprite2.setPosition(cc.p(100,400));
    },
    update: function(dt){
        this._sprite.update(dt);
        this._sprite2.update(dt);
    },
    onRemoveFromParent: function(node){
        node.getParent().removeChild(node, true);
    }
});

var TestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BoardLayer();
        layer.init();
        this.addChild(layer);
    }
});

