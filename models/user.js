const {Schema, model} = require('mongoose')

const userSchema = new Schema({//создаем пользователя
    email:{
        type: String,
        required: true
    },
    name: String,
    password:{
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExp: Date,
    cart: {
        items: [
            {
                count:{
                    type: Number,
                    required: true,
                    default: 1
                },
                goodId:{
                    type: Schema.Types.ObjectId,//тип у данного обекта будет обджект айди  тоесть стринг
                    ref: 'Good',
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(good){
    const items = [...this.cart.items]//получаем копию имеющегося массива из корзины
    const idx = items.findIndex(c => {
        
        return c.goodId.toString() === good._id.toString()
    })
   
    if(idx >= 0){
        items[idx].count = items[idx].count + 1
    }else{
        
        items.push({
            goodId: good._id,
            count: 1
        })
    }

    this.cart = {items}
    //const newCart = {items: clonedIems}
    //this.cart = newCart
    return this.save()
}

userSchema.methods.removeFromCart = function(id){
    let items = [...this.cart.items]
   
    const idx = items.findIndex(c => {
        return c.goodId.toString() === id.toString()
    })
    if(items[idx].count === 1){
        items = items.filter(c => c.goodId.toString() !== id.toString())
    }else{
        items[idx].count--
    }
    this.cart = {items}
    return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart = {items:[]}
    return this.save()
}
module.exports = model('User', userSchema)