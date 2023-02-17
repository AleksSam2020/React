import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../../CourseCard/CourseCard.constants';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import React from 'react';
import { Courses } from '../Courses';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
	},
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

let container = null;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

describe('Course', () => {
	it('should display amount of CourseCard equal length of courses array', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Courses />
				</Provider>,
				container
			);
		});
		expect(document.querySelectorAll('.course-card').length).toBe(
			mockedState.courses.length
		);
	});

	it('should display Empty container if courses array length is 0', () => {
		mockedState.courses = [];
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Courses />
				</Provider>,
				container
			);
		});
		expect(document.querySelectorAll('.course-card').length).toBe(0);
	});

	it('CourseForm should be showed after a click on a button "Add new course"', () => {
		const history = createMemoryHistory();
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Router history={history}>
						<Courses />
					</Router>
				</Provider>,
				container
			);
		});
		const btn = document.querySelectorAll('button')[1];
		fireEvent.click(btn);
		expect(history.location.pathname).toEqual('/courses/add');
	});
});
