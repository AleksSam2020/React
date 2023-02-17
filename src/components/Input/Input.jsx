import React from 'react';
import './Input.css';

export const Input = ({
	id,
	onChange,
	placeholder,
	value,
	type = 'text',
	required = false,
}) => {
	return (
		<input
			id={id}
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			required={required}
		/>
	);
};
