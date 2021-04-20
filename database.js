const mongoose = require('mongoose');

//mongodb://localhost/mercado
mongoose.connect('mongodb+srv://web2-nodejs:UirYSAewpBX3QSYm@cluster0.abbu3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
	.then(db => console.log('Base de datos conectada'))
	.catch(er => console.log(er));