const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('../model/userSchema.js');

passport.use(new LocalStrategy({usernameField: 'correo', passwordField: 'clave'},  async (correo, clave, done)=>{
	
	const usuario = await userSchema.findOne({correo: correo});
	
	if(!usuario){
		//console.log('No existe el usuario ', correo)
		return done(null, false, {message: 'usuario no existe'});
	} else {
		const verificado = await usuario.comparar(clave);
		if(verificado){
			return done(null, usuario, {message:'usuario encontrado y verificado'})
		}else{
			return done(null, false, {message:'clave incorrecta'});
		}
	}
	
}))

passport.serializeUser((usuario, done)=>{
	done(null, usuario.id);
})

passport.deserializeUser((id, done)=>{
	userSchema.findById(id, (err, usuario)=>{
		done(err, usuario)
	})	
});