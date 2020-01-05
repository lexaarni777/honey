const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidator = [
    body('email')
        .isEmail().withMessage('Введите корректный емаил')
        .custom(async (value,{req}) => {
            try{
                const user = await User.findOne({email: value})
                if(user){
                    return Promise.reject('Такой емаил уже занятпромис')
                    
                }
            }catch(e){
                console.log(e)
            }
        })
        .normalizeEmail(),//хелпер функция исправляет ошибки в емаил
    body('password', 'Пароль должен быть минимум 6 символов')
        .isLength({min:6, max: 56})
        .isAlphanumeric()
        .trim(),//функция хелпер удаляет лишние пробелы
    body('confirm')
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('пароди должны совпадать')
            }
                return true
            })
        .trim(),
    body('name', 'Имя дожно быть минимум 3 символа')
        .isLength({min: 3})
        .trim()
]

