import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import './Registration.css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Registration = ({ setShowUserLogin }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const onRegistration = async (e) => {
		e.preventDefault();

		const newUser = {
			name,
			password,
			email,
		};

		newUser.propTypes = {
			name: PropTypes.string,
			password: PropTypes.string,
			email: PropTypes.string,
		};

		const response = await fetch('http://localhost:3000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		setShowUserLogin(true);
		history.push('/courses');
	};

	return (
		<form className='registration-container' onSubmit={onRegistration}>
			<span className='registration'>Registration</span>
			<div className='name'>
				<label htmlFor='name'>Name</label>
				<Input
					id='name'
					placeholder='Enter name...'
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
			</div>
			<div className='email'>
				<label htmlFor='email'>Email</label>
				<Input
					id='email'
					placeholder='Enter email...'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					type='email'
				/>
			</div>
			<div className='password'>
				<label htmlFor='password'>Password</label>
				<Input
					type='password'
					id='password'
					placeholder='Enter password...'
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>
			<div>
				<Button
					content='Registration'
					onClick={() => {}}
					type='submit'
					id={1}
				/>
			</div>
			<div>
				If you have an account you can{' '}
				<span onClick={() => history.push('/login')}>Login</span>
			</div>
		</form>
	);
};
