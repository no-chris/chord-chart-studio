import React from 'react';

import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Footer from '../../../../../../src/ui/layout/app/_components/Footer';


afterEach(cleanup);

describe('Footer', () => {

	test('should render with the "appFooter" class', () => {
		const { container } = render(<Footer />);

		expect(container.firstChild).toHaveClass('appFooter');
	});

});
