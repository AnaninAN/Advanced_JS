const sendRequest = (url) => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url); // настройка запроса 
        xhr.send(); // отправка запроса
  
        xhr.onreadystatechange = () => { // срабатывает на все изменения состояния запроса
            if(xhr.readyState === XMLHttpRequest.DONE) {
                resolve(JSON.parse(xhr.responseText));
            }
        }
    });
};

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
    
    getItems(url) {
        sendRequest(url)
            .then( products => {
                this.items = products.map(item => new Item(item.title, item.price, item.src));
            });
    }
    
    render() {
        return this.items.map(item => item.render()).join('');
    }
    
    compGoods() {
        const sum =  this.items.reduce((sum, item) => sum + item.price,0);
        return (sum !== 0) ? `Всего товаров: ${this.items.length} шт. на общую сумму - ${sum}` : `Товаров нет`;
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
    items.getItems('http://localhost:3000/products.json');
    document.querySelector('.goodsList').innerHTML = items.render();
    document.querySelector('.compGoods').innerHTML = items.compGoods();    
}

window.addEventListener('load', init);