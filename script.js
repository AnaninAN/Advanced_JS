// список товаров

class Item {
    constructor(title, price, src) {
        this.title = title;
        this.price = price;
        this.src = src;
    }
    
    render() {return `
        <div class="goodsItem">
        <img class="goodsItem__img" src=${this.src}>
        <h3>${this.title.toUpperCase()}</h3>
        <p>${this.price} rub</p>
        <button class="buy btn">Добавить</button>
        </div>
    `;}
}

class ItemsList {
    constructor() {
        this.items = [];
    }
    
    getItems() {
        this.items = [
            {title: 'Shirt', price: 1500, src: 'img/catalog/small/shirt.jpg'},
            {title: 'jeans', price: 3500, src: 'img/catalog/small/jeans.jpg'},
            {title: 'jacket', price: 7000, src: 'img/catalog/small/jacket.jpg'},
            {title: 'shorts', price: 750, src: 'img/catalog/small/shorts.jpg'},
            {title: 'sweater', price: 2300, src: 'img/catalog/small/sweater.jpg'},
            {title: 'blazer', price: 5500, src: 'img/catalog/small/blazer.jpg'},
        ];
        
        this.items = this.items.map(item => new Item(item.title, item.price, item.src));
    }
    
    render() {
        return this.items.map(item => item.render()).join('');
    }
    
    compGoods() {
        let sum = 0;
        for (let i=0; i<this.items.length;i++){
            sum += this.items[i].price;
        }
        return (sum != 0) ? `Всего товаров: ${this.items.length} шт. на общую сумму - ${sum}` : `Товаров нет`;
    }
    
}

// ------------------------ корзина ------------------------------ //

class ItemCart extends Item {
    constructor(title, price, src, quantity) {
        super(title, price, src);
        
        this.quantity = 0;
    }
    
    render() {
        //Метод для отображения элемента корзины товаров
    }
    
    totalSum() {
        //Метод для подсчета общей суммы одного товара (price * quantity)
    }
}

class CartList {
    constructor() {
        this.cart = [];    
    }
    
    render() {
        //Метод для отображения товаров в корзине
    }
    
    getItemCart() {
        //Метод добавления товара в корзину
    }
    
    delItemCart() {
        //Метод удаления товара из корзины
    }
    
    compCart() {
        //Метод для отображения информации общего количества и суммы всех товаров (Всего товаров...)
    }
    
}

// ---------------------------------------------------------------- //

function init() {
    const items = new ItemsList();
    items.getItems();
    
    document.querySelector('.goodsList').innerHTML = items.render();
    document.querySelector('.compGoods').innerHTML = items.compGoods();
}

window.addEventListener('load', init);