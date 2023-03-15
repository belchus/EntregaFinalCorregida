
import { DAOcarritos } from '../DAO/index.js'
import { DAOproductos } from '../DAO/index.js'
const { Router: router } = require('express')
//const apiCarts = require('../api/carts.js')

const routeCarts = new router()

//const carts = new apiCarts('carts.txt')

routeCarts.get('/:id/productos', async (req, res) => {
    try {
        const cart = await DAOcarritos.getById(parseInt(req.params.id))
        res.json(cart)
    } catch (error) {
        res.status(500).json({ error: 'Sólo administradores' });
    }
})

routeCarts.post('/', async (req, res) => {
    try {
        const newCart = await DAOcarritos.saveCart()
        res.json(newCart)
    } catch (error) {
        res.status(500).json({ error: 'Sólo administradores' });
    }
})
routeCarts.post('/:id_cart/productos/:id_prod', async (req, res) => {
    try {
        const product = await DAOproductos.getById(req.params.id_prod)
        const addProduct = await DAOcarritos.addProductById(req.params.id_cart, product)
        res.json(addProduct)
    } catch (error) {
        res.status(500).json({ error: 'Sólo administradores' });
    }
})


routeCarts.delete('/:id_cart/productos/:id_prod', async (req, res) => {
    try {
        const product = await DAOproductos.getById(req.params.id_prod)
        const productToDelete  = await DAOcarritos.deleteProductById(req.params.id_cart, product)
        res.json(productToDelete)
    } catch (error) {
        res.status(500).json({ error: 'Sólo administradores' });
    }
})

routeCarts.delete('/:id', async (req, res) => {
    try {
        const deletedCart = await DAOcarritos.deleteById(req.params.id)
        res.json(deletedCart)
    } catch (error) {
        res.status(500).json({ error: 'Sólo administradores' });
    }
})

routeCarts.delete('/carritos', async (req, res) => {
    try {
        const allCarts = await DAOcarritos.getById('1') || { productos: [] }
        res.render('./content/carts',
            {
                allCarts: allCarts,
                cartsQty: allCarts.length
            }
        )
    } catch (error) {
        res.status(500).json({ error: 'Sólo administradores' });
    }
})


module.exports = routeCarts