const {Router} = require('express');
const Goods = require('../models/goods');//подключаем консруктор
const router = Router();
const auth = require('../middleware/auth')


router.get('/', auth, (req, res) => {
    if(req.user._id.toString() == '5dc7fec2ba4417351035f84f'){
        res.render('add',{
            title: 'Добавить',
            isArticles: true,
        })
    }else{
        res.redirect('/products')
    }
    
})

router.post('/', auth, async (req,res) => {
    //const goods = new Goods(req.body.title, req.body.price, req.body.img)//создаем обект с использованием консруктора
    const goods = new Goods({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        type: req.body.type,
        img: req.body.img,
        userId: req.user
    })
    try{
        await goods.save()//вызываем метод сейв
        res.redirect('/products')
    }catch (e) {
        console.log(e)
    }
})


module.exports = router