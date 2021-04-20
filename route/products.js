const express = require('express')
const router = express.Router()

const {isAuthenticated} = require('../controller/autenticar');

const {products,agregar,nuevo, editar, guardarCambio, borrar, todo, busqueda, chat} = require('../controller/products');

router.get('/products/agregar', isAuthenticated , agregar);

router.post('/products/nuevo', isAuthenticated, nuevo);

router.get('/products/editar/:id', isAuthenticated, editar);

router.post('/products/editar-g/:id', isAuthenticated, guardarCambio);

router.post('/products/borrar/:id', isAuthenticated, borrar);

router.get('/products/todo', isAuthenticated, todo);

router.post('/products/busqueda',isAuthenticated, busqueda);

router.get('/products/chat/:id', isAuthenticated, chat)

router.post('/products/chat/:id', isAuthenticated, chat)

router.get('/products', isAuthenticated, products);

module.exports = router;
