jest.mock('../../src/state/store');

import React from 'react';

import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

import renderController from '../../src/renderController';
import { getStore } from '../../src/state/store';

beforeEach(getStore.mockClear);

describe('renderController', () => {
	test('Module', () => {
		expect(renderController).toBeInstanceOf(Function);
	});

	const controller = () => {
		return <div className={'rendererController'}>myController</div>;
	};

	test('Should render component given as an parameter', () => {
		const mockStore = {
			getState: jest.fn(),
			subscribe: jest.fn(),
			dispatch: jest.fn(),
		};
		mockStore.getState.mockReturnValue({ foo: 'bar' });
		getStore.mockReturnValue(mockStore);

		const container = document.createElement('div');
		container.id = 'app';
		document.body.appendChild(container);

		act(() => {
			renderController(controller);
		});

		const rendered = document.querySelector('.rendererController');
		expect(rendered).toBeInstanceOf(Element);
	});
});
