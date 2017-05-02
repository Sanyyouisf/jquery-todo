
$(document).ready(function(){
	let apikey ;
	//when clicking on new it hide the list-container and show new-container  
	$("#new-item").click(() => {
		$(".list-container").addClass("hide");
		$(".new-container").removeClass("hide");

	});

	//when clicking on new it hide the new-container and show list-container  
	$("#list-items").click(() => {
		$(".new-container").addClass("hide");
		$(".list-container").removeClass("hide");
	});

	FbApi.firebaseCredentials().then((key)=> {
		apikey = key;
    firebase.initializeApp(apikey);
    FbApi.writeDom(apikey);
     countTask();
   }).catch((error) => {
     console.log("key errors", error);
   });
	



	// FbApi.getTodos()
	// .then(()=>{
	// 	FbApi.writeDom();
	// 	countTask();
	// 	// console.log("results",results);
	// })
	// .catch((error)=>{
	// 	console.log("getTodos error",error);
	// });





	//add todo
	//when writing in the text box of the new page
	$("#add-todo-button").click(() => {
		//add new object that is not completed (isCompleted:false) and will add to to do list .
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
	$(".main-container").on("click",'.delete',(event)=> {
		FbApi.deleteTodo(event.target.id).then(()=>{
			FbApi.writeDom();
			countTask();
		}).catch((error)=>{
			console.log(" error in deleteTodo",error);
		});
	});
	

	//edit todo 
	$(".main-container").on("click",'.edit',(event)=> {
		//closest go up one level
		//find go down one level
		//when clicking in the edit it grap the text and put in the text input.
		
		let editText = $(event.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
		console.log("editText",editText);
		FbApi.editTodo(event.target.id).then(()=>{
		$(".list-container").addClass("hide");
		$(".new-container").removeClass("hide");
		$("#add-todo-text").val(editText);

			// FbApi.writeDom();
			// countTask();
		}).catch((error)=>{
			console.log(" error in editTodo",error);
		});
	});



	//complete todo 
	$(".main-container").on("click", 'input[type="checkbox"]',(event)=>{
		console.log("id",event.target.id);
			//convert the item that you click on to be completed .
		FbApi.checker(event.target.id).then(()=>{
			FbApi.writeDom();
			//update the counter
			countTask();
		}).catch((error)=>{
			console.log("checker error",error);
		});
	});



	let countTask = () => {
		//number of uncompleted tasks(in todo list).
		let remainingTasks = $("#incompleted-tasks li").length;
		//every 300 sec will fadein with the new number of uncompleted.
		$("#counter").hide().fadeIn(300).html(remainingTasks);
	};

});
