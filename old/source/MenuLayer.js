var MenuLayer = cc.LayerColor.extend({
	_mainMenuItem: null,
	_resumeMenuItem: null,

	// _gameLayer: null,

	ctor: function(){
		this._super();

		// this._gameLayer = gameLayer;

		var size = cc.Director.getInstance().getWinSize();
		this.init(cc.c4b(64, 64, 64, 128), size.width, size.height);

		this._mainMenuItem = cc.MenuItemFont.create("Main Menu", this.onPressedMainMenu, this);
		this._resumeItem = cc.MenuItemFont.create("Resume", this.onPressedResume, this);

		var menu = cc.Menu.create();

		menu.addChild(this._mainMenuItem);
		menu.addChild(this._resumeItem);

		menu.alignItemsVertically();

		this.addChild(menu);
		this.setVisible(false);
	},

	setVisible: function(b){
		cc.LayerColor.prototype.setVisible.call(this, b);

		if(b){
			this.onShowed();
		}
		else{
			this.onHidden();
		}
	},

	onShowed: function(){},
	onHidden: function(){},

	onPressedMainMenu: function(){
		cc.AudioEngine.getInstance().playEffect(s_sound_button_pressed);
		cc.Director.getInstance().replaceScene(new MainScene());
    },
    onPressedResume: function(){
    	cc.AudioEngine.getInstance().playEffect(s_sound_button_pressed);
    	this.setVisible(false);
    }
});