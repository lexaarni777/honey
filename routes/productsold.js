const {Router} = require('express');
const Goods = require('../models/goods');//определяем модель товаров
const router = Router();

router.get('/', async (req, res) => {
    const goods = await Goods.getAll()////создаем обект товаров с из файла
    res.render('products',{//рендерим страницу предедавая след инфу
        title: 'Продукция',
        isProducts: true,
        goods
    })
})

router.get('/:id/edit', async(req,res)=>{//обработчик на изменение товара
    if(!req.query.allow){//ищет параметр который позволяет изменять информацию о товаре
        return res.redirect('/')
    }

    const good = await Goods.getById(req.params.id)

    res.render('good-edit',{
        title: `Редактировать ${good.title}`,
        good
    })
})

router.post('/edit', async (req, res) => {//обрабатываем изменения
    await Goods.update(req.body)
    res.redirect('/products')
})

//обрабатываем новую страницу по каждому товару
router.get('/:id', async(req, res) => {
    const good = await Goods.getById(req.params.id)
    res.render('good',{
        title: `${good.title}`,
        good
    })
})

module.exports = router