import { LOGIN_USER, SET_EDIT_MODE, SET_USER_ROLE } from './actionTypes';

const InitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	isEditMode: false,
};

export const userReducer = (state = InitialState, action) => {
	switch (action.type) {
		case LOGIN_USER: {
			return {
				...state,
				...action.user,
			};
		}

		case SET_USER_ROLE: {
			return {
				...state,
				role: action.role,
			};
		}

		case SET_EDIT_MODE: {
			return {
				...state,
				isEditMode: action.isEditMode,
			};
		}

		default:
			return state;
	}
};
