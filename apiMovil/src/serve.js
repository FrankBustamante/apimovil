// imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

//const routes = require('./routes/index');
const usersRoutes = require('./routes/users');
const citesRoutes = require('./routes/cites');
const histRoutes = require('./routes/historyM');
const recipesRoutes = require('./routes/recipes');

// settings
//app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
//app.engine('html', require('ejs').renderFile);
//app.set('view engines','ejs');

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
//app.use(express.static(path.join(__dirname,'dist')));

// star serve
app.listen(app.get('port'),()=>{
	console.log('serve on ',app.get('port'))
});