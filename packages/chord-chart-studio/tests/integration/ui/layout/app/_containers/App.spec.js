import React from 'react';
import { withStore, getState, resetStore } from '../../../../helpers/withStore';

import { render, cleanup, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../../../../../../src/ui/layout/app/_containers/App';
import {
	isLeftBarCollapsed,
	isRightBarCollapsed,
} from '../../../../../../src/ui/layout/app/reducers';

afterEach(cleanup);

describe('AppLayout', () => {
	let props;

	beforeEach(() => {
		props = {
			leftBar: <div>leftBar</div>,
			rightBar: <div>rightBar</div>,
			editorMode: 'edit',
		};

		resetStore();
	});

	describe('Sidebars', () => {
		test('Toggle leftBar', () => {
			const { getByTestId, getByText } = render(
				withStore(<App {...props} />)
			);

			expect(isLeftBarCollapsed(getState())).toBe(false);

			// Collapse leftBar
			const leftBarCollapser = getByTestId('leftBar-collapser');
			act(() => {
				fireEvent.click(leftBarCollapser);
			});

			expect(isLeftBarCollapsed(getState())).toBe(true);

			// Now open it
			const leftBar = getByText('leftBar');
			act(() => {
				fireEvent.click(leftBar);
			});

			expect(isLeftBarCollapsed(getState())).toBe(false);
		});

		test('Toggle rightBar', () => {
			const { getByTestId, getByText } = render(
				withStore(<App {...props} />)
			);

			expect(isRightBarCollapsed(getState())).toBe(false);

			// Collapse leftBar
			const rightBarCollapser = getByTestId('rightBar-collapser');
			act(() => {
				fireEvent.click(rightBarCollapser);
			});

			expect(isRightBarCollapsed(getState())).toBe(true);

			// Now open it
			const leftBar = getByText('rightBar');
			act(() => {
				fireEvent.click(leftBar);
			});

			expect(isRightBarCollapsed(getState())).toBe(false);
		});
	});
});
