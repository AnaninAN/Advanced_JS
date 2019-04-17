window.onload = () => {
    const API_URL = 'http://localhost:3000';
    
    class ProdApi {
        static fetch(db) {
            return fetch(`${API_URL}/${db}`).then((response) => response.json());
        };
        
        static create(db, body) {
            return fetch(`${API_URL}/${db}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })  
                .then((response) => response.json());
        };
        
        static change(db_id, body) {
            return fetch(`${API_URL}/${db_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)   
            })
                .then((response) => response.json());
        };
        
        static delete(db_id) {
            return fetch(`${API_URL}/${db_id}`, {
                method: 'DELETE',
            })
                .then((response) => response.json());
        };
    };
    
    Vue.component('search-products', {
        template:`
        <div>
            <input type="text" class="searchQuery" placeholder="Введите строку для поиска" v-model="searchQuery">
            <button class="buy btnSearch" @click="handleSearchClick">Поиск</button>
            <button class="buy btnSearch" v-if="searchQuery.length" @click="handleClearSearchClick">Очистить фильтр</button>
        </div>
        `,
        data() {
            return {
                searchQuery: '',
            }
        },
        methods: {
            handleClearSearchClick() {
                this.searchQuery = '';
                this.$emit('onsearch', this.searchQuery);
            },
            handleSearchClick() {
                this.$emit('onsearch', this.searchQuery);
            },
        }
    });
    
    Vue.component('product-item', {
        props: ['item'],
        template: `
        <div>
            <div class="fetured__poster">
                <div class="poster__header">
                    <img :src="item.src" :alt="item.title">
                    <div class="poster__header__botton">
                        <a href="#" @click.prevent="handleBuyClick(item)">
                            <img src="img/basket.png" alt="Basket">
                            Add to&nbsp;Cart
                        </a>
                    </div>
                </div>
                <div class="poster__footer">
                    <div class="poster__footer__title">{{ item.title }}</div>
                    <div class="poster__footer__price">&#36;{{ item.price }}</div>
                </div>
            </div>
        </div>
        `,
        methods: {
            handleBuyClick(item) {
                this.$emit('onbuy', item);
            },
        }
    });
    
    Vue.component('products', {
        props: ['query'],
        template: `
        <div>
            <product-item class="col-xl-4 col-sm-6 d-flex justify-content-center" @onbuy="handleBuyClick" v-for="item in renderItems" :item="item"></product-item>
            <h3 v-if="!renderItems.length">По вашему запросу ничего не найдено</h3>
        </div>
        `,
        data() {
            return {
                items: [],
            }
        },
        mounted() {
            ProdApi.fetch('products')
                .then((items) => {
                    this.items = items;
                });
        },
        computed: {
            renderItems() {
                const regexp = new RegExp(this.query, 'i');
                return this.items.filter((item) => regexp.test(item.title));
            },
        },
        methods: {
            handleBuyClick(item) {
                this.$emit('onbuy', item);
            },
        }
    });
    
    Vue.component('cart-item', {
        props: ['item'],
        template:`
        <tr>
            <th>{{ item.title.toUpperCase() }}</th>
            <th>{{ item.price }}</th>
            <th>{{ item.quantity }}</th>
            <th>{{ item.price * item.quantity }}</th>
            <th>
                <button class="buy delProdCart" @click="handleDelClick(item)">X</button>
            </th>
        </tr>
        `,
        methods: {
            handleDelClick(item) {
                this.$emit('ondel', item);
            }
        }
    });
    
    Vue.component('cart', {
        props: ['cart','total'],
        template:`
        <div>
            <table cellspacing="0" class="cartProduct" v-if="cart.length">
                <tr class="headerCart">
                    <th>product</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>total</th>
                    <th>action</th>
                </tr>
                <cart-item class="bodyCart" @ondel="handleDelClick" v-for="item in cart" :item="item"></cart-item>
            </table>
            <div class="totalCart" v-if="cart.length">Общая сумма корзины: {{ total }}</div>
            <h3 v-if="!cart.length">Корзина пуста</h3>
        </div>
        `,
        methods: {
            handleDelClick(item) {
                this.$emit('ondel', item);
            },
        }
    });
    
    const app = new Vue({
        el: '#app',
        data: {
            searchQuery: '',
            cart: [],
            total: 0,
            display: 'none',
        },
        mounted() {
            ProdApi.fetch('cart')
                .then((result) => {
                    this.cart = result.items;
                    this.total = result.total;
                    this.display = 'block';
                });
        },
        methods: {
            handleSearch(query) {
                this.searchQuery = query;
            },
            handleBuyClick(item) {
                const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);                
                if(cartItem) {
                    ProdApi.change(`cart/${item.id}`, {quantity: cartItem.quantity + 1})    
                        .then((result) => {
                            const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                            Vue.set(this.cart, itemIdx, result.item);
                            this.total = result.total;
                        });
                } else {
                    ProdApi.create('cart', {...item, quantity: 1})
                        .then((result) => {
                            this.cart.push(result.item);
                            this.total = result.total;
                        });
                }
            },
            handleDelClick(item) {
                if(item.quantity > 1) {
                    ProdApi.change(`cart/${item.id}`, {quantity: item.quantity - 1})
                        .then((result) => {
                            const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                            Vue.set(this.cart, itemIdx, result.item);
                            this.total = result.total;
                        });
                } else {
                    if (confirm('Удалить из корзины товар ' + item.title.toUpperCase() + '?'))
                        ProdApi.delete(`cart/${item.id}`)
                            .then((result) => {
                                const itemIdx = this.cart.findIndex((cartItem) => cartItem.id === item.id);
                                this.cart.splice(itemIdx, 1);
                                this.total = result.total;
                            });
                }
            },
        }
    });
}