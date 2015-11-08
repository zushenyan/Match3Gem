export default class TaskManager{
	constructor(){
		this._tasks = [];
	}

	addTask(task){
		this._tasks.push(task);
	}

	runTasks(){
		let taskArray = this._tasks.splice(0,1);
		if(taskArray.length > 0){ taskArray[0](); }
	}
}
