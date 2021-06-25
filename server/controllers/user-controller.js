// import user model
const {User} = require('../models');
// import sign token function from auth
const {createToken} = require('../utils/auth');

// create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
exports.createUser = (req, res) => {
	const errors = [];
	if (!req.body.username) {
		errors.push('Missing username');
	}

	if (!req.body.email) {
		errors.push('Missing email');
	}

	if (!req.body.password) {
		errors.push('Missing password');
	}

	if (errors.length > 0) {
		res.status(500).send({error: errors.join('\n')});
		return;
	}

	User.create(req.body)
		.then(newUser => {
			const token = createToken(newUser.username, newUser.email, newUser._id);
			const returnUser = {
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email
			}
			res.status(200).send({user: returnUser, accessToken: token});
		})
		.catch(err => {
			res.status(500).send({error: err.message});
		});

}

exports.loginUser = (req, res) => {
	const errors = [];
	if (!req.body.email) {
		errors.push('Missing email');
	}

	if (!req.body.password) {
		errors.push('Missing password');
	}

	if (errors.length > 0) {
		res.status(500).send({error: errors.join('\n')});
		return;
	}

	User.findOne({email: req.body.email})
		.then(async foundUser => {
			const correctPw = foundUser.isCorrectPassword(req.body.password);
			if (!correctPw) {
				return res.status(400).send({error: 'Wrong password!'});
			}
			const token = createToken(foundUser.username, foundUser.email, foundUser._id);

			const returnUser = {
				_id: foundUser._id,
				username: foundUser.username,
				email: foundUser.email
			}
			res.status(200).send({user: returnUser, accessToken: token});
		})
		.catch(err => {
			res.status(500).send({error: err.message});
		});
};

