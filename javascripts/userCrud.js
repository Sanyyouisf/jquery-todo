var FbApi = ((fish) => {
    fish.addUser = (keys, newUser) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'POST',
                url:`${keys.databaseURL}/users.json`,
                data: JSON.stringify(newUser)
            }).done((response) => {
                resolve(response) ;
            }).fail((error) => {
                reject(error);
            });
        });
    };

    // i will give the function the id and it will grap the user that vave this id
    fish.getUser = (keys, uid) => {
        let users = [];
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: `${keys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
            }).done((user) => {
                console.log("user iife get", user);
                let response = user;
                Object.keys(response).forEach((key) => {
                    response[key].id = key;
                    users.push(response[key]);
                });
                resolve(users[0]);
            }).fail((error) => {
                reject(error);
            });
        });
    };


    return fish;
})(FbApi || {});
