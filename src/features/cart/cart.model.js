export default class CartModel{
    constructor(userId,productId,quantity){
        this.userId = userId
        this.productId = productId
        this.quantity = quantity
    }
    static addToCart(userId,productId,quantity){
        const alreadyPresent = cartItems.findIndex(u=>userId==userId && u.productId==productId)
        
        if(alreadyPresent>=0){
            const id = cartItems[alreadyPresent].id
            console.log(id)
            cartItems[alreadyPresent] =  {
                userId:userId,
                productId:productId,
                quantity:quantity,
                id:id
            }
            return cartItems[alreadyPresent]
        } 

        const cartItem = new CartModel(userId,productId,quantity,cartItems.length+1)
        cartItems.push(cartItem)
        return cartItem
    }
    static getCart(userId){
        const items = cartItems.filter(u=>u.userId==userId)
        return items
    }
    static deleteCart(cartId,userId){
        const cartItemIndex = cartItems.findIndex(c=>c.id==cartId && c.userId==userId)
        // console.log(cartItemIndex)
        if(cartItemIndex==-1){
            return "item not found"
        } else {
            cartItems.splice(cartItems,1)
        }
    }
}
var cartItems = [new CartModel(1,2,1,1)]