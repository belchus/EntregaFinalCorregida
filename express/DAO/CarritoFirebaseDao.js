
import firebase from "../contenedores/firebase.js"

class CarritoFirebaseDao extends firebase {

    constructor (){
        super('carritos')
    }

}

export default CarritoFirebaseDao