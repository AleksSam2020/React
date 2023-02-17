import { addNewCourseAC, coursesReducer, setAllCoursesAC } from '../courses';

describe('CourseReducer', () => {
	it('should return the initial state', () => {
		const action = {
			type: undefined,
		};
		const initialState = [];
		expect(coursesReducer(initialState, action)).toEqual([...initialState]);
	});

	it('should handle SAVE_COURSE and returns new state', () => {
		const action = addNewCourseAC({ id: '1', name: 'JavaScript' });
		const initialState = [];
		const newState = coursesReducer(initialState, action);
		expect(newState.length).toBe(1);
	});

	it('should handle GET_COURSES and returns new state', () => {
		const initialState = [
			{ id: '1', name: 'JavaScript' },
			{ id: '2', name: 'Java' },
		];
		const action = setAllCoursesAC(initialState);
		const newState = coursesReducer(initialState, action);
		expect(newState.length).toBe(initialState.length);
	});
});
