const Router = require('koa-router');
const ContenedorMongoDB = require('../contenedor/productos');
const productos = new ContenedorMongoDB;
const {iniciarMongo} = require('../daos/connectMongoDB')

iniciarMongo

const router = new Router({
    prefix: '/productos'
});

// Get All
router.get('/', ctx =>{
    ctx.body = {
        status: 'succes',
        productos: productos.getAll()
    }
});

// Get By ID
router.get('/:id', ctx =>{
    productos.getById()
});

//Agregar Producto
router.post('/', ctx=>{
    if (
        !ctx.request.body.name ||
        !ctx.request.body.price ||
        !ctx.request.body.img ||
        !ctx.request.body.stock
    ){
    ctx.response.status = 404
    ctx.body = {
        status: '¡Error!',
        message: `Falta llenar campos`
        }
    }else{
        const newProduct = productos.push({
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            img: ctx.request.body.img,
            stock: ctx.request.body.stock
        })
        ctx.response.status = 201
        ctx.body = {
            status: 'succes',
            message: `Nuevo producto, ${ctx.request.body.name} agrgado con id: ${ctx.request.body.id}`
        }
    }
});

router.put('/update/:id', ctx => {
    if (
        !ctx.request.body.name ||
        !ctx.request.body.price ||
        !ctx.request.body.img ||
        !ctx.request.body.stock
    ){
    ctx.response.status = 404
    ctx.body = {
        status: '¡Error!',
        message: `Falta llenar campos`
        }
    }else{
        const id = crx.params.id
        const index = productos.findIndex(producto => producto.id == id)
        productos.splice(index, 1, ctx.request.body)
        ctx.response.status = 201
        ctx.body = {
            status: 'succes',
            message: `Modificado el producto, ${ctx.request.body.name} con id: ${ctx.request.body.id}`
        }
    }
});

// Delete producto.
router.delete('delete/:id', ctx => {
    const id = crx.params.id
    const index = productos.findIndex(producto => producto.id == id)
    productos.splice(index, 1)
    ctx.response.status = 201
    ctx.body = {
        status: 'succes',
        message: `Producto: ${ctx.request.body.name} con id: ${ctx.request.body.id} ELIMINADO`
    }
});

module.exports = {router}