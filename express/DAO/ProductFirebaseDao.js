
import firebase from "../contenedores/firebase.js"


class ProductFirebaseDao extends firebase {

  async addProductById (id, data) {
    try {
        const cartToUpdate = await this.getById(id)
        const arrayProducts = [...cartToUpdate.productos, data]
        const doc = this.query.doc(`${id}`)
        await doc.update({ productos: arrayProducts })
        const updatedCart = await this.getById(id)
        return updatedCart
    } catch (error) {
        console.log(`Error en la base de datos, ${error}`)
    }
}

async deleteProductById (id, data) {
    try {
        const cartToUpdate = await this.getById(id)
        const productToDelete = cartToUpdate.productos.findIndex(product => product.product === data.product)
        cartToUpdate.productos.splice(productToDelete, 1)
        const doc = this.query.doc(`${id}`)
        await doc.set(cartToUpdate)
        const updatedCart = await this.getById(id)
        return updatedCart
    } catch (error) {
        console.log(`Error en la base de datos, ${error}`)
    }
}
}


export default ProductFirebaseDao