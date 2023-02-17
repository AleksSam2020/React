import React, { useEffect, useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserRoleTC, loginUserTC, user } from '../../store/user';

export const Login = ({ setShowUserLogin }) => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const userSelector = useSelector(user);

	useEffect(() => {
		if (userSelector.isAuth) {
			localStorage.setItem('userToken', userSelector.token);
			history.push('/courses');
			setShowUserLogin(true);
			dispatch(checkUserRoleTC());
			localStorage.setItem('userRole', userSelector.role);
		}
	}, [userSelector]);

	const onLogin = (e) => {
		e.preventDefault();
		const currentUser = {
			password: password,
			email: email,
		};

		dispatch(loginUserTC(currentUser));
	};

	return (
		<form className='login-container' onSubmit={onLogin}>
			<span className='login-form'>Login</span>
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
				<Button content='Login' onClick={() => {}} type='submit' id={2} />
			</div>
			<div>
				If you not have an account you can{' '}
				<span onClick={() => history.push('/registration')}>Registration</span>
			</div>
		</form>
	);
};
