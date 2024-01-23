export default class userModel{
    constructor(_id,_name,_email,_password){
        this.id=_id;
        this.name=_name;
        this.email=_email;
        this.password=_password;
    }

    static addUser(name,email,password){
        const newUser = new userModel(users.length+1,name,email,password);
        users.push(newUser);
    }
    static isValidUser(email,password){
        // console.log(email,password);
        return users.find(u => u.email == email && u.password == password); // finding if user exist or not
    }
    static returnName(email){
        return users.find(u => u.email == email);
    }
}

var users = [];