class Hamburger {
    constructor (size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
    }
    
    addTopping(topping) {
        return this.topping.push(topping);
    }

    removeTopping(topping) {
        return this.topping = this.topping.filter(t => t !== topping);
    }

    get getToppings() {
        return this.topping.join(' ');
    }
    
    get getSize() {
        return this.size;
    }
    
    get getStuffing() {
        return this.stuffing;
    }
    get calculatePrice() {
        const sumPrice = this.topping.map(t => Hamburger.toppings[t].price);
        sumPrice.push(Hamburger.sizes[this.size].price, Hamburger.fillings[this.stuffing].price);
        return sumPrice.reduce((sum, price) => sum + price, 0);
    }
    get calculateCalories() {
        const sumCalories = this.topping.map(t => Hamburger.toppings[t].calories);
        sumCalories.push(Hamburger.sizes[this.size].calories, Hamburger.fillings[this.stuffing].calories);
        return sumCalories.reduce((sum, calories) => sum + calories, 0);
    }
}
    
function init() {
    // Вид гамбургера
    Hamburger.small_size = 'маленький гамбургер';
    Hamburger.big_size = 'большой гамбургер';
    Hamburger.sizes = {
        [Hamburger.small_size]: {
            price: 50,
            calories: 20,
        },
        [Hamburger.big_size]: {
            price: 100,
            calories: 40, 
        },
    };
    //Вид начинки
    Hamburger.filling_cheese = 'с сыром';
    Hamburger.filling_salad = 'с салатом';
    Hamburger.filling_potatoes = 'с картофелем';
    Hamburger.fillings = {
        [Hamburger.filling_cheese]: {
            price: 10,
            calories: 20,
        },
        [Hamburger.filling_salad]: {
            price: 20,
            calories: 5, 
        },
        [Hamburger.filling_potatoes]: {
            price: 15,
            calories: 10, 
        },
    };
    //Вид дополнительной приправы
    Hamburger.topping_seasoning = ', посыпанный приправой';
    Hamburger.topping_mayonnaise = ', политый майонезом';
    Hamburger.toppings = {
        [Hamburger.topping_seasoning]: {
            price: 15,
            calories: 0,
        },
        [Hamburger.topping_mayonnaise]: {
            price: 20,
            calories: 5, 
        },
    };
    
    const burger1 = new Hamburger(Hamburger.small_size,Hamburger.filling_cheese);
    burger1.addTopping(Hamburger.topping_mayonnaise);
    console.log(`Бургер 1:\n${burger1.getSize} ${burger1.getStuffing}${burger1.getToppings}\nЦена: ${burger1.calculatePrice}\nКалории: ${burger1.calculateCalories}`);
    console.log('Затем посыпали приправой сверху');
    burger1.addTopping(Hamburger.topping_seasoning);
    console.log(`Бургер 1:\n${burger1.getSize} ${burger1.getStuffing}${burger1.getToppings}\nЦена: ${burger1.calculatePrice}\nКалории: ${burger1.calculateCalories}`);
    
    const burger2 = new Hamburger(Hamburger.big_size,Hamburger.filling_potatoes);
    burger2.addTopping(Hamburger.topping_mayonnaise);
    console.log(`Бургер 2:\n${burger2.getSize} ${burger2.getStuffing}${burger2.getToppings}\nЦена: ${burger2.calculatePrice}\nКалории: ${burger2.calculateCalories}`);
    console.log('Затем убрали майонез');
    burger2.removeTopping(Hamburger.topping_mayonnaise);
    console.log(`Бургер 2:\n${burger2.getSize} ${burger2.getStuffing}${burger2.getToppings}\nЦена: ${burger2.calculatePrice}\nКалории: ${burger2.calculateCalories}`);
    
}
    
window.addEventListener('load', init);