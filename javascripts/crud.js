//augmenter
var FbApi = ((oldCrap) => {
	//
	oldCrap.getTodos = () =>{
		let items =[];
		return new Promise ((resolve,reject) => {
			$.ajax ("./database/seed.json")
			.done((data)=>{
				let response = data.items;
				Object.keys(response).forEach((key) =>{
					console.log("key",key);
					response[key].id = key;
					items.push(response[key]);
				});
				FbApi.setTodos(items);
				resolve();
				// console.log("data",data);
			})
			.fail((error)=>{
				reject(error);
			});
		});		
	};


	oldCrap.addTodo = (newTodo) => {
		return new Promise ((resolve,reject) => {
			newTodo.id = `item${FbApi.todoGetter().length}`;
			console.log("newTodo",newTodo);
			FbApi.setSingleTodo(newTodo);
			resolve();
		});
	};

	oldCrap.checker = (id) => {
		return new Promise ((resolve,reject) => {
			FbApi.setChecker(id);
			resolve();
		});
	};



	return oldCrap;
})(FbApi || {});