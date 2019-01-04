'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const enumValues = require('mongoose-enumvalues')  
//const crypto = require('crypto')

const CreditSchema = new mongoose.Schema({
	monto: String,
	valor_futuro: String,
	dias: String,
	fecha_emision: String,
	fecha_vencimiento: String ,
	status: String,
    numero_transaccion: String,
});


CreditSchema.pre('save', (next)=>{
	return next()
	
})//http://www.hermosaprogramacion.com/2015/02/android-volley-peticiones-http/

var Credit = mongoose.model('Credit', CreditSchema);

module.exports = Credit;
