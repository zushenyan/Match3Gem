import Matrix from "./Matrix";

let horizontalPattern1 = [
	[1,1,0],
	[0,0,1]
];
let horizontalPattern2 = [
	[1,0,0],
	[0,1,1]
];
let horizontalPattern3 = [
	[1,0,1],
	[0,1,0]
];
let horizontalPattern4 = [
	[1,1,0,1]
];
let horizontalPattern5 = [
	[1,0,1,1]
];
let verticalPattern1 = Matrix.transpose(horizontalPattern1);
let verticalPattern2 = Matrix.transpose(horizontalPattern2);
let verticalPattern3 = Matrix.transpose(horizontalPattern3);
let verticalPattern4 = Matrix.transpose(horizontalPattern4);
let verticalPattern5 = Matrix.transpose(horizontalPattern5);

let BoardPatterns = [
	{pattern: horizontalPattern1, anchorX: 0, anchorY: 0},
	{pattern: horizontalPattern1, anchorX: 0, anchorY: 1},
	{pattern: horizontalPattern2, anchorX: 0, anchorY: 0},
	{pattern: horizontalPattern2, anchorX: 0, anchorY: 1},
	{pattern: horizontalPattern3, anchorX: 0, anchorY: 0},
	{pattern: horizontalPattern3, anchorX: 0, anchorY: 1},
	{pattern: horizontalPattern4, anchorX: 0, anchorY: 0},
	{pattern: horizontalPattern5, anchorX: 0, anchorY: 0},
	{pattern: verticalPattern1, anchorX: 0, anchorY: 0},
	{pattern: verticalPattern1, anchorX: 1, anchorY: 0},
	{pattern: verticalPattern2, anchorX: 0, anchorY: 0},
	{pattern: verticalPattern2, anchorX: 1, anchorY: 0},
	{pattern: verticalPattern3, anchorX: 0, anchorY: 0},
	{pattern: verticalPattern3, anchorX: 1, anchorY: 0},
	{pattern: verticalPattern4, anchorX: 0, anchorY: 0},
	{pattern: verticalPattern5, anchorX: 0, anchorY: 0},
];

export {BoardPatterns as default};
