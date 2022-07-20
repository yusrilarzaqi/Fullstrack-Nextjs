import React, { useState } from 'react';
import { authPage } from '../../../middlewares/authorizationPage';
import Router from 'next/router';
import Nav from '../../../components/Nav';

export async function getServerSideProps(context) {
	const token = await authPage(context);
	const { id } = context.query;
	const response = await fetch(`http://127.0.0.1:3000/api/posts/detail/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const { data } = await response.json();
	return {
		props: {
			token,
			id,
			data,
		},
	};
}

export default function PostEdit({ token, id, data }) {
	const [fields, setField] = useState({
		title: data.title,
		content: data.content,
	});
	const [status, setStatus] = useState('Normal');

	async function handler(event) {
		event.preventDefault();
		setStatus('loading');
		const request = await fetch(`/api/posts/update/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(fields),
		});
		const { message } = await request.json();
		setStatus(message);
		Router.push('/posts');
	}

	function fieldHandler(event) {
		const target = event.target;
		setField({
			...fields,
			[target.getAttribute('name')]: target.value,
		});
	}

	return (
		<>
			<Nav />
			<div className='jumbotron'>
				<h1 className='display-4'>Edit a Post</h1>
				<p className='lead'>Post ID : {data.id}</p>
			</div>
			<div className='container'>
				<form onSubmit={handler.bind(this)}>
					<div className='form-group'>
						<label htmlFor='title'>Title</label>
						<input
							required
							name='title'
							value={fields.title}
							placeholder='Title'
							type='text'
							onChange={fieldHandler.bind(this)}
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='content'>Content</label>
						<textarea
							required
							name='content'
							value={fields.content}
							placeholder='Content'
							type='text'
							onChange={fieldHandler.bind(this)}
							className='form-control'
						/>
					</div>
					{status && <p className='form-text text-muted'>Status : {status}</p>}
					<button className='btn btn-block btn-primary' type='submit'>
						Save Changes
					</button>
				</form>
			</div>
		</>
	);
}
