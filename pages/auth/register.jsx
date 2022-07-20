import React, { useState } from 'react';
import { unauthPage } from '../../middlewares/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps({ req, res }) {
	await unauthPage({ req, res });

	return {
		props: {},
	};
}
export default function Register() {
	const [fields, setFields] = useState({ email: '', password: '' });
	const [status, setStatus] = useState('normal');

	async function registerHandler(event) {
		event.preventDefault();

		setStatus('Loading');

		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(fields),
		});

		if (!response.ok) return setStatus(`error ${response.statusText}`);

		await response.json();

		setStatus('success');
	}

	function fieldHandler(event) {
		const name = event.target.getAttribute('name');
		setFields({
			...fields,
			[name]: event.target.value,
		});
	}
	return (
		<div>
			<div className='jumbotron'>
				<h1 className='display-4'>Registras Page</h1>
			</div>
			<div className='container'>
				<form onSubmit={registerHandler.bind(this)}>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							name='email'
							type='text'
							placeholder='Email'
							onChange={fieldHandler.bind(this)}
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							name='password'
							type='password'
							placeholder='Password'
							onChange={fieldHandler.bind(this)}
							className='form-control'
						/>
					</div>
					{status && <p className='form-text text-muted'>Status : {status}</p>}
					<button className='btn btn-block btn-success' type='submit'>
						Register
					</button>
				</form>
				<br />
				<h3>Sudah punya akun? :</h3>
				<Link href='/auth/login'>
					<button className='btn btn-block btn-primary'>Login</button>
				</Link>
			</div>
		</div>
	);
}
