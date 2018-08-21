const router = require('express').Router();
const mongojs = require('mongojs');

const db = mongojs('mongodb://adminMovil08642:9753124680Root@ds227352.mlab.com:27352/db_salud');
	
router.get('/user',(req,res, next) =>{
	db.users.find((err,users)=>{
		if(err) {
			console.log('error: ',err);
			return next(err);
		}
		res.status(200).json(users);
	});
});

router.get('/user/:id', (req,res,next)=>{
	db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, (err,user)=>{
		if(err) return next(err);
		res.status(200).json(user);
	});
});

router.post('/user',(req,res,next)=>{
	 var user = req.body;

	if(!user.name || !user.email){
		res.status(400).json({
			error:'in user object'
		});
	}else{
		db.users.save(user, (err,user)=>{
			if(err)return next(err);
			res.status(200).json(user);
		});
	}
});

router.delete('/user/:id',(req,res,next)=>{
	db.users.remove({_id: mongojs.ObjectId(req.params.id)},(err,result)=>{
		if(err) return next(err);
		res.json({result:result});
    });
});

router.put('/user/:id',(req,res,next)=>{
	const user = req.body;
	user._id = mongojs.ObjectId(req.params.id);
	console.log(user);
	
	db.users.update({_id: mongojs.ObjectId(req.params.id)},{$set: user},(err,user)=>{
		if(err){
		 res.status(400).json('error',err);
		 console.log(err);
		 return next(err);

		}
		res.status(200).json({result:user});
	})
})

module.exports = router;