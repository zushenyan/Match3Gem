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

        cc.AudioEngine.getInstance().setEffectsVolume(0.5);
    },

    onPressedStart: function(){
    	cc.AudioEngine.getInstance().playEffect(s_sound_button_pressed);
    	cc.Director.getInstance().replaceScene(new GameScene());
    },

    onPressedCredit: function(){
    	cc.AudioEngine.getInstance().playEffect(s_sound_button_pressed);
    }
});