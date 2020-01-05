const {Router} = require('express');
const Goods = require('../models/goods');//определяем модель товаров
const router = Router();
const auth = require('../middleware/auth')

function isOwner(good, req){
    return good.userId.toString() === req.user._id.toString()
}

router.get('/', async (req, res) => {
    try{
        let goodsOne = await Goods.find()//создаем обект товаров с из файла
        .populate('userId', 'email name')
        .select('price title description img type')
        console.log('отображение всего масива________1___________' + goodsOne)
        
        console.log('отображение ________1___________товара' + goodsOne[0])
        console.log('отображение ________2___________товара' + goodsOne[1])
        for(let i=0; i < goodsOne.length; i++){
        console.log('отображение каждого товара_______2_________'+ goodsOne[i])
        console.log('отопражение типа товара______3________'+ goodsOne[i].type)
            if(goodsOne[i].type != '2'){//1 Это для личного
                delete goodsOne[i]
            }
        }

        res.render('present',{//рендерим страницу предедавая след инфу
            title: 'Подарочные наборы',
            isProducts: true,
            userId: req.user ? req.user._id.toString() : null,
            goodsOne
    })
    }catch(e){
        console.log(e)
    }
    
})

router.get('/:id/edit', auth, async(req,res)=>{//обработчик на изменение товара
    if(!req.query.allow){//ищет параметр который позволяет изменять информацию о товаре
        return res.redirect('/')
    }
    try{
       const good = await Goods.findById(req.params.id)
       
        if(!isOwner(good, req)){
            return res.redirect('/one')
        }
        res.render('good-edit',{
           title: `Редактировать ${good.title}`,
           good
       })
    }catch(e){
        console.log(e)
    }
})

router.post('/edit', auth, async (req, res) => {//обрабатываем изменения
    try{
        const {id} = req.body//забираем id njdfhf
        delete req.body.id
        const good = await Goods.findById(id)
        if(!isOwner(good, req)){
            return res.redirect('/products')
        }
        Object.assign(good, req.body)
        await good.save()
        res.redirect('/products')
    }catch(e){
        console.log(e)
    }
})

router.post('/remove', auth, async (req, res) => {//Обработчик удаляющий товар из общего списка товаров
    try{
        await Goods.deleteOne({
            _id: req.body.id//условие для удаления товара
        })
        res.redirect('/products')
    }catch(e){
        console.log(e)
    }
})

//обрабатываем новую страницу по каждому товару
router.get('/:id', async(req, res) => {
    const good = await Goods.findById(req.params.id)
    res.render('good',{
        title: `${good.title}`,
        good
    })
})

module.exports = router