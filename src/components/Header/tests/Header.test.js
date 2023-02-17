import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Header } from '../Header';
import { Provider } from 'react-redux';
import { getByText } from '@testing-library/react';
import { mockedState, mockedStore } from '../../../store/mocks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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

describe('Header', () => {
	const history = createMemoryHistory();
	it('Header has logo', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Router history={history}>
						<Header />
					</Router>
				</Provider>,
				container
			);
		});
		expect(container.querySelector('[alt="logo"]')).toBeInTheDocument();
	});

	it('Header has name', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<Router history={history}>
						<Header showUserLogin={true} />
					</Router>
				</Provider>,
				container
			);
		});
		expect(getByText(container, mockedState.user.name)).toBeInTheDocument();
	});
});
