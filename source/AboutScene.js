var AboutScene = cc.Scene.extend({
	ctor: function(){
		this._super();

		var size = cc.Director.getInstance().getWinSize();

		var contentLabel = cc.LabelTTF.create("Program by Andrew Yan. All pictures are drawn by myself, audios come from www.freesound.org.", "", 32, cc.size(size.width * 0.8, size.height * 0.8), cc.TEXT_ALIGNMENT_LEFT);
		contentLabel.setAnchorPoint(cc.p(0,0));
		contentLabel.setPosition(cc.p((size.width - contentLabel.getContentSize().width) / 2, 0));

		var backMenuItem = cc.MenuItemFont.create("go back", this.onPressedGoBack, this);
		backMenuItem.setAnchorPoint(cc.p(0,0));

		var menu = cc.Menu.create(backMenuItem);
		menu.setPosition(cc.p((size.width - backMenuItem.getContentSize().width) / 2, 50));

		var layer = cc.LayerColor.create(cc.c4b(128,128,128,255));
		layer.addChild(contentLabel, 3);
		layer.addChild(menu, 2);

		this.addChild(layer);
	},

	onPressedGoBack: function(){
		cc.AudioEngine.getInstance().playEffect(s_sound_button_pressed);
		cc.Director.getInstance().replaceScene(new MainScene());
	},
});