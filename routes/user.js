const {Router} = require('express')//подключаем роутер из експерсса
const router = Router();//содаем обект роутера через вызов функции роутера

router.get('/',(req, res) => {
    res.render('user',{
        title: 'Личный кабинет',
        isAbout: true,
        userId: req.user ? req.user._id.toString() : null
    })
})


module.exports = router //экспортируем обект роктера наружу