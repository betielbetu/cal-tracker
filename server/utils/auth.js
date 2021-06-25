const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

createToken = (userName, email, _id) => {
	return jwt.sign({username: userName, email: email, id: _id}, secret, {expiresIn: 86400});
};

verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({
			error: "No token provided!"
		});
	}

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				error: "Unauthorized!"
			});
		}
		req.userId = decoded.id;
		next();
	});
};

module.exports = {verifyToken, createToken};

