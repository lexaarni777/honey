const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {
   
    static async add(good){//метод добавляющий обект в масив корзины
        const cart = await Cart.fetch() //молучаем всю корзину
        
        const idx = cart.goods.findIndex(c => c.id === good.id)//задем индекс масива товара если он есть в корзине
        const candidate = cart.goods[idx]//проверяем существует ли товар с id в масиве корзины с товарами

        if(candidate){//если товар есть вкорине
            candidate.count++
            cart.goods[idx] = candidate
        }else{//если товара нет в корзине
            good.count = 1 //добавляем новый ключ к обекту товара о том что он у нас один в корзине
            
            cart.goods.push(good)//добавляем обект в масив товаров в корзине
            
        }

        console.log(cart.price)
        console.log(good.price)
        console.log(+cart.price + +good.price)


       let prise = +cart.price + +good.price
        cart.price = prise
       
   
        return new Promise((resolve,reject) => {//заппись новой корзины в файл
            fs.writeFile(p, JSON.stringify(cart), err => {
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })  
    }

    static async remove(id){
        const cart = await Cart.fetch()

        const idx = cart.goods.findIndex(c => c.id ==id)
        const good = cart.goods[idx]

        if(good.count === 1){
            cart.goods = cart.goods.filter(c => c.id !==id)
        }else{
            cart.goods[idx].count--
        }
        
        cart.price-=good.price

        return new Promise((resolve,reject) => {//заппись новой корзины в файл
            fs.writeFile(p, JSON.stringify(cart), err => {
                if(err){
                    reject(err)
                }else{
                    resolve(cart)
                }
            })
        }) 


    }

    static async fetch(){//метод получающий данные из файла json корзины
       return new Promise((resolve, reject) => {
           fs.readFile(p, 'utf-8', (err, content) => {
               if(err){
                  reject(err) 
               }else{
                   resolve(JSON.parse(content))
               }
           })
       })
    }
}

module.exports = Cart