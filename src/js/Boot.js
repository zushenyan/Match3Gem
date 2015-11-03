import GameScene from "./GameScene";

export default class Boot{
	constructor(){
		let game = new Phaser.Game(256, 288, Phaser.AUTO);
		game.state.add("GameScene", new GameScene(game));
		game.state.start("GameScene");
	}
}
