import db from '../../../../libs/db.js';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res) {
	// Jika request method selain PUT maka akan merespon status code 405 (Method Not Allowed)
	if (req.method !== 'PUT')
		return res.status(405).json({
			message: 'METHOD NOT ALLOWED',
		});

	const auth = await authorization(req, res);
	// console.log(auth);

	// Menggambil dari request query dan destruct menjadi id
	const { id } = req.query;

	// Menggambil dari request content body dan destruct menjadi title dan content
	const { title, content } = req.body;

	// mengambil data dari database berdasarkan id (query)

	const update = await db('post').where({ id }).update({
		title,
		content,
	});

	const updatedData = await db('post').where('id', id).first();

	console.log(update);
	// respond dengan status code 200 (Success) dan menampilkan "Post created successfully" dan data yang baru saya dibuat
	res.status(200).json({
		message: 'Post Update data successfully',
		updatedData,
	});
}
