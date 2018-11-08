const jwt = require('jwt-simple')
const moment = require('moment')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Promise = require('es6-promise').Promise;
const mongojs = require('mongojs')
const db = mongojs('mongodb://adminMovil08642:9753124680Root@ds227352.mlab.com:27352/db_salud')
const SECRET_KEY = '1983m8Bs97as8'


function createToken(user){
	const payload = {
		sub : user._id,
		iat : moment().unix(),
		exp : moment().add(1, 'days').unix(),
	}

	return jwt.encode(payload, SECRET_KEY)
}

function decodeToken(token){
	return new Promise((resolve, reject)=>{
		try {
			const payload = jwt.decode(token, SECRET_KEY) 

			if (	payload.exp <= moment().unix()) {
				reject({
					status : 401,
					message : 'el token ha expirado'
				})
			}

			console.log('decode pay '+ payload.sub)
			resolve(payload.sub)

		} catch(err) {
			reject({
				status : 500,
				message : 'invalid token'
			})

		}
	})
}


function signIn(req, res){
	
	db.users.findOne({ email : req.body.email }, (err,user)=>{
		
		if(err) return res.status(500).json({ error : err })
		if(!user) return res.status(404).json({ message: 'no existe el usuario' })

		console.log(`s ${user} na ${user.name}`)
		bcrypt.compare(req.body.password, user.password).then(function(resp) {
       		if (resp) {
       			console.log(`id DB: ${user._id}`)
       			return res.status(200).json({ 
       				message : 'Logueado correctamente',
       				token : createToken(user),
       				ok: true,
       				user:{
       					_id: user._id,
       					name: user.name, 
       					lastName: user.lastName,
       					phone: user.phone,
       					email: user.email,
					role: user.role,
       				}
       			})
       		}

       		res.status(400).json({ message : 'incorrecto', ok: false })
		})
	});

}

function isAuth(req, res, next){
	if (!req.headers.authorization) {
		return res.status(403).json({ message : 'no tiene permiso' })
	}

	const token = req.headers.authorization.split(' ')[1]
	
	decodeToken(token)
		.then(resp =>{
			req.user = resp
			next()	
		})
		.catch(resp =>{
			res.status(resp.status).json(resp.message)
		})
}		


module.exports = {
	signIn,
	isAuth
}
