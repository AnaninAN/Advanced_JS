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
        <form class="input-group search">
            <div class="input-group-prepend" v-if="searchQuery.length">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="handleClearSearchClick">Clear</button>
            </div>
            <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search for Item..." v-model="searchQuery">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="handleSearchClick"><i class="fas fa-search"></i></button>
            </div>
        </form>
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
    
    Vue.component('filter-products', {
        template:`
        <div>
            <div class="col-xl-4 col-sm-6 colour">
                <h3>Colour</h3>
            
            </div>
            <div class="col-xl-4 col-sm-6 size">
                <h3>Size</h3>
                <div class="row">
                    <div class="col-3 d-flex align-items-center size__item">
                        <input type="checkbox" id="size__item1">
                        <label for="size__item1">XXS</label>
                    </div>
                    <div class="col-3 d-flex align-items-center size__item">
                        <input type="checkbox" id="size__item2">
                        <label for="size__item2">XS</label>
                    </div>
                    <div class="col-3 d-flex align-items-center size__item">
                        <input type="checkbox" id="size__item3">
                        <label for="size__item3">S</label>
                    </div>
                    <div class="col-3 d-flex align-items-center size__item">
                        <input type="checkbox" id="size__item4">
                        <label for="size__item4">M</label>
                    </div>
                    <div class="col-3 d-flex align-items-center size__item">
                        <input type="checkbox" id="size__item5">
                        <label for="size__item5">L</label>
                    </div>
                    <div class="col-3 d-flex align-items-center size__item">
                        <input type="checkbox" id="size__item6">
                        <label for="size__item6">XL</label>
                    </div>
                    <div class="col-3 d-flex align-items-center size__item">
                        <input type="checkbox" id="size__item7">
                        <label for="size__item7">XXL</label>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-sm-6 price">
                <h3>Price</h3>
                <div class="price__line">
                    <div class="line__activ"></div>
                    <div class="line__circle circle__pos1"></div>
                    <div class="line__circle circle__pos2"></div>
                </div>
                <div class="row">
                    <div class="col-6 price__value">$52</div>
                    <div class="col-6 price__value">$400</div>
                </div>
            </div>
        </div>
        `,
        data() {
            return {
               
            }
        },
        methods: {
            
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
                    <div class="poster__footer__price">&#36;{{ item.price }}.00</div>
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
            <th class="bodyCart__img"><img :src="item.src" :alt="item.title"></th>
            <th class="bodyCart__title">{{ item.title.toUpperCase() }}</th>
            <th class="bodyCart__price">&#36;{{ item.price }}</th>
            <th class="bodyCart__quantity">{{ item.quantity }} шт.</th>
            <th class="bodyCart__del">
                <a class="delProdCart" @click="handleDelClick(item)">X</a>
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
                <cart-item class="bodyCart" @ondel="handleDelClick" v-for="item in cart" :item="item"></cart-item>
            </table>
            <div class="totalCart" v-if="cart.length">Total: <span>&#36;{{ total }}</span></div>
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
        computed: {
            countProducts() {
              return this.cart.reduce((acc, item) => acc + item.quantity, 0);
            },
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