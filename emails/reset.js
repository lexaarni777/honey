const keys = require('../keys')

module.exports = function(email, token){
    return{
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Востановление пароля',
        html: `
        <h1>Вы забыли пароль?</h1>
        <p>нажмите на ссылку ниже:</p>
        <p>
        <a href='${keys.BASE_HTTP}/auth/password/${token}'>Нажми на меня</a>
        <string>${keys.BASE_HTTP}/auth/password/${token}</string>
        </p>`
    }
}
