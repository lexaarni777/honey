const {Router} = require('express');//подключаем роутер из експерсса
const Order = require('../models/order');
const router = Router();//содаем обект роутера через вызов функции роутера
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try{
        //получение всех заказов к нашему айди
        const orders = await Order.find({'user.userId': req.user._id})
            .populate('user.userId')
        
        
        res.render('orders',{
            title: 'Мои заказы',
            isAbout: true,
            orders: orders.map(o => {
                return{
                    ...o._doc,
                    price: o.goods.reduce((total, c) => {
                        return total += c.count * c.good.price
                    },0)
                }
            })
        })
    }catch(e){
        console.log(e)
    }
})

router.post('/', async (req,res) => {
    try{
        const user = await req.user
        .populate('cart.items.goodId')
        .execPopulate()

        const goods = user.cart.items.map(i => ({
            count: i.count,
            good: {...i.goodId._doc}
        }))

        const order = new Order({
            user:{
                name: req.user.name,
                userId: req.user
            },
            goods: goods
        })

        await order.save()
        await req.user.clearCart()

        res.redirect('/orders')
    }catch(e){
        console.log(e)
    }
})


module.exports = router //экспортируем обект роктера наружу