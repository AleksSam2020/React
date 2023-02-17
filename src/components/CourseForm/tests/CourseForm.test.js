import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import React from 'react';
import { CourseForm } from '../CourseForm';
import {
	fireEvent,
	getByPlaceholderText,
	getByText,
	queryByText,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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

describe('CourseForm', () => {
	const history = createMemoryHistory();
	it('should show authors lists', () => {
		const authors = mockedState.authors;
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Router history={history}>
						<CourseForm />
					</Router>
				</Provider>,
				container
			);
		});

		expect(
			getByText(container.querySelector('.authors-container'), authors[0].name)
		).toBeInTheDocument();
		expect(
			getByText(container.querySelector('.authors-container'), authors[1].name)
		).toBeInTheDocument();
		expect(
			getByText(container.querySelector('.authors-container'), authors[2].name)
		).toBeInTheDocument();
		expect(
			getByText(container.querySelector('.authors-container'), authors[3].name)
		).toBeInTheDocument();
	});

	it('Create author click button should call dispatch.', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Router history={history}>
						<CourseForm />
					</Router>
				</Provider>,
				container
			);
		});
		const input = getByPlaceholderText(container, 'Enter author name...');
		const btn = getByText(container, 'Create author');
		fireEvent.change(input, { target: { value: 'Sasha' } });
		fireEvent.click(btn);
		expect(mockedStore.dispatch).toHaveBeenCalled();
	});

	it('Add author button click should add an author to course authors list', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Router history={history}>
						<CourseForm />
					</Router>
				</Provider>,
				container
			);
		});
		const btn = container.querySelector('.authors-container button[data-id]');
		fireEvent.click(btn);
		expect(
			queryByText(container, 'Author list is empty')
		).not.toBeInTheDocument();
	});

	it('Delete author button click should delete an author from the course list', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Router history={history}>
						<CourseForm />
					</Router>
				</Provider>,
				container
			);
		});
		const btnAdd = container.querySelector(
			'.authors-container button[data-id]'
		);
		fireEvent.click(btnAdd);
		expect(
			queryByText(container, 'Author list is empty')
		).not.toBeInTheDocument();

		const btnDelete = container.querySelector(
			'.added-authors-container button[data-id]'
		);
		fireEvent.click(btnDelete);
		expect(queryByText(container, 'Author list is empty')).toBeInTheDocument();
	});
});
