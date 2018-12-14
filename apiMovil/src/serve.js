// imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')



//const routes = require('./routes/index');
const usersRoutes = require('./routes/users');
const citesRoutes = require('./routes/cites');
const histRoutes = require('./routes/historyM');
const recipesRoutes = require('./routes/recipes');

// settings
//app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 4200);
app.engine('html', require('ejs').renderFile);
app.set('view engines','ejs');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
//app.use(routes);
app.use('/api',citesRoutes);
app.use('/api',histRoutes);
app.use('/api',recipesRoutes);
app.use('/api',usersRoutes);

// static files
app.use(express.static(path.join(__dirname,'dist/client')));

// star serve
app.listen(app.get('port'),()=>{
	console.log('serve on ',app.get('port'))
});

//conection mongodb
mongoose.connect('mongodb://adminMovil08642:9753124680Root@ds227352.mlab.com:27352/db_salud',
	(err, res)=>{
		if (err) {
			return console.log(`error al conectar ${err}`)
		}
		console.log(`coneccion a la DB exitosa `)
})


// mongoose.connect('mongodb://hackaton_med:rappi.ruiz.mongo-hackathon.eastus2.cloudapp.azure.com/db_salud',
//  	(err, res)=>{
//  		if (err) {
//  			return console.log(`error al conectar ${err}`)
//  		}
//  		console.log(`coneccion a la DB exitosa `)
//  })
