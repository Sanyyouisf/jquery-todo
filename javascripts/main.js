
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
		countTask();
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
			countTask();
		}).catch((error)=> {
			console.log("error",error);
		});
	});

	// delete todo
	


	//edit todo 

	//complete todo 


	let countTask = () => {
		let remainingTasks = $("incompleted-tasks li").length;
		$("#counter").hide().fadeIn(3000).html(remainingTasks);
	};

});
