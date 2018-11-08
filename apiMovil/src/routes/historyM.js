const router = require('express').Router();
const mongojs = require('mongojs');

const db = mongojs('mongodb://adminMovil08642:9753124680Root@ds227352.mlab.com:27352/db_salud');

router.get('/history',(req,res, next) =>{
	db.historys.find((err,historys)=>{
		if(err) {
			console.log('error: ',err);
			return next(err);
		}
		res.status(200).json(historys);
	});
});

router.get('/history/:id', (req,res,next)=>{
	db.historys.findOne({"pacient._id": (req.params.id)}, (err,history)=>{
		if(err) return next(err);
		res.status(200).json(history);
	});
});

router.post('/history',(req,res,next)=>{
	 var history = req.body;

	if(false){
		res.status(400).json({
			error:'in history object'
		});
	}else{
		db.historys.save(history, (err,history)=>{
			if(err)return next(err);
			res.status(200).json(history);
		});
	}
});

router.delete('/history/:id',(req,res,next)=>{
	db.historys.remove({_id: mongojs.ObjectId(req.params.id)},(err,result)=>{
		if(err) return next(err);
		res.json({result:result});
    });
});

router.put('/history/:id',(req,res,next)=>{
	const history = req.body;
	history._id = mongojs.ObjectId(req.params.id);

	db.historys.update({_id: mongojs.ObjectId(req.params.id)},{$set: history},(err,history)=>{
		if(err){
		 res.status(400).json('error',err);
		 return next(err);}
		res.status(200).json({result:history});
	})
})

module.exports = router;