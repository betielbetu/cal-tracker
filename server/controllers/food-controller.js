// import user model
const {Food} = require('../models');

exports.getFood = (req, res) => {
	//get the user
	Food.find({user_id: req.userId})
		.then(food => {
			if (!food){
				res.status(500).send([]);
			}
			res.status(200).send(food);
		})
		.catch(err => {
			res.status(500).send({error: err.message});
		});
};

exports.addFood = (req, res) => {
	const errors = [];
	if (!req.body.name) {
		errors.push('Missing name');
	}

	if (errors.length > 0) {
		res.status(500).send({error: errors.join('\n')});
		return;
	}

	//create the food obj
	const foodObj = {
		name: req.body.name,
		carbs: req.body.carbs,
		fats: req.body.fats,
		proteins: req.body.proteins,
		calories: req.body.calories,
		user_id: req.userId
	}

	Food.create(foodObj)
		.then(newFood => {
			res.status(200).send(newFood);
		})
		.catch(err => {
			res.status(500).send({error: err.message});
		});

};

exports.deleteFood = (req, res) => {
	Food.deleteOne({_id: req.params.foodId})
		.then(() => {
			res.status(200).send('Successfully Deleted');
		})
		.catch(err => {
			res.status(500).send({error: err.message});
		});
};
