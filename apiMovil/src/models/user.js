'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const enumValues = require('mongoose-enumvalues')  
//const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
	name: String,
	lastName: String,
	phone: {type: Number , unique: true },
	email: {type: String, unique: true, lowercase: true},
	password: String ,
	role: {
	    type: String,
	    enum: ['ADMIN', 'USER', 'MEDIC'],
	    default: 'USER'
    },
    doc: String,
	signupDate: {type: Date, defalut: Date.now()},
	lastLogin: Date,
	horarios:[
		{
			fecha:String,
			hora:String
		}
	]
});


UserSchema.pre('save', (next)=>{
	let user = this

	console.log(`user ant: ${user.name}`)
	//if(!user.isModified('password')) return next()
	return next()
	
})//http://www.hermosaprogramacion.com/2015/02/android-volley-peticiones-http/

var User = mongoose.model('User', UserSchema);

module.exports = User;
