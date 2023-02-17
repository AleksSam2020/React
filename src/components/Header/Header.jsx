import React, { useEffect } from 'react';
import { Button } from '../Button';
import { Logo } from '../Logo';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserTC, user } from '../../store/user';
import { useHistory } from 'react-router-dom';

export const Header = ({ showUserLogin, setShowUserLogin }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const userSelector = useSelector(user);

	useEffect(() => {
		if (!localStorage.getItem('userToken')) {
			history.push('/login');
		}
	});

	const onLogOut = () => {
		dispatch(logoutUserTC());
		localStorage.clear();
		setShowUserLogin(false);
	};
	return (
		<div className='header'>
			<Logo />
			{showUserLogin && (
				<div className='login'>
					<div className='userName'>{userSelector.name}</div>
					<Button content='Log out' onClick={onLogOut} />
				</div>
			)}
		</div>
	);
};
