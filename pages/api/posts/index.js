import db from '../../../libs/db.js';
import authorization from '../../../middlewares/authorization.js';

export default async function handler(req, res) {
	// Jika request method selain get maka akan merespon status code 405 (Method Not Allowed)
	if (req.method !== 'GET')
		return res.status(405).json({
			message: 'METHOD NOT ALLOWED',
		});

	await authorization(req, res);

	// console.log(auth);
	// mengambil request dari table posts
	const posts = await db('post');

	res.status(200).json({
		message: 'Posts data',
		data: posts,
	});
}
