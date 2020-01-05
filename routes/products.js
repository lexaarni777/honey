const {Router} = require('express');
const Goods = require('../models/goods');//определяем модель товаров
const router = Router();
const auth = require('../middleware/auth')

function isOwner(good, req){
    return good.userId.toString() === req.user._id.toString()
}

router.get('/', async (req, res) => {
    try{
        res.render('products',{//рендерим страницу предедавая след инфу
            title: 'Продукция',
            isProducts: true,
           
    })
    }catch(e){
        console.log(e)
    }
    
})

module.exports = router