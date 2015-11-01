var MainScene = cc.Scene.extend({
    ctor: function(){
        this._super();

        var startMenuItem = cc.MenuItemFont.create("Start", this.onPressedStart, this);
        var creditMenuItem = cc.MenuItemFont.create("About", this.onPressedAbout, this);

        var menu = cc.Menu.create();
        menu.addChild(startMenuItem);
        menu.addChild(creditMenuItem);
        menu.alignItemsVertically();

        var layer = cc.LayerColor.create(cc.c4b(128,128,128,255));
        layer.addChild(menu);
        this.addChild(layer);

        // Originally there can't be more than 10 audios instances play at the same time, 
        // but I couldn't find any other ways to limit the maximum effect audio instance without throwing errors,
        // so here is the dangerous workaround.
        // cc.AudioEngine.getInstance()._maxAudioInstance = 99;

        cc.AudioEngine.getInstance().setEffectsVolume(0.3);
    },

    onPressedStart: function(){
    	cc.AudioEngine.getInstance().playEffect(s_sound_button_pressed);
    	cc.Director.getInstance().replaceScene(new GameScene());
    },

    onPressedAbout: function(){
    	cc.AudioEngine.getInstance().playEffect(s_sound_button_pressed);
        cc.Director.getInstance().replaceScene(new AboutScene());
    }
});