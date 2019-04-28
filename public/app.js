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
        
        static deleteAll(db) {
            return fetch(`${API_URL}/${db}`, {
                method: 'DELETE',
            })
                .then((response) => response.json());
        };
    };
    
    Vue.component('header-shop',{
        props: ['countproducts','cart','total','iduser','name','pagehtml'],
        template:`
        <div>
            <div class="row align-items-center">
                <div class="col-xl-2 col-md-3">
                    <a href="index.html" class="logo">
                        <img src="img/logo.png" alt="Brand" class="logo__img">
                        BRAN<span>D</span>
                    </a>
                </div>
                <div class="col-md-3 col-sm-7">
                    <search-products @onsearch="handleSearch" v-if="pagehtml === 'products'"></search-products>
                </div>
                <div class="col-md-4 col-sm-7 signReg">
                    <a href="#myModal" data-toggle="modal" v-if="!iduser.length" @click.prevent="signIn">Sign in</a>
                    <a href="#" v-if="iduser.length">Hello,&#8194;<span class="nameUser">{{ name }}</span></a>
                    &#8195;|&#8195;
                    <a href="#myModal" data-toggle="modal" v-if="!iduser.length" @click.prevent="reg">Registration</a>
                    <a href="#" v-if="iduser.length" @click.prevent.stop="logout">log out</a>
                </div>
                <div class="col-md-2">
                    <cart-btn class="btn-group basket" :countproducts="countproducts" :cart="cart" :total="total" :carthtml="false" @ondel="handleDelClick" @ongotocart="goToCart"></cart-btn>
                </div>
            </div>
        </div>
        `,
        methods: {
            handleSearch(search) {
                this.$emit('onsearch', search);
            }, 
            handleDelClick(item) {
                this.$emit('ondel', item);
            },
            goToCart() {
                this.$emit('ongotocart');
                console.log(3);
            },
            signIn() {
                this.$emit('onsignin');
            },
            reg() {
                this.$emit('onreg');
            },
            logout() {
                this.$emit('onlogout');
            },
        },
    });
    
    Vue.component('lk', {
        props: [],
        template:`

        `
    });
    
    Vue.component('footer-shop',{
        template:`
        <div>
            <div class="row">
                <div class="col-lg-5">
                    <div class="footer__top__brand">
                        <a href="index.html" class="logo top__brand">
                            <img src="img/logo.png" alt="Brand" class="logo__img">
                            BRAN<span>D</span>
                        </a>
                        <p>Objectively transition extensive data rather than cross functional solutions. Monotonectally syndicate multidisciplinary materials before go&nbsp;forward benefits. Intrinsicly syndicate an&nbsp;expanded array of&nbsp;processes and cross-unit partnerships.</p>
                        <p>Efficiently plagiarize 24/365 action items and focused infomediaries. Distinctively seize superior initiatives for wireless technologies. Dynamically optimize.</p>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="footer__top">
                        <h5>COMPANY</h5>
                        <p><a href="#">Home</a></p>
                        <p><a href="#">Shop</a></p>
                        <p><a href="#">About</a></p>
                        <p><a href="#">How It&nbsp;Works</a></p>
                        <p><a href="#">Contact</a></p>
                    </div>
                </div>
                <div class="col-lg-2 d-flex justify-content-lg-end">
                    <div class="footer__top">
                        <h5>INFORMATION</h5> 
                        <p><a href="#">Tearms&amp;Condition</a></p>
                        <p><a href="#">Privacy&nbsp;Policy</a></p>
                        <p><a href="#">How&nbsp;to&nbsp;Buy</a></p>
                        <p><a href="#">How to&nbsp;Sell</a></p>
                        <p><a href="#">Promotion</a></p>
                    </div>
                </div>
                <div class="col-lg-3 d-flex justify-content-lg-end">
                    <div class="footer__top">
                        <h5>SHOP CATEGORY</h5>
                        <p><a href="#">Men</a></p>
                        <p><a href="#">Women</a></p>
                        <p><a href="#">Child</a></p>
                        <p><a href="#">Apparel</a></p>
                        <p><a href="#">Brows All</a></p>
                    </div>
                </div>
            </div>
        </div>
        `,
    });
    
    Vue.component('subscribe__reviews',{
        template:`
        <div>
            <div class="row subscribeBlock">
                <div class="col-md-6 subscribe__reviews">
                    <div class="reviews">
                        <div class="reviews__img">
                            <img src="img/icon_feedback.png" alt="">
                        </div>
                        <div class="reviews__text">
                            &laquo;Vestibulum quis porttitor dui! Quisque viverra nunc&nbsp;mi, a&nbsp;pulvinar purus condimentum&nbsp;a. Aliquam condimentum mattis neque sed pretium&raquo;
                            <div class="reviews__text__author">Bin Burhan</div>
                            <div class="reviews__text__address">Dhaka, Bd</div>
                            <div class="reviews__slider">
                                <div class="slider__form"></div>
                                <div class="slider__form"></div>
                                <div class="slider__form"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                    <div class="subscribe__email">
                        <div class="subscribe__title">SUBSCRIBE</div>
                        <div class="subscribe__text">FOR OUR NEWLETTER AND PROMOTION</div>
                        <form action="" class="input__block">
                            <input type="text" placeholder="Enter Your Email">
                            <button>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `,
    });
    
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
    
    Vue.component('cart-btn',{
        props: ['countproducts','cart','total'],
        template:`
        <div>
            <button type="button" class="btn btn-primary dropdown-toggle basket__btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="basket__ico">
                    <img src="img/basket.png" alt="Basket" class="basket__img">
                    <span class="badge badge-pill badge-light countProducts">{{ countproducts }}</span>
                </div>
                Cart
            </button>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left" @click.stop>
                <div class="dropdown-item">
                    <cart class="cart" @ondel="handleDelClick" @ongotocart="goToCart" :cart="cart" :total="total"></cart>
                </div>
            </div>
        </div>
        `,
        methods: {
            handleDelClick(item) {
                this.$emit('ondel', item);
            },
            goToCart() {
                this.$emit('ongotocart');
                console.log(2);
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
        props: ['item','carthtml'],
        template:`
        <tr>
            <th class="bodyCart__img"><img :class="{bigImgProdCart: carthtml, smallImgProdCart: !carthtml}" :src="item.src" :alt="item.title"></th>
            <th class="bodyCart__title">{{ item.title.toUpperCase() }}</th>
            <th class="bodyCart__price">&#36;{{ item.price }}</th>
            <th class="bodyCart__quantity">{{ item.quantity }} pc.</th>
            <th :class="{'bodyCart__del': !carthtml}">
                <a href="#" :class="{delProdCart: carthtml}" @click.prevent="handleDelClick(item)">X</a>
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
        props: ['cart','total','carthtml'],
        template:`
        <div>
            <table cellspacing="0" class="cartProduct" v-if="cart.length">
                <cart-item class="bodyCart" @ondel="handleDelClick" v-for="item in cart" :item="item" :carthtml="carthtml"></cart-item>
            </table>
            <div class="bodyCart__footer" v-if="cart.length && !carthtml">
                <div class="totalCart">Total: <span>&#36;{{ total }}</span></div>
                <a href="#" class="btn btn-primary goToCart" @click.prevent="goToCart">go to cart</a>
            </div>
            <h3 v-if="!cart.length">Корзина пуста</h3>
            <div class="btnCart" v-if="carthtml">
                <button type="button" class="btn btn-primary" v-if="cart.length" @click="handleDelAllCartClick">Clear shopping cart</button>
                <a href="#" class="btn btn-primary" @click.prevent="goToProducts">Continue shopping</a>
            </div>
            <div class="grandTotal" v-if="cart.length && carthtml">
                Grand total &#8195;<span>&#36;{{ total }}</span>
            </div>
        </div>
        `,
        methods: {
            handleDelClick(item) {
                this.$emit('ondel', item);
            },
            handleDelAllCartClick() {
                this.$emit('ondelall');
            },
            goToCart() {
                this.$emit('ongotocart');
                console.log(1);
            },
            goToProducts() {
                this.$emit('ongotoprod');
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
            idUser: '',
            signIn: true,
            pageHtml: 'products',
            login: '',
            passwd1: '',
            passwd2: '',
            email: '',
            name: '',
            warning: '',
        },
        mounted() {
            if (localStorage.getItem('idUser') !== null) {
                this.idUser = localStorage.getItem('idUser');
                this.name = localStorage.getItem('name');
            }
            
            if (!this.idUser.length) {
                if (localStorage.getItem('Cart') !== null) {
                    this.cart = JSON.parse(localStorage.getItem('Cart'));
                    this.total = this.grandTotal;
                }
                this.display = 'block';
                
            } else {
                ProdApi.fetch(`cart/${this.idUser}`)
                    .then((result) => {
                        this.cart = result.items;
                        this.total = result.total;
                        this.display = 'block';
                    });
            }

        },
        computed: {
            countProducts() {
                return this.cart.reduce((acc, item) => acc + item.quantity, 0);
            },
            grandTotal() {
                return this.cart.reduce((acc, item) => acc + item.quantity * item.price, 0);    
            },
        },
        methods: {
            goToCart() {
                this.pageHtml = 'cart';  
            },
            goToProducts() {
                this.pageHtml = 'products';
                window.scrollTo(0, 0);
            },
            linkSignIn() {
                this.warning = '';
                this.signIn = true;
            },
            linkReg() {
                this.warning = '';
                this.signIn = false;
            },
            logOut() {
                this.idUser = '';
                this.name = '';
                localStorage.setItem("idUser", this.idUser);
                localStorage.setItem("name", this.name);
                if (localStorage.getItem('Cart') !== null) {
                    this.cart = JSON.parse(localStorage.getItem('Cart'));
                    this.total = this.grandTotal;
                } else {
                    this.cart = [];
                    this.total = 0;
                }
            },
            handleSignIn() {
                this.warning = '';
                
                ProdApi.create('users', {login: this.login, passwd: this.passwd1})
                    .then((result) => {
                        this.idUser = result.id;
                        this.name = result.name;
                        this.login = '';
                        this.passwd1 = '';
                        localStorage.setItem("idUser", this.idUser);
                        localStorage.setItem("name", this.name);
                        $(".modal").modal("hide");
                        ProdApi.fetch(`cart/${this.idUser}`)
                            .then((result) => {
                                this.cart = result.items;
                                this.total = result.total;
                            });
                    })
                .catch(() => {
                    this.login = '';
                    this.passwd1 = '';
                    this.warning = 'Wrong login or password!';
                });
            },
            handleRegIn() {
                this.warning = '';
                if (!this.login.length || !this.passwd1.length || !this.passwd2.length || !this.email.length || !this.name.length) return this.warning = 'Fill in all the fields!';
                if (this.passwd1 !== this.passwd2) return this.warning = 'Passwords do not match!';
                if (!/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i.test(this.email)) return this.warning = 'Not valid email!';
            
                ProdApi.create('users', {login: this.login, passwd: this.passwd1, name: this.name, email: this.email})
                    .then((result) => {
                        this.idUser = result.id;
                        this.name = result.name;
                        this.login = '';
                        this.passwd1 = '';
                        this.passwd2 = '';
                        this.email = '';
                        localStorage.setItem("idUser", this.idUser);
                        localStorage.setItem("name", this.name);
                        $(".modal").modal("hide");
                    });
            },
            handleSearch(query) {
                this.searchQuery = query;
            },
            handleBuyClick(item) {
                const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);                
                if(cartItem) {
                    if (!this.idUser.length) {
                        
                        const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                        Vue.set(this.cart, itemIdx, {...item, quantity: cartItem.quantity + 1});
                        this.total = this.grandTotal;
                        const localCart = JSON.stringify(this.cart);
                        localStorage.setItem("Cart", localCart);
                        
                    } else {
                        ProdApi.change(`cart/${item.id}&${this.idUser}`, {quantity: cartItem.quantity + 1})    
                            .then((result) => {
                                const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                                Vue.set(this.cart, itemIdx, result.item);
                                this.total = result.total;
                            });
                    }
                } else {
                    if (!this.idUser.length) {
                        
                        this.cart.push({...item, quantity: 1});
                        this.total = this.grandTotal;
                        const localCart = JSON.stringify(this.cart);
                        localStorage.setItem("Cart", localCart);
                        
                    } else {
                        ProdApi.create('cart', {...item, quantity: 1, iduser: this.idUser})
                        .then((result) => {
                            this.cart.push(result.item);
                            this.total = result.total;
                        });
                    }
                }
            },
            handleDelClick(item) {
                if(item.quantity > 1) {
                    if (!this.idUser.length) {
                        
                        const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                        Vue.set(this.cart, itemIdx, {...item, quantity: item.quantity - 1});
                        this.total = this.grandTotal;
                        const localCart = JSON.stringify(this.cart);
                        localStorage.setItem("Cart", localCart);
                        
                    } else {
                        ProdApi.change(`cart/${item.id}&${this.idUser}`, {quantity: item.quantity - 1})
                            .then((result) => {
                                const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                                Vue.set(this.cart, itemIdx, result.item);
                                this.total = result.total;
                            });
                    }
                } else {
                    if (!this.idUser.length) {
                        
                        const itemIdx = this.cart.findIndex((cartItem) => cartItem.id === item.id);
                        this.cart.splice(itemIdx, 1);
                        this.total = this.grandTotal;
                        const localCart = JSON.stringify(this.cart);
                        localStorage.setItem("Cart", localCart);
                        
                    } else {
                        ProdApi.delete(`cart/${item.id}&${this.idUser}`)
                            .then((result) => {
                                const itemIdx = this.cart.findIndex((cartItem) => cartItem.id === item.id);
                                this.cart.splice(itemIdx, 1);
                                this.total = result.total;
                            });
                    }
                }
            },
            handleDelAllCartClick() {
                if (!this.idUser.length) {
                    this.cart = [];
                    this.total = 0;
                    localStorage.clear();
                    window.scrollTo(0, 0);
                } else {
                    ProdApi.deleteAll('Cart')
                        .then((result) => {
                            this.cart = result.item;
                            this.total = result.total;
                            window.scrollTo(0, 0)
                        });
                }
            },
        }
    });    
}
