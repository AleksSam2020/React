import React from 'react';
import './Button.css';
export const Button = ({ content, onClick, id, type }) => {
	return (
		<>
			<button onClick={onClick} data-id={id} type={type}>
				{content}
			</button>
		</>
	);
};
