import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Icon from '../../../../src/ui/_components/Icon';

afterEach(cleanup);

describe('Icon', () => {
	test('Should render element with correct classes', () => {
		const rtl = render(<Icon iconName={'create'} />);
		const icon = rtl.getByText('create');

		expect(icon).toHaveClass('icon', 'material-icons');
	});
});
