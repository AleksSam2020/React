import {
	ADD_NEW_COURSE,
	DELETE_COURSE,
	SET_ALL_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

export const setAllCoursesAC = (allCourses) => ({
	type: SET_ALL_COURSES,
	allCourses,
});

export const addNewCourseAC = (newCourse) => ({
	type: ADD_NEW_COURSE,
	newCourse,
});

export const deleteCourseAC = (id) => ({
	type: DELETE_COURSE,
	id,
});

export const updateCourseAC = (course, id) => ({
	type: UPDATE_COURSE,
	course,
	id,
});
