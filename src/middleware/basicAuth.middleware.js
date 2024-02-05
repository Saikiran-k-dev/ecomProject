import UserModel from "../features/users/users.model.js"

const basicAuthorizer = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    if(!authHeader){
        return res.status(401).send("No authorization deatils found")
    } 
    const base64Credentials = authHeader.replace('Basic','')
    const decodeCreds = Buffer.from(base64Credentials,'base64').toString('utf-8')
    const creds = decodeCreds.split(':')
    const user = UserModel.getAll().find(u=>u.email==creds[0]&&u.password==creds[1])
    if(user){
        next()
    } else {
        res.status(401).send("invalid credentials")
    }
}

export default basicAuthorizer