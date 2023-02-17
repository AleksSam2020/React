import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import React from 'react';
import { CourseCard } from '../CourseCard';
import { getByText } from '@testing-library/react';
import { mockedState, mockedStore } from '../../../store/mocks';

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

describe('courseCard', () => {
	const course = mockedState.courses[0];

	it('should display title', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<CourseCard {...course} />
				</Provider>,
				container
			);
		});

		expect(getByText(container, course.title)).toBeInTheDocument();
	});

	it('should display description', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<CourseCard {...course} />
				</Provider>,
				container
			);
		});

		const hasDescription = getByText(container, (content, node) => {
			const hasText = (node) => node.textContent === course.description;
			const nodeHasText = hasText(node);
			const childrenDontHaveText = Array.from(node.children).every(
				(child) => !hasText(child)
			);

			return nodeHasText && childrenDontHaveText;
		});
		expect(hasDescription).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<CourseCard {...course} />
				</Provider>,
				container
			);
		});
		expect(course.duration.match(/([0-2][0-4]):([0-5][0-9])/)).toBeTruthy();
		expect(
			getByText(container, `${course.duration} hours`)
		).toBeInTheDocument();
	});

	it('should display authors list', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<CourseCard {...course} />
				</Provider>,
				container
			);
		});

		expect(getByText(container, course.authors)).toBeInTheDocument();
	});

	it('should display created date in the correct format', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<CourseCard {...course} />
				</Provider>,
				container
			);
		});

		expect(
			course.creationDate.match(/([0-9])\/((?:1)?[0-9])\/([2][0][2][0-9])/)
		).toBeTruthy();
		expect(getByText(container, course.creationDate)).toBeInTheDocument();
	});
});
