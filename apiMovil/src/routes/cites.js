const router = require('express').Router();
const mongojs = require('mongojs');
const cors = require('cors');
const db = mongojs('mongodb://adminMovil08642:9753124680Root@ds227352.mlab.com:27352/db_salud');
const auth =require('../controller/auth')
const Cite = require('../models/cite')

//ALL CITES
router.get('/cite', auth.isAuth, (req,res, next) =>{

	db.cites.find((err,cites)=>{
		if(err) {
			console.log('error: ',err);
			return next(err);
		}

		res.status(200).json(cites)
	});

});

//CITE
router.get('/cite/:id', auth.isAuth, (req,res,next)=>{
	db.cites.findOne({_id: mongojs.ObjectId(req.params.id)}, (err,cite)=>{
		if(err) return next(err);
		res.status(200).json(cite);
	});
});

//USER CITES
router.get('/cite/user/:id',auth.isAuth, (req, res, next) =>{
	console.log(`id ci ${req.params.id}`)
	Cite.find({"pacient._id": req.params.id }, function (err, docs) {
		if (err) { res.status(500).json({ message : 'Error en el servidor' }) }

		if(docs){ res.status(200).json({ cites: docs, ok: true }); console.log(`doc: ${docs}`) }
	})
})

router.get('/cite/medic/:id',auth.isAuth, (req, res, next) =>{
	console.log(`id ci ${req.params.id}`)
	Cite.find({"medic._id": req.params.id }, function (err, docs) {
		if (err) { res.status(500).json({ message : 'Error en el servidor' }) }

		if(docs){ res.status(200).json({ cites: docs, ok: true }); console.log(`doc: ${docs}`) }
	})
})

//POST CITES USER
router.post('/cite', auth.isAuth, (req,res,next)=>{
	 var cite = req.body;

	if(!cite.pacient || !cite.medic){
		res.status(400).json({
			error:'in cite object'
		});
	}else{
		console.log(req.body.medic.name +'  ' +cite)
		cite.medic.name = req.body.medic.name.split(" ")[0]
		cite.medic._id = req.body.medic._id
		console.log('medico ¿'+cite.medic._id +'   '+req.body.medic._id)
		
		db.cites.save(cite, (err,cite)=>{
			if(err)return next(err);
			res.status(200).json(cite);
		});
	}
});

router.delete('/cite/:id', auth.isAuth, (req,res,next)=>{
	db.cites.remove({_id: mongojs.ObjectId(req.params.id)},(err,result)=>{
		if(err) return next(err);
		res.json({result:result});
    });
});

router.put('/cite/:id', auth.isAuth, (req,res,next)=>{
	const cite = req.body;
	cite._id = mongojs.ObjectId(req.params.id);

	db.cites.update({_id: mongojs.ObjectId(req.params.id)},{$set: cite},(err,cite)=>{
		if(err){
		 res.status(400).json('error',err);
		 return next(err);}
		res.status(200).json({result:cite});
	})
})

module.exports = router;