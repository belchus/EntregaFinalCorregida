const express = require('express')

const app = express()

const apiProducts = require('./api/app.js')
const routeProducts = require('./router/productsRouter.js')
const cartsRouter = require('./router/cartsRouter.js')
const PORT = 8080
const products = new apiProducts('productos.txt')

const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor, ${error}`))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views');
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use('/api/productos', routeProducts)
app.use('/api/carrito', cartsRouter)

app.use((req, res) => {
    res.status(404).json({
        error: -1,
        descripcion: `ruta '${req.path}' método '${req.method}' no implementada`
    })
})

routeProducts.get('/', async (req, res) => {
    const productsList = await products.getAll()
    res.render('index.ejs', {
        misProd: productsList,
        productos: productsList.length
    })
})


routeProducts.get('/:id', async (req, res) =>{
    if (req.params.id === 'arrayproductos') {
        const allProducts = await products.getAll()
        res.json(allProducts)
    } else {
    const productById = [await products.getById(parseInt(req.params.id))]
    productById[0] === null
        ? res.json({ Error:  'Producto no encontrado' })
        : res.json(productById)
    }
})