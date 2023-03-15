import ProductMongoDao from './ProductMongoDao.js'
import CarritoMongoDao from './CarritoMongoDao.js'
import ProductFirebaseDao from './ProductFirebaseDao.js'
import CarritoFirebaseDao from './CarritoFirebaseDao.js'


let DAOproductos = null
let DAOcarritos = null
const persistenceMethod = 'firebase'

switch (persistenceMethod) {
    case 'mongoDB':
        DAOproductos = new ProductMongoDao()
        DAOcarritos = new CarritoMongoDao()
        break
    case 'firebase':
        DAOproductos = new ProductFirebaseDao()
        DAOcarritos = new CarritoFirebaseDao()
        break
}

export { DAOproductos, DAOcarritos }