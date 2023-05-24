class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = parseInt(totalPrice);
    }

    addCartItem(product) {
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: parseInt(product.price)
        }



        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product.id === product.id) {
                // item.quantity++;
                // item.totalPrice+= product.price;
                // this.items[i] = item;
                cartItem.quantity = item.quantity + 1;
                cartItem.totalPrice = parseInt(item.totalPrice) + parseInt(product.price);
                this.items[i] = cartItem;

                this.totalQuantity++;
                this.totalPrice += parseInt(product.price);
                return;
            }
        }
        this.items.push(cartItem)
        this.totalQuantity++;
        this.totalPrice+= parseInt(product.price);
    }
    
    updateItem(productId , newQuantity){

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product.id === productId && newQuantity > 0) {
                const cartItem = {...item};
                const quantityChange = newQuantity - item.quantity;
                cartItem.quantity = newQuantity;
                cartItem.quantity = item.quantity + 1;
                cartItem.totalPrice = newQuantity * item.product.price;
                this.items[i] = cartItem;
    
                this.totalQuantity +=  quantityChange;
                this.totalPrice += quantityChange * item.product.price;
                if (this.totalQuantity<=0) {
                    this.totalQuantity = 0;
                    this.totalPrice = 0;
                }
                return {updatedItemPrice: cartItem.totalPrice};
            }else if(item.product.id === productId && newQuantity <= 0){
                this.items.splice(i,1);
                this.totalQuantity -= item.quantity;
                this.totalPrice-= item.totalPrice;
                if (this.totalQuantity<=0) {
                    this.totalQuantity = 0;
                    this.totalPrice = 0;
                }
                return {updatedItemPrice: 0};
            }
        }
        
    }
}

module.exports = Cart;