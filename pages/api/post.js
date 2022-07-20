const dotenv = require('dotenv').config({ path: '.env.local' }).parsed;

export default function handler(req, res) {
	res.status(200).json({
		key: dotenv.SECRET_KEY,
	});
}
