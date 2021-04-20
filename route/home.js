const express = require('express')
const router = express.Router()

//Se importan las funciones de controller
const {home, about} = require('../controller/home');

router.get('/',home);

router.get('/about', about)

module.exports = router;
