const {Schema, model} = require('mongoose')//забираем две сущности из монгусе

const goods = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required:false
    },
    price:{
        type: Number,
        required: true
    },
    type:{
        type:Number,
        require: true,
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

goods.method('toClient', function(){
    const good = this.toOject()

    good.id = good._id
    delete good._id
    return good
})

module.exports = model('Good', goods)