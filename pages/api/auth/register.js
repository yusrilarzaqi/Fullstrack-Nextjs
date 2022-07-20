import bcrypt from 'bcryptjs';

import db from '../../../libs/db.js';

export default async function handler(req, res) {
	// jika request method selain POST maka status code akan 405 dan return
	// "Method Not Allowed"
	if (req.method !== 'POST')
		return res.status(405).json({
			statusCode: 405,
			message: 'Method Not Aloowed',
		});

	// ambil email & pasword dari request body
	const { email, password } = req.body;

	// gerenrate salt
	const salt = bcrypt.genSaltSync(10);
	// encrypt password using bcryptjs
	const passwordHash = bcrypt.hashSync(password, salt);

	// insert to database
	const register = await db('users').insert({
		email,
		password: passwordHash,
	});

	// query database user
	const registeredUser = await db('users').where('email', email).first();

	// Print in console
	// console.log(register);
	// console.log({email, password});
	// console.log(salt);
	// console.log(passwordHash);

	// if successfully respond status code 200 and return "Register Successfully"
	res.status(200).json({
		message: 'Register Successfully',
		data: registeredUser,
	});
}
