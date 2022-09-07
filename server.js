const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const { PORT } = require ('./src/config/globals');
let productos = require('./src/routes/productos')

app.use(koaBody());

app.use(productos.router());

app.use(async ctx => {
    ctx.body = 'Usando KOA';
});

const server = app.listen(PORT, ()=>{
    console.log(`Servidor abierto en http://localhost:${PORT}`);
});
server.on('error', error => console.log('Error en el servidor KOA:', error));