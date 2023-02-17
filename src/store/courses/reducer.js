import {
	ADD_NEW_COURSE,
	DELETE_COURSE,
	SET_ALL_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

export const InitialState = [];

export const coursesReducer = (state = InitialState, action) => {
	switch (action.type) {
		case SET_ALL_COURSES: {
			return [...action.allCourses];
		}
		case ADD_NEW_COURSE: {
			return [...state, action.newCourse];
		}
		case DELETE_COURSE: {
			return [...state.filter((course) => course.id !== action.id)];
		}

		case UPDATE_COURSE: {
			const updatedCourseIndex = state.findIndex(
				(course) => course.id === action.course.id
			);
			const newState = [...state];
			newState[updatedCourseIndex] = action.course;
			return newState;
		}

		default:
			return state;
	}
};
