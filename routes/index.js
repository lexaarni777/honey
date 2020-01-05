const {Router} = require('express');
const router = Router();
const Goods = require('../models/goods');//определяем модель товаров

router.get('/', async (req, res) => {
    try{
        const goodsTop = await Goods.find()//создаем обект товаров с из файла
        .populate('userId', 'email name')
        .select('price title description img')
        
        goodsTop.splice(3)
        console.log(goodsTop)
        
        res.render('index',{//рендерим страницу предедавая след инфу
            title: 'Главная страница',
            isHome: true,
            userId: req.user ? req.user._id.toString() : null,
            goodsTop
    })
    }catch(e){
        console.log(e)
    }
    
})

module.exports = router