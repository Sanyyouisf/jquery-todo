
$(document).ready(function(){
	
	$("#new-item").click(() => {
		$(".list-container").addClass("hide");
		$(".new-container").removeClass("hide");

	});

	$("#list-items").click(() => {
		$(".new-container").addClass("hide");
		$(".list-container").removeClass("hide");
	});
	FbApi.getTodos()
	.then(()=>{
		FbApi.writeDom();
		// console.log("results",results);
	})
	.catch((error)=>{
		console.log("getTodos error",error);
	});

	//add todo
	$("#add-todo-button").click(() => {
		let newTodo = {
			isCompleted:false,
			task:$("#add-todo-text").val()
		};
		console.log("newTodo",newTodo);

		FbApi.addTodo (newTodo).then(()=> {
			$("#add-todo-text").val("");
			$(".new-container").addClass("hide");
			$(".list-container").removeClass("hide");	
			FbApi.writeDom();
		}).catch((error)=> {
			console.log("error",error);
		});
	});

	// delete todo
	


	//edit todo 






});
