window.onload = () => {
    const app = new Vue({
        el: '#app',
        data: {
            items: [],
            search: '',
            searchQuery: '',
            cart: [],
        },
        methods: {
            filterItems() {
                this.searchQuery = this.search;
            },
            clearFilter() {
                this.search = '';
                this.searchQuery = '';
            },
            buy(item) {
                var itemProd = Object.assign({}, item);
                if(this.cart.findIndex(x => x.title === itemProd.title) === -1) {
                    itemProd.quantity = 1;
                    this.cart.push(itemProd);
                } else {
                    ++this.cart.find(x => x.id === itemProd.id).quantity;
                }
            }
        },
        mounted() {
            fetch('http://localhost:3000/products')
                .then((response) => response.json())
                .then((items) => {
                    this.items = items;
                });       
        },
        computed: {
            renderItems() {
                const regexp = new RegExp(this.searchQuery, 'i');
                return this.items.filter((item) => regexp.test(item.title));
            },
            isFilter() {
                return this.searchQuery !== '';
            },
            renderCart() {
                return this.cart;
            },
            isVisibleCart() {
                return this.cart.length !== 0;
            },
            totalCart() {
                return this.cart.reduce((sum, item) => sum + item.price*item.quantity, 0);
            }
        }
    });
}