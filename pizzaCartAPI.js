document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function () {
        return {
            init() {
                axios
                    .get(`https://pizza-cart-api.herokuapp.com/api/pizzas`)
                    .then((result) => {
                        this.pizzas = result.data.pizzas;
                    })
                    .then(() => {
                        return this.createCart();
                    })
                    .then((result) => {
                        //console.log(result)
                        this.cartId = result.data.cart_code;
                    })
                    .then(() => {
                        for (let i = 0; i < this.pizzas.length; i++) {
                            var pizzaList = this.pizzas[i];
                            var id = pizzaList.id;
                            var type = pizzaList.type;
                            var size = pizzaList.size;
                            var flavour = pizzaList.flavour;
                            var price = pizzaList.size;
                            if (type == 'meaty') {
                                this.meaty.push(pizzaList);
                            }
                        }
                        // console.log(this.meaty)
                        return this.meaty;
                    })
                    .then(() => {
                        for (let i = 0; i < this.pizzas.length; i++) {
                            var pizzaList = this.pizzas[i];
                            var id = pizzaList.id;
                            var type = pizzaList.type;
                            var size = pizzaList.size;
                            var flavour = pizzaList.flavour;
                            var price = pizzaList.size;
                            if (type == 'chicken') {
                                this.chicken.push(pizzaList);
                            }
                        }
                        //console.log(this.chicken)
                        return this.chicken;
                    })
                    .then(() => {
                        for (let i = 0; i < this.pizzas.length; i++) {
                            var pizzaList = this.pizzas[i];
                            var id = pizzaList.id;
                            var type = pizzaList.type;
                            var size = pizzaList.size;
                            var flavour = pizzaList.flavour;
                            var price = pizzaList.size;
                            if (type == 'veggie') {
                                this.veggie.push(pizzaList);
                            }
                        }
                        //console.log(this.veggie)
                        return this.veggie;
                    });
            },
            createCart() {
                return axios
                    .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username);
            },
            displayCart() {
                //console.log((this.cartId))
                axios
                    .get(`https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`)
                    .then((result) => {
                        //console.log(result.data)
                        this.cart = result.data;
                    });
            },
            pizzas: [],
            featured:[],
            meaty: [],
            chicken: [],
            veggie: [],
            username: '',
            cartId: '',
            cart: {},
            paymentAmount:null,
            paymentMessage:'',
            showCart:false,
            showCheckout:true,
            showMessage:false,
            featured(){
                axios
                    .get('https://pizza-cart-api.herokuapp.com/api/pizzas/featured')
                    .then((result) =>{
                        this.featured = result.data.pizzas;
                    })
                    .then(()=>{
                        Object.assign({}, this.featured);
                    })
            },
            add(pizza) {
                //console.log(pizza)
                const params = {
                    cart_code: this.cartId,
                    pizza_id: pizza.id
                }
                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
                    .then(() => {
                        this.displayCart();
                    })
                    .catch(err => alert(err));
                //console.log(params)
                //console.log(this.cart)
            },
            remove(pizza) {
                //console.log(this.cartId)
                const params = {
                    cart_code: this.cartId,
                    pizza_id: pizza.id
                }
                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove',params)
                    .then(() => {
                        this.displayCart();
                    })
                    .catch(err => alert(err));
                //console.log(params)
            },
            pay(amount) {
                const params = {
                    cart_code: this.cartId,
                }
                amount = this.paymentAmount;
                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/pay', params)
                    .then(() =>{
                        if(!this.paymentAmount){
                            this.paymentMessage = 'no amount entered';
                        }
                        else if(this.paymentAmount >= (this.cart.total)){
                            this.paymentMessage = 'Enjoy  your pizzas';
                        }
                        else{
                            this.paymentMessage = 'Sorry that is not enough money'
                        }
                    })
                    .then(() => {
                        this.displayCart();
                    })
                    .catch(err => alert(err));
                //console.log(amount)
            },
        }
    })
})