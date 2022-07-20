const dotenv = require('dotenv').config({ path: '.env.local' }).parsed;
import db from '../../../libs/db.js';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

export default async function handler(req, res) {
	// jika request method selain POST maka status code akan 405 dan return
	// "Method Not Allowed"
	if (req.method !== 'POST')
		return res.status(405).json({
			statusCode: 405,
			message: 'Method Not Aloowed',
		});

  // console.log(req.body);
	// ambil informasi email & password dari request body
	const { email, password } = req.body;

	// ambil data dari database dengan table users yang mempunyai email sama dengan req.body
	const checkUser = await db('users').where({ email }).first();

	// jika tidak ada checkUser undefined / tidak ada yang diquery maka response status code 401 "Unauthorized" atau "email tidak valid"
	if (!checkUser)
		return res.status(401).json({
			statusCode: 401,
			error: 'Unauthorized',
			message: 'Email invalid',
		});

	// check password (compare) yang di database dengan password req.body
	const checkPassword = await bcrypt.compare(password, checkUser.password);

	// jika tidak ada checkPassword undefined / tidak password tidak sama maka response status code 401 "Unauthorized" atau "password tidak valid"
	if (!checkPassword)
		return res.status(401).json({
			statusCode: 401,
			error: 'Unauthorized',
			message: 'Password invalid',
		});

	// generate jwt token
	const token = Jwt.sign(
		{
			id: checkUser.id,
			email: checkUser.email,
		},
		dotenv.SECRET_KEY,
		{
			expiresIn: '7d',
		}
	);

	// jika sukses semua maka response status code 200 dan return token dan "Login Successfully"
	res.status(200).json({
		message: 'Login Successfully',
		token,
	});
}
