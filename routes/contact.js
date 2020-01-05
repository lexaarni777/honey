const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('contact',{
        title: 'Контакты',
        isСontact: true
    })
})

module.exports = router