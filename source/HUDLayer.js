var HUDLayer = cc.LayerColor.extend({
	_scoreLabel: null,
	_timer: null,

	_pauseButton: null,
	_hintButton: null,
	_pauseMenu: null,
	_hintMenu: null,

	_originTime: null,

	_menuLayer: null,
	_gameLayer: null,

	ctor: function(originTime, gameLayer, menuLayer){
        this._super();

        this._originTime = originTime;
        this._gameLayer = gameLayer;
        this._menuLayer = menuLayer;

        var size = cc.Director.getInstance().getWinSize();
        this.init(cc.c4b(0,255,150,255), size.width, 128);

        var PADDING = 8;

        this._pauseButton = cc.MenuItemImage.create(s_pause_button, s_pause_button, this.pause, this);
        this._hintButton = cc.MenuItemImage.create(s_hint_button, s_hint_button, this.hint, this);

        this._pauseButton.setAnchorPoint(cc.p(0,0));
        this._hintButton.setAnchorPoint(cc.p(0,0));

        this._pauseMenu = cc.Menu.create(this._pauseButton);
        this._pauseMenu.setAnchorPoint(cc.p(0,0));
        this._pauseMenu.setPosition(cc.p(PADDING, 96 - PADDING));
        this.addChild(this._pauseMenu, 1);

        this._hintMenu = cc.Menu.create(this._hintButton);
        this._hintMenu.setAnchorPoint(cc.p(0,0));
        this._hintMenu.setPosition(cc.p(PADDING, 64 - PADDING * 2));
        this.addChild(this._hintMenu, 1);

        this._scoreLabel = cc.LabelTTF.create("0", "", 32, cc.size(256, 32), cc.TEXT_ALIGNMENT_CENTER);
        this._scoreLabel.setColor(cc.c3b(0,0,0));
        this._scoreLabel.setAnchorPoint(cc.p(0,0));
        this._scoreLabel.setPosition(cc.p(96 + PADDING, 96 - PADDING));
        this.addChild(this._scoreLabel, 1);

        var timerPos = cc.p(96 + PADDING, 64 - PADDING * 2);

        var timerbg = cc.Sprite.create(s_progress_bar_empty);
        timerbg.setPosition(timerPos);
        timerbg.setAnchorPoint(cc.p(0,0));
        this.addChild(timerbg, 0);

        this._timer = cc.ProgressTimer.create(cc.Sprite.create(s_progress_bar_full));
        this._timer.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        this._timer.setMidpoint(cc.p(0, 0.5));
        this._timer.setBarChangeRate(cc.p(1, 0));
        this._timer.setPercentage(100);
        this._timer.setPosition(timerPos);
        this._timer.setAnchorPoint(cc.p(0,0));
        this.addChild(this._timer, 1);
    },
    onEnter: function(){
        this._super();
    },



    pause: function(){
    	this._menuLayer.setVisible(true);
    },
    hint: function(){
    	this._gameLayer.hint();
    },



    onScore: function(score){
    	this._scoreLabel.setString(score);
    },
    onTimeUpdated: function(time){
    	var percentage = (time / this._originTime) * 100;
    	this._timer.setPercentage(percentage);
    },
    onGameOver: function(){

    }
});