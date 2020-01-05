const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('articles',{
        title: 'Статьи',
        isArticles: true
    })
})


module.exports = router