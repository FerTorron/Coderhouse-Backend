class ProductManager {
    constructor() {
        this.products = []
        this.id = 0
    }

    generateId() {
        this.id += 1
        return this.id
    }

    getProducts = () => {
        console.log("------ LISTA DE PRODUCTOS ------")
        return this.products
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Debe completar todos los Datos para Generar un nuevo Producto")
            return
        }

        const codeExists = this.products.some(product => product.code === code)
        if (codeExists) {
            console.log("El Código del Producto ya existe. Debe ser único para cada Producto")
            return
        }

        const product = {
            id: this.generateId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        console.log(product)
        this.products.push(product)

    }

    getProductById = (id) => {
        const productFind = this.products.find(product => product.id === id)
        if (productFind) {
            console.log(productFind)
            return
        } else {
            console.log(`El producto con el ID: ${id} no ha sido encontrado`)
        }
    }

}

const productManager = new ProductManager()
console.log(productManager.getProducts())
productManager.addProduct("Producto Prueba", "Este es un producto prueba", 200, "Sin imagen", "ABC123", 25)
console.log(productManager.getProducts())
productManager.addProduct("Producto Prueba 2", "Este es un producto prueba", 2100, "Sin imagen", "ABC123", 50)
productManager.getProductById(1)
productManager.getProductById(5)