const {Router} = require('express')//подключаем роутер из експерсса
const router = Router();//содаем обект роутера через вызов функции роутера

router.get('/',(req, res) => {
    res.render('about',{
        title: 'О нас',
        isAbout: true
    })
})


module.exports = router //экспортируем обект роктера наружу