import { checkUserRole, loginUser, logoutUser } from '../../services';
import { loginUserAC, setUserRole } from './actionCreators';

export const loginUserTC = (user) => {
	return (dispatch) => {
		loginUser(user).then((data) =>
			dispatch(
				loginUserAC({
					isAuth: true,
					name: data.user.name,
					email: data.user.email,
					token: data.result,
				})
			)
		);
	};
};

export const logoutUserTC = () => {
	return (dispatch) => {
		logoutUser().then((data) => {
			dispatch(loginUserAC({ isAuth: false, name: '', email: '', token: '' }));
		});
	};
};

export const checkUserRoleTC = () => {
	return (dispatch) => {
		checkUserRole().then((data) => dispatch(setUserRole(data.result.role)));
	};
};
