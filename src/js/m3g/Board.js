export class Board {
	constructor(width, height, types){
		this._board = null;
	}

	generateBoard(width, height, types){

	}

	printBoard(){
		let output = "";
		for(let y = 0; y < this._board.length; y++){
			for(let x = 0; x < this._board[y].length; x++){
				output += this._board[y][x] + ", "
			}
			output += "\n";
		}
		return output;
	}

	getBoard(){ return this._board; }
}
