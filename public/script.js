const sendRequest = (url) => {
    return fetch(url).then((response) => response.json());
};

class Item {
    constructor(id, title, price, src) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.src = src;
    }
    
    render() {return `
        <div class="goodsItem">
            <img class="goodsItem__img" src=${this.src}>
            <h3>${this.title.toUpperCase()}</h3>
            <p>${this.price} rub</p>
            <button data-id="${this.id}" class="buy btn">Добавить</button>
        </div>
    `;}
}

class ItemsList {
    constructor() {
        this.items = [];
    }
    
    getItems() {
        return sendRequest('http://localhost:3000/products')
            .then((products) => {
                this.items = products.map(item => new Item(item.id, item.title, item.price, item.src));
                this.filteredItems = this.items;
                return this.items;
            });
    }
    
    render() {
        return this.filteredItems.map(item => item.render()).join('');
    }
    
    compGoods() {
        const sum =  this.items.reduce((sum, item) => sum + item.price,0);
        return (sum !== 0) ? `Всего товаров: ${this.items.length} шт. на общую сумму - ${sum}` : `Товаров нет`;
    }
    
    filterItems(query) {
        const regexp = new RegExp(query, 'i');
        this.filteredItems = this.items.filter((item) => regexp.test(item.title));
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
    items.getItems()
        .then(() => {
            document.querySelector('.goodsList').innerHTML = items.render();
            document.querySelector('.compGoods').innerHTML = items.compGoods();
        });
    
    const $search = document.querySelector('#search');
    const $searchQuery = document.querySelector('#searchQuery');
    
    $search.addEventListener('click', () => {
        const query = $searchQuery.value;
        items.filterItems(query);
        document.querySelector('.goodsList').innerHTML = items.render();
    });
}

window.addEventListener('load', init);