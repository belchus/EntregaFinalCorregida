import mongodb from "../contenedores/mongodb.js"

const cartSchema = 
    {
        productos: {type: Array, require: true},
        user: {type: String, required: true, max: 15},
    }

class CarritoMongoDao extends mongodb {

    constructor (){
        super('carritos', cartSchema)
    }

}

export default CarritoMongoDao