document.querySelectorAll('.card-price').forEach(node => {//получаем все элементы с класом price иперебираем полученный масив 
    node.textContent = new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(node.textContent)
})

const $cart = document.querySelector('#cart')//получаем див c указанным id
if($cart){
    $cart.addEventListener('click', event =>{//добавляем обработчик событий клик
        if(event.target.classList.contains('js-remove')){//если тот элемнт по которому совершен клик у него есть поле класслист и у данного обекта запускаем метод который проверяет наличе класса джсремуве 
            const id = event.target.dataset.id//получаем id
            const csrf = event.target.dataset.csrf
            

            fetch('/cart/remove/' + id, {
                method:'delete',
                headers:{
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
                .then(cart => {
                    if(cart.goods.length){
                        const html = cart.goods.map(c => {
                            return `
                            <tr>
                                <td>${c.title}</td>
                                <td>${c.count}</td>
                                <td>
                                    <button class='btn btn-small js-remove' data-id='${c.id}'>Удалить</button>
                                </td>
                            </tr>
                            `
                        }).join('')
                        $cart.querySelector('tbody').innerHTML = html
                        $cart.querySelector('.price').textContent = cart.price
                    }else{
                        $cart.innerHTML = '<p>Корзина пуста</p>'
                    }
                })
        }
    })
}