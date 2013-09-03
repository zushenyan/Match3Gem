var MainScene = cc.Scene.extend({
    ctor: function(){
        this._super();

        var startMenuItem = cc.MenuItemFont.create("Start", this.onPressedStart, this);
        var creditMenuItem = cc.MenuItemFont.create("Credit", this.onPressedCredit, this);

        var menu = cc.Menu.create();
        menu.addChild(startMenuItem);
        menu.addChild(creditMenuItem);
        menu.alignItemsVertically();

        var layer = cc.Layer.create();
        layer.addChild(menu);
        this.addChild(layer);
    },

    onPressedStart: function(){
    	cc.Director.getInstance().replaceScene(new GameScene());
    },

    onPressedCredit: function(){
    	console.log("asdads");
    }
});