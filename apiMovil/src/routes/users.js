'use strict'

const router = require('express').Router()

//const User = mongoose.model('users');

const mongoose = require('mongoose')
//const conn = mongoose.createConnection('mongodb://adminMovil08642:9753124680Root@ds227352.mlab.com:27352/db_salud');
const mongojs = require('mongojs')
const db = mongojs('mongodb://adminMovil08642:9753124680Root@ds227352.mlab.com:27352/db_salud')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const auth =require('../controller/auth')

router.get('/user',auth.isAuth, (req,res, next) =>{
	User.find({}, function (err, docs) {
		if (err) { res.status(500).json({ message : 'Error en el servidor' }) }

		if(docs){ res.status(200).json(docs) }
	})
})

router.get('/user/medic', auth.isAuth, (req, res, next) =>{
		User.find({role: "MEDIC"}, function (err, docs) {
		if (err) { res.status(500).json({ message : 'Error en el servidor' }) }

		if(docs){ res.status(200).json(docs) }
	})
})

router.post('/login', (req , res,next)=>{
	console.log(`reqpas ${req.body.password} ema ${req.body.email}`)
	auth.signIn(req, res)
	//res.status(200).json({ message : 'tienes acceso' })	
})

router.get('/user/:id', auth.isAuth, (req,res,next)=>{

	User.findById(req.params.id, function (err, user) {
		if (err) { res.status(500).json({ message : 'error en el servidor' }) }
		
		if(user){ res.status(200).json(user) }
    })
})

//POST
router.post('/user', auth.isAuth, (req,res,next)=>{

	if(!req.body.name || !req.body.lastName || !req.body.phone || !req.body.email ||
		!req.body.password){
		res.status(400).json({
			error:'in user object', user:user
		});
	}else{
		var ps
		const Usert = new User();

		bcrypt.genSalt(10, (err, salt)=>{
			if(err) return next(err)

			return bcrypt.hash(req.body.password, salt, (err, hash)=>{
				if(err) return next(err)

				Usert.password = hash
			})
		})

		Usert.role = req.body.role
		Usert.name= req.body.name
		Usert.lastName = req.body.lastName
		Usert.phone = req.body.phone
		Usert.email = req.body.email
		Usert.doc = req.body.doc
		Usert.horarios = req.body.horarios
				
		setTimeout(r=>{
			Usert.save((err,users)=>{
				if(users) res.status(200).json({message : "guardado con exito"})
				 
				if(err){
					res.status(500).json( { message : 'error en el servidor mientras guardaba usuario' })
				}	
			})
		}, 2000)	
	}
})

router.delete('/user/:id', auth.isAuth, (req,res,next)=>{
	
	User.findById(req.params.id, function (err, user) {
		if (err) { return res.status(500).json({ message : 'error en el servidor' }) }
		
		if(user){
			user.remove(err=>{
				//return res.status(500).json({ message : `error en el servidor ${err}` })
			})
			return res.status(200).json({ message : "Eliminado" }) 
		}
		if(!err && !user) return res.status(400).json({ message : "no existe el usuario" })
    })
})

router.put('/user/:id', auth.isAuth, (req,res,next)=>{
	const user = req.body;

	if (user.password) {
		bcrypt.genSalt(10, (err, salt)=>{
			if(err) return next(err)

			return bcrypt.hash(user.password, salt, (err, hash)=>{
				if(err) return next(err)

				user.password = hash
			})
		})
	}

	setTimeout(time =>{
		User.findByIdAndUpdate(req.params.id,user, function(err, user){
			if(err){ return res.status(500).json({ message : `error mientras actualizaba: ${err}` }) }
			if(user){ return res.status(200).json({ message : 'usuario actualizado' }) }

			res.status(400).json({ message : "el usuario no existe" })
		})		
	}, 2000)
})

router.get('/example', (req, res, next)=>{
	res.status(200).json([{primerNombre : "prueba api", segundoNombre : "esta funcionando",
						direccion : "medellin", celular : 3243,
						apellido : "example", segundoAPellido : "perez", ID: 2, fechaNacimiento : "na",
						referenciaPersonal : "perez", telefonoReferenciaPersonal : 22 }])
})

router.post('/example', (req, res, next)=>{
		const Usert = new User();

		
		Usert.role = "user"
		Usert.name= "req.body.name"
		Usert.lastName = "req.body.lastName"
		Usert.phone = 234343
		Usert.email = "req.body.email"
		Usert.doc = "req.body.doc"
		Usert.password = "sasda"
				

		Usert.save((err,users)=>{
				if(users) res.status(200).json({message : "guardado con exito"})
				 
				if(err){
					res.status(500).json( { message : 'error en el servidor mientras guardaba usuario' })
				}	
			})
})

module.exports = router;
