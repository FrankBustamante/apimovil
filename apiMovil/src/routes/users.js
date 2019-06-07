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
// const Creit = reqire('../models/credit')

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

router.get('/example/client', (req, res, next)=>{
	if(true){
		
		res.status(200).json([{email:"frankbustab@gmail.com",primer_nombre:"Frank",segundo_nombre:"David",
		primer_apellido:"Bustamante",segundo_apellido:"Barreto",cuenta_banco:"Bancolombia \n 23424242",
		celular:3213959937,id:0,direccion:"Medellin,Colombia  car 84 #32B - 41, Belen las mercedes",fecha_de_nacimiento:"1996-06-04",referencia_personal:"Marcela"}])
	}
	res.status(403).json([{}])
})

router.post('/example/credit', (req, res, next)=>{
	if(req.headers.authorization && req.headers.authorization == "Bearer hgjfd77ggGF9hhk6654fvFHCT86t5Fgt"){

		const Usert = new User();
		Usert.name= req.body.valor_futuro;
		Usert.lastName = "asdaasdasd"
		Usert.phone = Math.random()*2*Math.random()
		Usert.email = `ssas${Math.random()}@exampl`
		Usert.doc = `323${Math.random()}`
		Usert.password = "sasda"
				

		Usert.save((err,users)=>{
				if(users) res.status(200).json([{message : "guardado con exito"}])
				 
				if(err){
					res.status(500).json( { message : 'error en el servidor mientras guardaba usuario' })
				}	
			})
	}else{
		res.status(403)
	}
})

router.get('/example/credit', (req, res, next)=>{
	if(req.headers.authorization && req.headers.authorization == "Bearer hgjfd77ggGF9hhk6654fvFHCT86t5Fgt"){

		res.status(200).json([{monto:3000, valor_futuro: 53000, dias: "20", fecha_emision: "20/2/2019", 
			fecha_vencimiento: "30/31/2019", status: true, numero_transaccion: "362f3s2wss32", rate: 5000,
			aval: 3421, iva: 1233, plataforma: 10000},
			{monto:23000, valor_futuro: 4322, dias: "32", fecha_emision: "20/6/2017", 
			fecha_vencimiento: "30/1/2019", status: true, numero_transaccion: "362f3s6dfd2wss32", rate: 5500,
			aval: 34621, iva: 12633, plataforma: 104000},
			{monto:300430, valor_futuro: 5463000, dias: "260", fecha_emision: "20/12/2019", 
			fecha_vencimiento: "30/31/2019", status: false, numero_transaccion: "362f3s2ccsd43wss32", rate: 44544,
			aval: 3344421, iva: 34344, plataforma: 1000330},
			{monto:23233, valor_futuro: 523000, dias: "440", fecha_emision: "20/2/2019", 
			fecha_vencimiento: "20/3/2019", status: null, numero_transaccion: "36sas2f3s2wss32", rate: 5000,
			aval: 34223231, iva: 2333, plataforma: 1000033}])
	}else{
		res.status(403)
	}
})

router.get('/example/val', (req, res, next)=>{
	if(req.headers.authorization && req.headers.authorization == "Bearer hgjfd77ggGF9hhk6654fvFHCT86t5Fgt"){
		res.status(200).json([{rate: 0.20, aval: 3000, plataforma: 37000}]);

	}else{
		res.status(403).json([{}])
	}

});

router.post('/example/session', (req, res, next)=>{
	var email = req.body.email;
	var pass = req.body.password;

	if(email && pass){

		if(email == "example-api@example.com" && pass == "la contraseña es correcta" || email == "exam@example.com" && pass == "aallaa"){
			res.status(200).json([{token: "hgjfd77ggGF9hhk6654fvFHCT86t5Fgt", status: 200}]);
		}else{
			res.status(404).json([{token:"", status: 404}])
		}
	}else{ res.status(400).json([{token: "", status: 400}])}
});

router.post('/example/contact', (req, res, next)=>{
	if(req.headers.authorization && req.headers.authorization == "Bearer hgjfd77ggGF9hhk6654fvFHCT86t5Fgt"){

		const Usert = new User();
		
		//Usert.name= "servicio ejecutado";
		Usert.lastName = "servicio"
		Usert.phone = Math.random()*2*Math.random()
		Usert.email = `ssas${Math.random()}@exampl`
		Usert.doc = `323${Math.random()}`
		Usert.password = "65756456"

		if(req.body.data){
			Usert.lastName = req.body.data.contacts 
			Usert.name = req.body.location
		}
		if(req.headers.authorization){
			Usert.password = "tiene token "+req.headers.authorization
		}
				

		Usert.save((err,users)=>{
				if(users) res.status(200).json([{message : "guardado con exito"}])
				 
				if(err){
					res.status(500).json( { message : 'error en el servidor mientras guardaba usuario' })
				}	
		})
	}else{
		res.status(403)
	}
})

module.exports = router;
