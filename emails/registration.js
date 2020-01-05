const keys = require('../keys')

module.exports = function(email){
    return{
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Акаунт создан',
        html: `
        <h1>Добро пожаловать в наш магазин</h1>
        <p>вы успешно создали акаунт</p>
        <a href='${keys.BASE_HTTP}'>Магазин меда</a>
        `
    }
}