import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRouter = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('userRole') === 'admin' ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/courses', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};
