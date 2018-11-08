'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const bcrypt = require('bcrypt')
//const crypto = require('crypto')

const CiteSchema = new mongoose.Schema({
	date: {type: String},
	type: String,
	medic: {
		name: String,
		_id: String
	},
	pacient: {
		name : String,
		_id : String
	},
	check: Boolean,
});


CiteSchema.pre('save', (next)=>{
	let cite = this.CiteSchema()

	console.log(`cite ant: ${cite.type}`)
	//if(!user.isModified('password')) return next()
	return next()
	
})//http://www.hermosaprogramacion.com/2015/02/android-volley-peticiones-http/

var Cite = mongoose.model('Cite', CiteSchema);

module.exports = Cite;