const {Router} = require('express');
const Good = require('../models/goods');//подключаем метод товаров
const router = Router();
const auth = require('../middleware/auth')

function mapCartItems(cart){
    return cart.items.map(c => ({
        ...c.goodId._doc,
        id: c.goodId.id,
        count: c.count
    }))
}

function computePriceCart(goods){
    return goods.reduce((total, good) => {
        return total += good.price * good.count
    },0)
}

router.post('/add', auth, async (req, res) =>{
    const good = await Good.findById(req.body.id)//получаем товар объект по id
    
    //await Cart.add(good)//вызываем метод адд в модуле корзины передавая в него обект товара
    await req.user.addToCart(good)
    
    res.redirect('/cart')
    
})

router.delete('/remove/:id', auth, async(req, res) => {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.goodId').execPopulate()
    const goods = mapCartItems(user.cart)
    const cart = {
        goods, price: computePriceCart(goods)
    }

    res.status(200).json(cart)
})

router.get('/',auth, async (req, res) => {
    //получаем корзину пользователя
    const user = await req.user
        .populate('cart.items.goodId')
        .execPopulate()

    const goods = mapCartItems(user.cart)
    res.render('cart', {
        title: 'Корзина',
        isCart: true,//для навигации меню
        goods: goods,
        price: computePriceCart(goods)
    })
})

module.exports = router