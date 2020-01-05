const uuid = require('uuid/v4') //подключаем индификатор id
const fs = require('fs')//обект по работа с файловой ситемой
const path = require('path')//строит пути

class Goods{//инициализируем конструктор
    constructor(title,price,img){
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid() //задаем id курса
    }

    toJSON(){//возвращает обект
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id 
        }
    }

    static async update(good){//содаем метод который меняет инфу
        const goods = await Goods.getAll()//получаем все товары
        
        const idx = goods.findIndex(c => c.id === good.id)//индекс курса которого надо обновить
        goods[idx] = good//меняем обект товара в масиве с товарами
        //и возвращаем новый обект
        return new Promise((resolve,reject) =>{
            fs.writeFile(//метод записывает информацию в файл
                path.join(__dirname, '..', 'data', 'goods.json'),//указываем путь до файла
                JSON.stringify(goods),//дата которую надо записать
                (err) =>{
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }
            )
        })
    }

    async save(){ //метод которойы сохраняет данные в джейсон файл
       const goods = await Goods.getAll()//получаем результать из метода getAll и добавляем даннные товара в масив
        goods.push(this.toJSON())//добавляем обект в масив
        
        return new Promise((resolve,reject) =>{
            fs.writeFile(//метод записывает информацию в файл
                path.join(__dirname, '..', 'data', 'goods.json'),//указываем путь до файла
                JSON.stringify(goods),//дата которую надо записать
                (err) =>{
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }
            )
        })
    }

    static getAll(){//метод который читает файл с базы данных сохранненых товаров
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data','goods.json'),
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err)
                    }else{
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id){//метод возврящяющий обект по id
        const goods = await Goods.getAll()//получаем масив всех товаров
        return goods.find(c => c.id === id)//ищем по id
    }
}

module.exports = Goods