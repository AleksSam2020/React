import { addAuthor, getAllAuthors } from '../../services';
import { addNewAuthorAC, setAllAuthorsAC } from './actionCreators';

export const getAllAuthorsTC = () => {
	return (dispatch) => {
		getAllAuthors().then((data) => dispatch(setAllAuthorsAC(data.result)));
	};
};

export const addAuthorTC = (newAuthor) => {
	return (dispatch) => {
		addAuthor(newAuthor).then((data) => dispatch(addNewAuthorAC(newAuthor)));
	};
};
