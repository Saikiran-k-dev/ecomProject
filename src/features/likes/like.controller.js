import LikeRepositories from "./like.repositories.js";


export default class LikeController{
    constructor(){
        this.likeRepository=new LikeRepositories
    }
    async likeItem(req,res){
        const {id,type}=req.body
        try {
            if(type!='Product' && type!='Category'){
                res.status(400).send("invalid type")
            }
            if(type=='Product'){
                await this.likeRepository.likeProduct(req.userId, id)
            } else {
                await this.likeRepository.likeCategory(req.userId, id)
            }
        } catch (error) {
            console.log(error)
        }
    }
}