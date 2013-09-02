(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false,
        showFPS:true,
        frameRate:60,
        loadExtension:false,
        renderMode:0,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
        tag:'gameCanvas', //the dom element to run cocos2d on
        // engineDir:'../cocos2d/',
        SingleEngineFile:'Cocos2d-html5-v2.1.5.min.js',
        appFiles:[
        	"res.js",

            "source/m3g/m3g.js",
            "source/m3g/Point.js",
            "source/m3g/Change.js",
            "source/m3g/Gem.js",
            "source/m3g/Board.js",
            "source/m3g/ActionProcessor.js",
            "source/m3g/Action.js",
            "source/m3g/BoardAction.js",

            "source/GameManager.js",
            "source/ControlController.js",
            "source/GemSprite.js",
            "source/GameLayer.js",
            "source/HUDLayer.js",
            "source/MenuLayer.js",
            "GameScene.js",
            "MainScene.js",
        ]
    };

    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        d.body.appendChild(s);
        //else if single file specified, load singlefile
    });
})();