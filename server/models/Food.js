const { Schema, model } = require('mongoose');

const foodSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		carbs: {
			type: Number,
			default: 0,
		},
		fats: {
			type: Number,
			default: 0,
		},
		proteins: {
			type: Number,
			default: 0,
		},
		calories: {
			type: Number,
			default: 0,
		},
		user_id: {
			type: String,
			required: true
		}
	}
);

const Food = model('Food', foodSchema);

module.exports = Food;
