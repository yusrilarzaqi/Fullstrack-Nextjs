import db from '../../../../libs/db.js';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res) {
	if (req.method !== 'DELETE')
		return res.status(405).json({
			statusCode: 405,
			message: 'METHOD NOT ALLOWED',
		});
	await authorization(req, res);
	// console.log(auth);

	const { id } = req.query;

	const deleteRow = await db('post').where({ id }).del();

	res.status(200).json({
		message: 'Post Deleted successfully',
		success: deleteRow,
	});
}
