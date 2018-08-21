// imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

//const routes = require('./routes/index');
const usersRoutes = require('./routes/users');
const citesRoutes = require('./routes/cites');

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
app.use('/api',usersRoutes);
app.use('/api',citesRoutes);

// static files
app.use(express.static(path.join(__dirname,'dist')));

// star serve
app.listen(app.get('port'),()=>{
	console.log('serve on ',app.get('port'))
});