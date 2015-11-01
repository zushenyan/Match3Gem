var GameScene = cc.Scene.extend({
    ctor: function(){
        this._super();

        var time = 60;
        var gm = new GameManager(time, 0);

        var menuLayer = new MenuLayer();
        this.addChild(menuLayer, 3);

        var gameLayer = new GameLayer(gm);
        this.addChild(gameLayer, 1);

        var hudLayer = new HUDLayer(time, gameLayer, menuLayer);
        hudLayer.setAnchorPoint(cc.p(0, 0));
        hudLayer.setPosition(cc.p(0, 512));
        this.addChild(hudLayer, 2);

        menuLayer.onShowed = function(){
            hudLayer._hintMenu.setTouchEnabled(false);
            gameLayer.setTouchEnabled(false);

            gameLayer.pauseSchedulerAndActions();
            var childs = gameLayer.getChildren();
            for(var i = 0; i < childs; i++){
                childs[i].pauseSchedulerAndActions();
            }
        };

        menuLayer.onHidden = function(){
            hudLayer._hintMenu.setTouchEnabled(true);
            gameLayer.setTouchEnabled(true);

            gameLayer.resumeSchedulerAndActions();
            var childs = gameLayer.getChildren();
            for(var i = 0; i < childs; i++){
                childs[i].resumeSchedulerAndActions();
            }
        };

        gm.addListener(hudLayer);
    },
    onEnter: function(){
        this._super();
    }
});