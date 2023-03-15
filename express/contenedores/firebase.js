import { createRequire } from 'node:module';
const require = createRequire(import.meta.url)
const serviceAccount = require('../entrega-f78cc-firebase-adminsdk-5snsa-3d7f884efd.json')
const admin = require("firebase-admin")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
console.log('Base de datos conectada')
const db = admin.firestore()

class Firebase {

    constructor (collection) {
        this.query = db.collection(collection)
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            const data = docs.map(doc => ({id: doc.id, ...doc.data()}))
            return data
        } catch (error) {
            console.log('Error en la base de datos', error)
        }
    }

   
    async getById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            const item = await doc.get()
            const data = { _id: id, ...item.data() }
            return data
        } catch (error) {
            console.log('El producto no existe', error)
        }
    }

    async deleteById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            await doc.delete()
        } catch (error) {
            console.log('Error/contenedor/firebase/deleteById', error)
            throw new Error(error)
        }
    }

    async saveProduct (product) {
        try {
            const doc = this.query.doc()
            await doc.create(product)
        } catch (error) {
            console.log(`Error en la base de datos, ${error}`)
        }
    }

    async updateById(id, data) {
        try {
            const doc = this.query.doc(`${id}`)
            await doc.update(data)
        } catch (error) {
            console.log('Error al actualizar ', error)
        }
    }

    async saveCart () {
        try {
            const newCart = {
                productos: []
            }
            const doc = this.query.doc()
            await doc.create(newCart)
        } catch (error) {
            console.log(`Error en la base de datos, ${error}`)
        }
    }


}

export default Firebase