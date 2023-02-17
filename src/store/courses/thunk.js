import {
	addNewCourse,
	deleteCourse,
	getAllCourses,
	updateCourse,
} from '../../services';
import {
	addNewCourseAC,
	deleteCourseAC,
	setAllCoursesAC,
	updateCourseAC,
} from './actionCreators';

export const getAllCoursesTC = () => {
	return (dispatch) => {
		getAllCourses().then((data) => dispatch(setAllCoursesAC(data.result)));
	};
};

export const addNewCourseTC = (newCourse) => {
	return (dispatch) => {
		addNewCourse(newCourse).then((data) => {
			dispatch(addNewCourseAC(newCourse));
		});
	};
};

export const deleteCourseTC = (id) => {
	return (dispatch) => {
		deleteCourse(id).then((data) => {
			dispatch(deleteCourseAC(id));
		});
	};
};

export const updateCourseTC = (course, id) => {
	return (dispatch) => {
		updateCourse(course, id).then((data) => {
			dispatch(updateCourseAC(course, id));
		});
	};
};
