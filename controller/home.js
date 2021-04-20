const express = require('express')
const path = require('path');

const home = async (req, res) => {
	res.render('home');
	//res.render('layouts/main');
	//res.sendFile('public/home.html', {root: path.dirname(__dirname)});
}

const about = async (req,res)=>{
	res.render('extra')
}
module.exports = {home, about};