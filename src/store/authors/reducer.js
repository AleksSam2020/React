import { ADD_NEW_AUTHOR, SET_ALL_AUTHORS } from './actionTypes';

const InitialState = [];

export const authorsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case SET_ALL_AUTHORS: {
			return [...action.allAuthors];
		}
		case ADD_NEW_AUTHOR: {
			return [...state, action.newAuthor];
		}

		default:
			return state;
	}
};
