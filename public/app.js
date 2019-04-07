window.onload = () => {
    const API_URL = 'http://localhost:3000';
    
    Vue.component('search-products', {
        props: ['value','isfilter','filteritems','clearfilter'],
        template:`
        <div class="container">
            <input type="text" class="searchQuery" placeholder="Введите строку для поиска" :value="value" @input="$emit('input', $event.target.value)">
            <button class="buy btnSearch" @click="filteritems">Поиск</button>
            <button class="buy btnSearch" v-if="isfilter" @click="clearfilter">Очистить фильтр</button>
        </div>
        `
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
            }
        }
    });
    
    Vue.component('products', {
        props: ['items','isfilternull'],
        template: `
        <div class="catalog">
            <product-item class="poster" @onbuy="handleBuyClick" v-for="item in items" :item="item"></product-item>
            <h3 v-if="!isfilternull">По вашему запросу ничего не найдено</h3>
        </div>
        `,
        methods: {
            handleBuyClick(item) {
                this.$emit('onbuy', item);
            }
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
        props: ['items','isvisiblecart','totalcart'],
        template:`
        <div class="cart">
            <h2>Корзина</h2>
            <table cellspacing="0" class="cartProduct" v-if="isvisiblecart">
                <tr class="headerCart">
                    <th>product</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>total</th>
                    <th>action</th>
                </tr>
                <cart-item class="bodyCart" @ondel="handleDelClick" v-for="item in items" :item="item"></cart-item>
            </table>
            <div class="totalCart" v-if="isvisiblecart">Общая сумма корзины: {{ totalcart }}</div>
            <h3 v-if="!isvisiblecart">Корзина пуста</h3>
        </div>
        `,
        methods: {
            handleDelClick(item) {
                this.$emit('ondel', item);
            }
        }
    });
    
    const app = new Vue({
        el: '#app',
        data: {
            items: [],
            search: '',
            searchQuery: '',
            cart: [],
            display: 'none',
        },
        methods: {
            filterItems() {
                this.searchQuery = this.search;
            },
            clearFilter() {
                this.search = '';
                this.searchQuery = '';
            },
            handleBuyClick(item) {
                const cartItem = this.cart.find(cartItem => cartItem.id === item.id);                
                if(cartItem) {
                    fetch(`${API_URL}/cart/${item.id}`,{
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({quantity: cartItem.quantity + 1})   
                    })
                        .then((response) => response.json())
                        .then((updated) => {
                            const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                            console.log(this.search);
                            Vue.set(this.cart, itemIdx, updated);
                        }
                    );
                } else {
                    fetch(`${API_URL}/cart`,{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({...item, quantity: 1})
                    })
                        .then((response) => response.json())
                        .then((created) => {
                            this.cart.push(created); 
                        }
                    );
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
                        .then((updated) => {
                            const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                            console.log(this.search);
                            Vue.set(this.cart, itemIdx, updated);
                    });
                } else {
                    if (confirm('Удалить из корзины товар ' + item.title.toUpperCase() + '?'))
                        fetch(`${API_URL}/cart/${item.id}`,{
                            method: 'DELETE',
                        })
                            .then(() => {
                                const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                                this.cart.splice(itemIdx, 1);
                            }
                        );
                }
            }
        },
        mounted() {
            fetch(`${API_URL}/products`)
                .then((response) => response.json())
                .then((items) => {
                    this.items = items;
                    this.display = 'block';
                });
            fetch(`${API_URL}/cart`)
                .then((response) => response.json())
                .then((items) => {
                    this.cart = items;
                });
        },
        computed: {
            renderItems() {
                const regexp = new RegExp(this.searchQuery, 'i');
                return this.items.filter((item) => regexp.test(item.title));
            },
            isFilterNull() {
                const regexp = new RegExp(this.searchQuery, 'i');
                return this.items.filter((item) => regexp.test(item.title)).length;
            },
            isFilter() {
                return this.search.length;
            },
            renderCart() {
                return this.cart;
            },
            isVisibleCart() {
                return this.cart.length;
            },
            totalCart() {
                return this.cart.reduce((sum, item) => sum + item.price*item.quantity, 0);
            }
        }
    });
}