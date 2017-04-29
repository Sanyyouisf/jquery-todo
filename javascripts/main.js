
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
	$(".main-container").on("click", 'input[type="checkbox"]',(event)=>{
		console.log("id",event.target.id);
		FbApi.checker(event.target.id).then(()=>{
			FbApi.writeDom();
			countTask();
		}).catch((error)=>{
			console.log("checker error",error);
		});
	});



	let countTask = () => {
		let remainingTasks = $("#incompleted-tasks li").length;
		$("#counter").hide().fadeIn(300).html(remainingTasks);
	};

});
