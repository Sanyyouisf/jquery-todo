//main iffe
var FbApi = (() => {
	let todos = [];
	return {
		firebaseCredentials : () => {
			return new Promise((resolve ,reject) => {
			$.ajax("apikey.json")
			.done((data) =>{
				resolve(data);
			})
			.fail((error)=> {
				reject(error);
			});
			});
		}
	};

})();
