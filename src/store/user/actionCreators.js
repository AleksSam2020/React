import { LOGIN_USER, SET_EDIT_MODE, SET_USER_ROLE } from './actionTypes';

export const loginUserAC = ({ isAuth, email, name, token }) => ({
	type: LOGIN_USER,
	user: { isAuth, email, name, token },
});

export const setUserRole = (role) => ({
	type: SET_USER_ROLE,
	role,
});
export const setEditModeAC = (isEditMode) => ({
	type: SET_EDIT_MODE,
	isEditMode,
});
