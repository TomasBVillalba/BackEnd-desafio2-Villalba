import {promises as fs} from "fs"

class ProductManager {
    constructor(){
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)



        await fs.writeFile(this.patch, JSON.stringify(this.products))
    };


    readProducts = async() => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find((product) => product.id === id)){
            console.log("producto no encontrado")
        }else {
            console.log(respuesta3.find((product) => product.id === id))
        }

    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("producto eliminado")
    };

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        
        let productsModified = [
            {id, ...producto}, ...productOld]
            await fs.writeFile(this.patch, JSON.stringify(productsModified))
    }


}

const productos = new ProductManager();

productos.addProduct("title1", "description1", 2000, "thumbnail1", "abc123", 5)
productos.addProduct("title2", "description2", 5000, "thumbnail2", "abc124", 10)
productos.addProduct("title3", "description3", 8000, "thumbnail3", "abc125", 25)


// obtener todos los productos
productos.getProducts()


// producto no encontrado
productos.getProductsById(4)


// producto eliminado
productos.deleteProductsById(2)


// actualizar productos
productos.updateProducts({
    id: 3,
    title: "title3",
    description: 'description3',
    price: 3200,
    thumbnail: 'thumbnail3',
    code: 'abc125',
    stock: 25
}
)