import React, { useState } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { unauthPage } from '../../middlewares/authorizationPage.js';
import Link from 'next/link';

export async function getServerSideProps({ req, res }) {
	await unauthPage({ req, res });
	return {
		props: {}, // will passed to the page componenet as props
	};
}
export default function Login() {
	const [fields, setFields] = useState({ email: '', password: '' });
	const [status, setStatus] = useState('Normal');
	async function loginHandler(event) {
		event.preventDefault();
		setStatus('Loading');
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(fields),
		});
		if (!response.ok)
			return setStatus(`ERROR ${response.status} ${response.statusText}`);
		const login = await response.json();
		setStatus('Success');
		Cookie.set('token', login.token);
		Router.push('/posts');
	}
	function fieldHandler(event) {
		const name = event.target.getAttribute('name');
		setFields({
			...fields,
			[name]: event.target.value,
		});
	}
	return (
		<>
			<div className='jumbotron'>
				<h1 className='display-4'>LOGIN PAGE</h1>
			</div>
			<div className='container'>
				<form onSubmit={loginHandler.bind(this)}>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							placeholder='Email'
							onChange={fieldHandler}
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							placeholder='Password'
							onChange={fieldHandler.bind(this)}
							className='form-control'
						/>
					</div>
					{status && <p className='form-text text-muted'>Status : {status}</p>}
					<button className='btn btn-block btn-success' type='submit'>
						Login
					</button>
					<br />
				</form>
				<br />
				<h3>Tidak punya akun? :</h3>
				<Link href='/auth/register'>
					<button className='btn btn-block btn-primary'>Registrasi</button>
				</Link>
			</div>
		</>
	);
}
