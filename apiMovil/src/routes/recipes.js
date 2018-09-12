const router = require('express').Router();
//const mongojs = require('mongojs');
const mongoose = require('mongoose');

//Rutas
router.get('/recipe',(req,res, next) =>{
	db.recipes.find((err,recipes)=>{
		if(err) {
			console.log('error: ',err);
			return next(err);
		}
		res.status(200).json(recipes);
	});
});

router.get('/recipe/:id', (req,res,next)=>{
	db.recipes.findOne({_id: mongojs.ObjectId(req.params.id)}, (err,recipe)=>{
		if(err) return next(err);
		res.status(200).json(recipe);
	});
});

router.post('/recipe',(req,res,next)=>{
	 var recipe = req.body;

	if(!recipe.pacient || !recipe.medic){
		res.status(400).json({
			error:'in recipe object'
		});
	}else{
		db.recipes.save(recipe, (err,recipe)=>{
			if(err)return next(err);
			res.status(200).json(recipe);
		});
	}
});

router.delete('/recipe/:id',(req,res,next)=>{
	db.recipes.remove({_id: mongojs.ObjectId(req.params.id)},(err,result)=>{
		if(err) return next(err);
		res.json({result:result});
    });
});

router.put('/recipe/:id',(req,res,next)=>{
	const recipe = req.body;
	recipe._id = mongojs.ObjectId(req.params.id);

	db.recipes.update({_id: mongojs.ObjectId(req.params.id)},{$set: recipe},(err,recipe)=>{
		if(err){
		 res.status(400).json('error',err);
		 return next(err);}
		res.status(200).json({result:recipe});
	})
})

module.exports = router;