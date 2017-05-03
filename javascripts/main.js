$(document).ready(function() {
    let apikey;
    let editId = "";
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

    FbApi.firebaseCredentials().then((key) => {
        apikey = key;
        firebase.initializeApp(apikey);
        FbApi.writeDom(apikey);
    }).catch((error) => {
        console.log("key errors", error);
    });




    //add todo
    //when writing in the text box of the new page
    $('#add-todo-button').click(() => {
        let newTodo = {
            isCompleted: false,
            task: $('#add-todo-text').val()
        };
        if (editId.length > 0) {
            //edit
            FbApi.editTodo(apikey, newTodo, editId).then(() => {
                $('#add-todo-text').val("");
                editId = "";
                $('.new-container').addClass('hide');
                $('.list-container').removeClass('hide');
                FbApi.writeDom(apikey);
            }).catch((error) => {
                console.log("addTodo error", error);
            });
        } else {
            FbApi.addTodo(apikey, newTodo).then(() => {
                $('#add-todo-text').val("");
                $('.new-container').addClass('hide');
                $('.list-container').removeClass('hide');
                FbApi.writeDom(apikey);
            }).catch((error) => {
                console.log("addTodo error", error);
            });
        }
    });
    // delete todo
    $(".main-container").on("click", '.delete', (event) => {
        FbApi.deleteTodo(apikey, event.target.id).then(() => {
            FbApi.writeDom(apikey);
        }).catch((error) => {
            console.log(" error in deleteTodo", error);
        });
    });


    // //edit todo 
    $(".main-container").on("click", '.edit', (event) => {
        //closest go up one level
        //find go down one level
        //when clicking in the edit it grap the text and put in the text input.	
        let editText = $(event.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
        editId = event.target.id;
        $(".list-container").addClass("hide");
        $(".new-container").removeClass("hide");
        $("#add-todo-text").val(editText);

    });



    //complete todo 
    $(".main-container").on("click", 'input[type="checkbox"]', (event) => {
        // console.log("id",event.target.id);
        let myTodo = {
            isCompleted: event.target.checked,
            task: $(event.target).siblings('.task').html()
        };
        FbApi.editTodo(apikey, myTodo, event.target.id).then(() => {
            FbApi.writeDom(apikey);
            //update the counter
        }).catch((error) => {
            console.log("checker error", error);
        });
    });


    $("#registerButton").click(() => {
        console.log("register");
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let username = $("#inputUsername").val();

        let user = { email, password }; //we use this when the key and value is the same.
        FbApi.registerUser(user).then((response) => {
            console.log("register respresponseonse", response.uid);
            let newUser ={
            	uid: response.uid,
            	username:username
            };
            FbApi.addUser(apikey , newUser).then((response) => {
            	console.log(" addUser response",response);
            }).catch((error) => {
                console.log("error in addUser", error);
            });
        }).catch((error) => {
            console.log("error in register", error);
        });

    });

    let clearLogin = ()=>{
    	$("#inputEmail").val("");
    	$("#inputPassword").val("");
    	$("#inputUsername").val("");
    };

    $("#loginButton").click(()=>{
    	let email = $("#inputEmail").val();
    	let password = $("#inputPassword").val();
    	let user = {email,password};
    	FbApi.loginUser(user).then((response)=>{
    		console.log("response",response);
    		clearLogin();
    		$("#login-container").addClass("hide");
    		$(".main-container").removeClass("hide");
    		FbApi.writeDom(apikey);
    	}).catch((error)=>{
            console.log("error in loginUser", error.message);
    	});

    });




});
