/*AppWeb-NodeJS-MercadoLibre-MarioGonzalez*/
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const expresshbs = require('express-handlebars')
const methodover = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const Handlebars = require('handlebars');
const SocktIO = require('socket.io');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
//Iniciando variables

const app = express();

const homeRoute = require('./route/home') ;
const productsRoute = require('./route/products') ;
const userRoute = require('./route/user') ;



require('./database');
require('./config/passport');
//Configuracion
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'public/views'));
app.engine('.hbs', expresshbs({
	defaultLayout: 'main' ,
	layoutsDir: path.join(app.get('views'), 'layouts') ,
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine','.hbs');
 
//Middleweres
app.use(express.urlencoded({extended: false}))
app.use(methodover('__method'))
app.use(session({
	secret: 'clavemaestra',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");                                        
    res.header('Access-Control-Allow-Methods', "POST, GET, PUT, DELETE, OPTIONS");     
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");    
    res.header("Access-Control-Allow-Credentials", true);              
    next();        
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//varible global
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	//console.log(res.locals.user)
	next();
});

//Routes 
app.use(homeRoute);
app.use(productsRoute);
app.use(userRoute);

app.use((req, res) => {
  res.status(404).send({'message': 'Error 404'});
});

const servidor = app.listen(app.get('port'), ()=>{
	console.log('Server on port:', app.get('port'));
})

//Socket
const io = SocktIO(servidor)
io.on('connection', (socket)=>{
	console.log('Conexion Socket de', socket.id);
	
	socket.on('comentario', (data)=>{
		console.log(data);
		io.sockets.emit('mesajeGlobal', data);
	})
})