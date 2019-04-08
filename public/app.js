window.onload = () => {
    const API_URL = 'http://localhost:3000';
    
    class ProdApi {
        static fetch(bd) {
            return fetch(`${API_URL}/${bd}`).then((response) => response.json());
        };
        
        static create(bd, body) {
            return fetch(`${API_URL}/${bd}`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then((response) => response.json()); 
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
            <div class="poster__header">
                <a class="bigImg" href="#" name="" @click.prevent>
                    <img class="smallImg" :src="item.src">
                </a>
            </div>
            <div class="poster__footer">
                <div class="poster__footer__name">{{ item.title.toUpperCase() }}</div>
                <div class="poster__footer__price">{{ item.price + ' rub' }}</div>
                <button class="buy" @click="handleBuyClick(item)">Купить</button>
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
            <product-item class="poster" @onbuy="handleBuyClick" v-for="item in renderItems" :item="item"></product-item>
            <h3 v-if="!renderItems.length">По вашему запросу ничего не найдено</h3>
        </div>
        `,
        data() {
            return {
                items: [],
            }
        },
        mounted() {
            ProdApi.fetch('products').then((items) => this.items = items);
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
                    fetch(`${API_URL}/cart/${item.id}`,{
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({quantity: cartItem.quantity + 1})   
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                            Vue.set(this.cart, itemIdx, result.item);
                            this.total = result.total;
                        }
                    );
                } else {
                    ProdApi.create('cart', {...item, quantity: 1})
                        .then((result) => {
                            this.cart.push(result.item);
                            //this.total = result.total;
                        });
                }
            },
            handleDelClick(item) {
                if(item.quantity > 1) {
                    fetch(`${API_URL}/cart/${item.id}`,{
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({quantity: item.quantity - 1})   
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                            Vue.set(this.cart, itemIdx, result.item);
                            this.total = result.total;
                    });
                } else {
                    if (confirm('Удалить из корзины товар ' + item.title.toUpperCase() + '?'))
                        fetch(`${API_URL}/cart/${item.id}`,{
                            method: 'DELETE',
                        })
                            .then((response) => response.json())
                            .then((result) => {
                                const itemIdx = this.cart.findIndex((cartItem) => cartItem.id === item.id);
                                this.cart.splice(itemIdx, 1);
                                this.total = result.total;
                            }
                        );
                }
            },
        }
    });
}