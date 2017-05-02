//main iffe
var FbApi = (() => {
	let todos = [];
	return {

		todoGetter : ()=> {
			return todos ;
		},

		//return the new array that you pass it .
		setTodos : (newArray) => {
			todos = newArray;
		},
		//push the new item to the array
		setSingleTodo : (newObject) => {
			todos.push(newObject);
		},
		// split here is used to split a string into an array of substrings,and returns the new array
		setChecker : (itemId) => {
			//so here it will split the string (item2)-for example - to array of to elements [ item ,0] and take the index[1] whwch is 0 .
			const position = itemId.split("item")[1];
			// console.log ("position",position);// in case of (item2) - position here will be 2.
			console.log ("todos[position].isCompleted befor ",todos[position].isCompleted);//will be false
			//check the todo array if the todos[2].isCompleted is false it will be true and vise versa.
			todos[position].isCompleted = !todos[position].isCompleted;
			console.log ("todos[position].isCompleted after",todos[position].isCompleted);//will be false
			//so this function take the item id and check for isCompleted key and convert it .
		},
		duhlete : (itemId) =>{
			//the index
			const position = itemId.split("item")[1];
			//delete the item  
			todos.splice(position,1);
		}
	};

})();
