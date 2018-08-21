const router = require('express').Router();
const mongojs = require('mongojs');

const db = mongojs('mongodb://adminMovil08642:9753124680Root@ds227352.mlab.com:27352/db_salud');

router.get('/cite',(req,res, next) =>{
	db.cites.find((err,cites)=>{
		if(err) {
			console.log('error: ',err);
			return next(err);
		}
		res.status(200).json(cites);
	});
});

router.get('/cite/:id', (req,res,next)=>{
	db.cites.findOne({_id: mongojs.ObjectId(req.params.id)}, (err,cite)=>{
		if(err) return next(err);
		res.status(200).json(cite);
	});
});

router.post('/cite',(req,res,next)=>{
	 var cite = req.body;

	if(!cite.pacient || !cite.medic){
		res.status(400).json({
			error:'in cite object'
		});
	}else{
		db.cites.save(cite, (err,cite)=>{
			if(err)return next(err);
			res.status(200).json(cite);
		});
	}
});

router.delete('/cite/:id',(req,res,next)=>{
	db.cites.remove({_id: mongojs.ObjectId(req.params.id)},(err,result)=>{
		if(err) return next(err);
		res.json({result:result});
    });
});

router.put('/cite/:id',(req,res,next)=>{
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