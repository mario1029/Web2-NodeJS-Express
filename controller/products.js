const express = require('express')
const path = require('path');
const productSchema = require('../model/productSchema.js');


const agregar = async (req,res)=>{
	res.render('producto-nuevo');
}

const borrar = async (req, res)=>{
	await productSchema.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Producto eliminado');
	res.redirect('/products')
}

const products = async (req, res) => {
	await productSchema.find({usuario: req.user.id})
		.then(data =>{
			const info = {
				productData: data.map(inf =>{
					return {
						_id: inf._id,
						producto: inf.producto,
						cantidad: inf.cantidad,
						precio: inf.precio
					}
				})
			}
			res.render('products', {productData: info.productData})
		})	
}

const todo = async(req, res)=>{
	const allProducts = await productSchema.find({});
	res.render('producto-todo', {allProducts})
}

const busqueda = async(req, res)=>{
	await productSchema.find({producto: req.body.busqueda})
		.then(data =>{
			const info = {
				productData: data.map(inf =>{
					return {
						_id: inf._id,
						producto: inf.producto,
						cantidad: inf.cantidad,
						precio: inf.precio
					}
				})
			}
			res.render('producto-todo', {allProducts: info.productData})
		})	
}

const guardarCambio= async(req,res)=>{
	const {producto, cantidad, precio} = req.body;
	await productSchema.findByIdAndUpdate(req.params.id, {producto, cantidad, precio});
	req.flash('success_msg', 'Cambio guardado');
	res.redirect('/products');
}

const editar = async (req,res)=>{
	const productInfo =await  productSchema.findById(req.params.id)
	/*	.then(data =>{
				const info = {
					productData: data.map(inf =>{
						return {
							_id: inf._id,
							producto: inf.producto,
							cantidad: inf.cantidad,
							precio: inf.precio
						}
					})
				}
				res.render('producto-editar', {productData: info.productData})
			})*/
	//console.log(productInfo);
	//res.render('producto-editar', {productInfo})
	
	res.render('producto-editar',{
		_id: productInfo._id,
		producto: productInfo.producto,
		cantidad: productInfo.cantidad,
		precio: productInfo.precio
	})
}

const chat = async( req, res)=>{
	res.render('chat');
}

const nuevo = async (req,res)=>{
	const {producto, cantidad, precio} = req.body;
	const error = [];
	if(!producto){
		error.push({message: 'Nombre de producto vacio'})
	}
	if(!cantidad){
		error.push({message: 'Cantidad vacia'})
	}
	if (!precio) {
		error.push({message: 'Precio vacio'})	
	}

	if(error.length > 0){
		res.render('producto-nuevo', {
			error,
			producto,
			cantidad,
			precio
		})
	}else{
		const newProduct = new productSchema({producto, cantidad, precio});
		newProduct.usuario = req.user.id;
		await newProduct.save();
		req.flash('success_msg', 'Producto agregado correctamente')
		res.redirect('/products');
	}
	
}

module.exports = {products,agregar, nuevo, editar, guardarCambio, borrar, todo, busqueda, chat};