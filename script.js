const goods = [
    {title: 'Shirt', price: 1500, src: 'img/catalog/small/shirt.jpg'},
    {title: 'jeans', price: 3500, src: 'img/catalog/small/jeans.jpg'},
    {title: 'jacket', price: 7000, src: 'img/catalog/small/jacket.jpg'},
    {title: 'shorts', price: 750, src: 'img/catalog/small/shorts.jpg'},
    {title: 'sweater', price: 2300, src: 'img/catalog/small/sweater.jpg'},
    {title: 'blazer', price: 5500, src: 'img/catalog/small/blazer.jpg'},
];

const renderGoodsItem = ({title, price, src}) => {
    return `<div class="goodsItem"><img class="goodsItem__img" src=${src}><h3>${title.toUpperCase()}</h3><p>${price} rub</p><button class="buy btn">Добавить</button></div>`;
}

const renderGoodsList = list => {
    const goodsList = list.map(renderGoodsItem);
    document.querySelector('.goodsList').innerHTML = goodsList.join('');
}

function init() {
    renderGoodsList(goods);
}

window.addEventListener('load', init);
