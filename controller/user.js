const express = require('express')
const path = require('path');
const userSchema = require('../model/userSchema.js');
const passport = require('passport');
const productSchema = require('../model/productSchema.js');


const user = async (req, res) => {
	
	res.render('layouts/main');
	//res.sendFile('public/home.html', {root: path.dirname(__dirname)});
}

const perfil = async (req, res)=>{
	const userInfo = await  userSchema.findById(req.params.id)
	res.render('perfil',{
		id: userInfo._id,
		nombre: userInfo.nombre,
		correo: userInfo.correo,
		telefono: userInfo.telefono
	})
}

const cambioPerfil = async(req, res)=>{
	const {nombre, correo, telefono} = req.body;
	await userSchema.findByIdAndUpdate(req.params.id, {nombre, correo, telefono});
	req.flash('success_msg', 'Cambio guardado');
	res.redirect('/user/perfil/'+req.params.id);

}

const borrarPerfil = async(req, res)=>{
	const userInfo = await  userSchema.findById(req.params.id)
	await productSchema.deleteMany({usuario: userInfo.nombre});
	await userSchema.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Perfil Borrado');
	res.render('registro');
}

//Sing in = registro
const registro = async(req, res)=>{
	res.render('registro');
}

const guardarRegistro = async(req, res)=>{
	const {nombre, correo, telefono, clave} =req.body;
	const error = [];
	
	if(nombre.length <= 0){
		error.push({message:'No ingreso un nombre'});
	}
	if(correo.length <= 0){
		error.push({message:'Correo vacio'});
	}
	if(telefono.length <= 0){
		error.push({message:'Telefono vacio'});
	}
	if(clave.length <= 0){
		error.push({message:'La clave no puede estar vacia...'});
	}
	
	if (error.length > 0) {
		res.render('registro', {error, nombre, correo, telefono, clave})
	}else{
		const correoRepetido = await userSchema.findOne({correo: correo});
		if(correoRepetido){
			res.send('Usuario ya existe');
		}
		const usuario = new userSchema({nombre, correo, telefono, clave});
		usuario.clave = await usuario.encryptPass(clave);
		await usuario.save();
		res.redirect('/user/inicio-sesion');
	}

	
	
}

//Sign up = login

const login = async(req, res)=>{
	res.render('login');
}

const logout = async(req, res)=>{
	req.logout();
	res.redirect('/')
}

module.exports = {user,registro, login, guardarRegistro, logout, perfil, cambioPerfil,borrarPerfil};