const express = require('express');//подключаем експресс
const path = require('path');
const csrf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');//подключаем хандл барс
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const aboutRouts = require('./routes/about'); //подключаем внешний роут который рендерит страницу о нас
const indexRouts = require('./routes/index'); //подключаем внешний роут который рендерит страницу главную
const articlesRouts = require('./routes/articles');
const productsRouts = require('./routes/products');
const oneRouts = require('./routes/one');
const presentRouts = require('./routes/present');
const deliveryRouts = require('./routes/delivery');
const cartRouts = require('./routes/cart');
const contactRouts = require('./routes/contact');
const addRouts = require('./routes/add');
const userRouts = require('./routes/user');
const ordersRouts = require('./routes/orders');
const authRouts = require('./routes/auth')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorHandler = require('./middleware/error')
const keys = require('./keys')

const app = express();//запускаем сервер, аналогично create server
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
})
const hbs = exphbs.create({//передаем объект с каким будем работать
    defaultLayout: 'main',
    extname: 'hbs',//расширение файла
    helpers: require('./utils/hbs-helpers')
})

app.engine('hbs', hbs.engine)//регистрация как движка для рендеринга страниц(название движка в свободной форме,)
app.set('view engine', 'hbs')//регистрируем то что в експрессе есть такой движок
app.set('views','views')//регистрирем папку с нашими шаблонами

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'media')))
app.use('/products', express.static(path.join(__dirname, 'media')))
app.use('/one', express.static(path.join(__dirname, 'media')))
app.use('/one/id:', express.static(path.join(__dirname, 'media')))
app.use('/present', express.static(path.join(__dirname, 'media')))
app.use('/present/id:', express.static(path.join(__dirname, 'media')))
app.use('/auth', express.static(path.join(__dirname, 'media')))


app.use(express.urlencoded({extended: true}))//добавляем новый функционал который орабатывает пост запрос
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized:false,
    store: store
}))
app.use(csrf())
app.use(flash())

app.use(varMiddleware)
app.use(userMiddleware)


app.use('/about', aboutRouts)//региострируем роуты при помощи обработчка
app.use('/', indexRouts)
app.use('/articles', articlesRouts)
app.use('/products', productsRouts)
app.use('/contact', contactRouts)
app.use('/delivery', deliveryRouts)
app.use('/add', addRouts)
app.use('/cart', cartRouts)
app.use('/user', userRouts)
app.use('/orders', ordersRouts)
app.use('/auth', authRouts)
app.use('/one', oneRouts)
app.use('/present', presentRouts)
app.use(errorHandler)


const PORT = process.env.PORT || 8080; //значение порта

async function start(){//запуск сервера и баззы данных
    try{

        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })//подключаемся к базе данных методом коннект
        //проверяем наличие пользователя

        
        

        
        app.listen(PORT, () => {//запускаем сервер
            console.log(`Сервер запущен на порте ${PORT}`);
        })
    }catch (e){
        console.log(e)
    }
    
}
start()

