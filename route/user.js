const express = require('express')
const router = express.Router()
const passport = require('passport');

const {isAuthenticated} = require('../controller/autenticar');

const {user,registro,login, guardarRegistro, logout, perfil, cambioPerfil,borrarPerfil} = require('../controller/user');

router.get('/user/registro', registro)

router.post('/user/registro-g', guardarRegistro)

router.post('/user/inicio-sesion-a', passport.authenticate('local', {
		successRedirect: '/products',
		failureRedirect: '/user/inicio-sesion',
		failureFlash: true 
	}))

router.get('/user/perfil/:id', isAuthenticated, perfil);

router.post('/user/perfil-cambio/:id',isAuthenticated, cambioPerfil);

router.post('/user/perfil-borrar/:id',isAuthenticated, borrarPerfil)

router.get('/user/inicio-sesion', login);

router.get('/user/cerrar-sesion', logout)


router.get('/user', user);


module.exports = router;
