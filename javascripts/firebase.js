//main iffe
var FbApi = (() => {
	let todos = [];
	return {

		todoGetter : ()=> {
			return todos ;
		},

		setTodos : (newArray) => {
			todos = newArray;
		},
		//push the new item to the array
		setSingleTodo : (newObject) => {
			todos.push(newObject);
		},
		setChecker : (itemId) => {
			const position = itemId.split("item")[1];
			todos[position].isCompleted = !todos[position].isCompleted;
		}
	};

})();
