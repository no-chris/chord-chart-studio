import React from 'react';
import { withStore, getState, resetStore } from '../../../../helpers/withStore';

import { render, cleanup, fireEvent, act } from 'react-testing-library';
import 'jest-dom/extend-expect';

import App from '../../../../../../src/ui/layout/app/_containers/App';
import * as appLayoutSelectors from '../../../../../../src/ui/layout/app/_state/selectors';

afterEach(cleanup);

describe('AppLayout', () => {
	let props;

	beforeEach(() => {
		props = {
			leftBar: <div>leftBar</div>,
			rightBar: <div>rightBar</div>,
			isRightBarCollapsed: false,
			isLeftBarCollapsed: false,
			editorMode: 'edit'
		};

		resetStore();
	});

	describe('Sidebars', () => {
		test('Toggle leftBar', () => {
			const { getByTestId, getByText } = render(withStore(
				<App {...props} />
			));

			let isLeftBarCollapsed = appLayoutSelectors.isLeftBarCollapsed(getState());
			expect(isLeftBarCollapsed).toBe(false);

			// Collapse leftBar
			const leftBarCollapser = getByTestId('leftBar-collapser');
			act(() => {
				fireEvent.click(leftBarCollapser);
			});

			isLeftBarCollapsed = appLayoutSelectors.isLeftBarCollapsed(getState());
			expect(isLeftBarCollapsed).toBe(true);

			// Now open it
			const leftBar = getByText('leftBar');
			act(() => {
				fireEvent.click(leftBar);
			});

			isLeftBarCollapsed = appLayoutSelectors.isLeftBarCollapsed(getState());
			expect(isLeftBarCollapsed).toBe(false);
		});

		test('Toggle rightBar', () => {
			const { getByTestId, getByText } = render(withStore(
				<App {...props} />
			));

			let isRightBarCollapsed = appLayoutSelectors.isRightBarCollapsed(getState());
			expect(isRightBarCollapsed).toBe(false);

			// Collapse leftBar
			const rightBarCollapser = getByTestId('rightBar-collapser');
			act(() => {
				fireEvent.click(rightBarCollapser);
			});

			isRightBarCollapsed = appLayoutSelectors.isRightBarCollapsed(getState());
			expect(isRightBarCollapsed).toBe(true);

			// Now open it
			const leftBar = getByText('rightBar');
			act(() => {
				fireEvent.click(leftBar);
			});

			isRightBarCollapsed = appLayoutSelectors.isRightBarCollapsed(getState());
			expect(isRightBarCollapsed).toBe(false);
		});
	});
});
