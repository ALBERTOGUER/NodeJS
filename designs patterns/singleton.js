class Logger {
    constructor() {
        this.logs = []
    }

    get count() {
        return this.logs.length
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp })
        console.log(`${timestamp} - ${message}`)

    }
}

// helps to just export one instance module.exports = new Logger()
//singletone can be deleted
class Singletone {
    constructor() {
        if (!Singletone.instance) {
            Singletone.instance = new Logger();
        }
    }
    getInstance() {
        return Singletone.instance
    }
}

let logger = new Singletone().getInstance()

class Customer {
    constructor(name, funds = 0) {
        this.name = name
        this.funds = funds
        logger.log(`New customer: ${name} has ${funds} in their account`)
    }
}

class Product {
    constructor(name, inventory = []) {
        this.name = name
        this.inventory = inventory
        logger.log(`New Product: ${name} has ${inventory.length} items in stock`)
    }
}

logger.log("starts app")
let customer = new Customer("Beto", 600)
let product = new Product("some books", [
    {
        item: "book1",
        qty: 5,
        price: 200
    },
    {
        item: "book2",
        qty: 5,
        price: 600
    },
])
logger.log("ends app")

console.log(`${logger.count} total logs`)
