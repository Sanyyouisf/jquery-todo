var FbApi = ((cats)=>{
	cats.registerUser = (credentials)=> {
	return new Promise ((resolve,reject)=> {
	firebase.auth().createUserWithEmailAndPassword(credentials.email,credentials.password)
	.then((authData)=> {
		resolve(authData);
	}).catch((error)=>{
		reject(error);
	});
	});	
};
return cats;
})(FbApi || {});