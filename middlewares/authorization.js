import jwt from 'jsonwebtoken';
const dotenv = require('dotenv').config({ path: '.env.local' }).parsed;

export default async function authorization(req, res) {
	return new Promise((resolve, reject) => {
		// prcess authorization
		const { authorization } = req.headers;

		// jika authorization tidak ada
		if (!authorization)
			return res.status(401).json({
				statusCode: 401,
				error: 'Unauthorized',
				message: 'Token Not Found',
			});

		// desctructuring
		const [authType, authToken] = authorization.split(' ');

		if (authType !== 'Bearer')
			return res.status(401).json({
				statusCode: 401,
				error: 'Unauthorized',
				message: 'Authorization Type Invalid',
			});

		return jwt.verify(authToken, dotenv.SECRET_KEY, (err, decoded) => {
			if (err)
				return res.status(401).json({
					statusCode: 401,
					error: 'Unauthorized',
					name: err.name,
					message: err.message,
				});

			return resolve(decoded);
		});
	});
}
