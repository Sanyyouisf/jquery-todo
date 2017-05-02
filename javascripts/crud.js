//augmenter
var FbApi = ((oldCrap) => {
	//this function convert the object to an array and loop through it and push the object to the array
	oldCrap.getTodos = (apikeys) =>{
		let items =[];
		return new Promise ((resolve,reject) => {
			$.ajax (`${apikeys.databaseURL}/items.json`)
			.done((data)=>{
				//response here is object  of items
				let response = data;
				console.log("response",response);
				//Object.keys convert the response object to an array 
				//forEach will loop through this aray item0,item1,item2
				Object.keys(response).forEach((key) =>{
					console.log("key",key);
					response[key].id = key;
					//adding new item to the array that have (item.id=0 for example)
					//and push it to the array
					items.push(response[key]);
					console.log("response[key]",response[key]);
					console.log("items",items);
				});
				resolve(items);
				// console.log("data",data);
			})
			.fail((error)=>{
				reject(error);
			});
		});		
	};


	oldCrap.addTodo = (apikeys,newTodo) => {
		return new Promise ((resolve,reject) => {
			//newTodo.id =item +the number of items in the todo array (for example item3).
			newTodo.id = `item${FbApi.todoGetter().length}`;
			console.log("newTodo",newTodo);
			//push the new item (with the id:item3 for example)to the todo array. 
			FbApi.setSingleTodo(newTodo);
			resolve();
		});
	};

	//check for the item is completed or not 
	oldCrap.checker = (apikeys,id) => {
		return new Promise ((resolve,reject) => {
			FbApi.setChecker(id);
			resolve();
		});
	};

	//delete the item from the array
	oldCrap.deleteTodo = (apikeys,id) => {
		return new Promise ((resolve,reject) => {
			$.ajax({
				method :'delete',
				url: `${apikeys.databaseURL}/items/${id}.json`
			}).done(()=>{
				resolve();
			}).fail((error)=>{
				reject(error);
			});
		});
	};

	oldCrap.editTodo = (apikeys,id) => {
		return new Promise ((resolve,reject) => {
			FbApi.duhlete(id);
			resolve();
		});
	};

	return oldCrap;
})(FbApi || {});