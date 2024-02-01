export default class UserModel{
    constructor(id,name,email,password,type){
        this.id = id
        this.name  = name
        this.email = email
        this.password = password
        this.type = type
    }

    static signUp(name,email,password,type){
        const newUser = new UserModel(users.length+1,name,email,password,type)
        users.push(newUser)
        return users
    }
    static signIn(email,password){
        const user = users.find(u=>u.email==email&&u.password==password)
        return user
    }
}
var users = [
    new UserModel(
    1,"sellerName","seller@gmail.com","password","seller"
    )
]