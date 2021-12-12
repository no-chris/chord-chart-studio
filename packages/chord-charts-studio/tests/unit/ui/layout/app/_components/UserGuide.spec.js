import React from 'react';

import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import UserGuide from '../../../../../../src/ui/sideBar/_components/UserGuide';

afterEach(cleanup);

describe('Footer', () => {
	test('should open the user guide in a new window', () => {
		const { getByText } = render(<UserGuide />);
		const windowFocus = jest.fn();

		Object.defineProperty(window, 'open', {
			value: () => ({ focus: windowFocus }),
		});

		const btn = getByText('User Guide');

		userEvent.click(btn);

		expect(windowFocus).toHaveBeenCalledTimes(1);
	});
});
