// var TestLayer = cc.LayerColor.extend({
//     _sprite1: null,
//     _sprite2: null,
//     _sprite3: null,
//     _progress: null,

//     ctor: function(){
//         this._super();

//         var size = cc.Director.getInstance().getWinSize();

//         this.init(cc.c4b(200,200,200, 255), size.width, size.height);
//     },
//     onEnter: function(){
//         this._super();

//         this.setTouchEnabled(true);

//         var barbg = cc.Sprite.create(s_progress_bar_empty);
//         barbg.setAnchorPoint(cc.p(0,0));
//         barbg.setPosition(cc.p(0,300));
//         this.addChild(barbg, 1);

//         this._progress = cc.ProgressTimer.create(cc.Sprite.create(s_progress_bar_full));
//         this._progress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
//         this._progress.setMidpoint(cc.p(0, 0.5));
//         this._progress.setBarChangeRate(cc.p(1, 0));
//         this._progress.setPercentage(100);
//         this._progress.setPosition(cc.p(0, 300));
//         this._progress.setAnchorPoint(cc.p(0,0));
//         this.addChild(this._progress, 2);

//         this._sprite1 = GemSprite.createGemSprite(1);
//         this._sprite1.setPosition(cc.p(200,400));
//         this._sprite1.setDestinationPosition(cc.p(200, 0));
//         this._sprite1.runAction(cc.MoveTo.create(300, 400));
//         this.addChild(this._sprite1);

//         this._sprite2 = GemSprite.createGemSprite(2);
//         this._sprite2.setPosition(cc.p(100,400));
//         this._sprite2.setDestinationPosition(cc.p(200, 50));
//         this.addChild(this._sprite2);

//         this._sprite3 = GemSprite.createGemSprite(3);
//         this._sprite3.setPosition(cc.p(300,400));
//         var action = cc.FadeOut.create(1);
//         this._sprite3.runAction(cc.RepeatForever.create(cc.Sequence.create(action, action.reverse())));
//         this.addChild(this._sprite3);

//         this.schedule(this.update, 0);

//         return true;
//     },
//     onTouchesBegan: function(touches, event){
//     	console.log("test");

//         if(this._sprite1.hasLanded() && this._sprite2.hasLanded()){   
//             this._sprite1.setPosition(cc.p(200, 400));
//             this._sprite2.setPosition(cc.p(100, 400));
//             this._sprite1.toggleGravityOn(true);
//             this._sprite2.toggleGravityOn(true);
//         }
//     },
//     update: function(dt){
//         this._sprite1.update(dt);
//         this._sprite2.update(dt);

//         var percentage = (this._sprite1.getPositionY() / 400) * 100;

//         this._progress.setPercentage(percentage);
//     },
// });

// var MainScene = cc.Scene.extend({
//     _paused: null,
//     _testLayer: null,

//     ctor: function(){
//         this._super();

//         this._paused = true;

//         var menuItem = cc.MenuItemImage.create(s_pause_button, s_pause_button, this.pause, this);
//         var menuItem2 = cc.MenuItemImage.create(s_hint_button, s_hint_button, this.pause, this);

//         var menu = cc.Menu.create(menuItem);
//         menu.setPosition(cc.p(100, 100));

//         var menu2 = cc.Menu.create(menuItem2);
//         menu2.setPosition(cc.p(100, 50));

//         var stateLayer = cc.Layer.create();
//         stateLayer.addChild(menu);
//         stateLayer.addChild(menu2);

//         this._testLayer = new TestLayer();

//         this.addChild(this._testLayer, 1);
//         this.addChild(stateLayer, 2);
//     },
//     onEnter: function(){
//         this._super();
//     },
//     pause: function(){
//         if(this._paused){
//             // cc.Director.getInstance().pause();
//             this._testLayer.pauseSchedulerAndActions();
//             var childs = this._testLayer.getChildren();
//             for(var i = 0; i < childs.length; i++){
//                 childs[i].pauseSchedulerAndActions();
//             }
//         }
//         else{
//             // cc.Director.getInstance().resume();
//             this._testLayer.resumeSchedulerAndActions();
//             var childs = this._testLayer.getChildren();
//             for(var i = 0; i < childs.length; i++){
//                 childs[i].resumeSchedulerAndActions();
//             }
//         }
        
//         this._paused = !this._paused;
//     }
// });

var MainScene = cc.Scene.extend({
    ctor: function(){
        this._super();

        this.addChild(new HUDLayer());
    },
    onEnter: function(){
        this._super();
    },
});