import { ADD_NEW_AUTHOR, SET_ALL_AUTHORS } from './actionTypes';

export const setAllAuthorsAC = (allAuthors) => ({
	type: SET_ALL_AUTHORS,
	allAuthors,
});

export const addNewAuthorAC = (newAuthor) => ({
	type: ADD_NEW_AUTHOR,
	newAuthor,
});
