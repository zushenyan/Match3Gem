import GameConstants from "./m3g/GameConstants";
import GameManager from "./m3g/GameManager";

var sampleBoard1 = [
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,8,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1],
	[1,2,3,4,5,6,7,8],
	[8,7,6,5,4,3,2,1]
];

let sampleBoard2 = [
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1],
	[1,2,2,1,2,1,1,2],
	[2,1,1,2,1,2,2,1]
];

let TITLE_UI_ANCHOR = 0;
let BOARD_UI_ANCHOR = 32;

export default class GameScene{
	constructor(game){
		this.game = game;
		this.gm = new GameManager(sampleBoard1);
		this.spritePool = [];
	}

	preload(){
		for(let i = 0, j = i + 1; i < GameConstants.TYPES.length; i++, j++){
			this.game.load.image("gem" + j, "../media/" + j + ".png");
		}
		this.game.load.audio("sfx", ["../media/gem_fall.wav", "../media/gem_matched.wav"]);
	}

	create(){
		let board = this.gm.getBoard();
		let index;
		for(let y = 0; y < board.length; y++){
			for(let x = 0; x < board[y].length; x++){
				let px = x * 32;
				let py = BOARD_UI_ANCHOR + y * 32;
				let spriteName = "gem" + board[y][x];
				this.game.add.sprite(px, py, spriteName);
			}
		}
	}

	update(){

	}
}
