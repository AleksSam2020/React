import React from 'react';
import IconLogo from '../assets/970882.svg';
import './Logo.css';

export const Logo = () => {
	return (
		<div className='logo'>
			<img src={IconLogo} alt='logo' />
		</div>
	);
};
