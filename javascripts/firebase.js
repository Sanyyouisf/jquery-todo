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
		}
	};

})();
