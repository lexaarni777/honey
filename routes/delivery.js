const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('delivery',{
        title: 'Доставка и оплата',
        isDelivery: true
    })
})


module.exports = router