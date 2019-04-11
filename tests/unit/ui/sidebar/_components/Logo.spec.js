import React from 'react';

import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Logo from '../../../../../src/ui/sideBar/_components/Logo';


afterEach(cleanup);

describe('Logo', () => {

	test('should render with the "logo" class', () => {
		const { container } = render(<Logo />);

		expect(container.firstChild).toHaveClass('logo');
	});

});