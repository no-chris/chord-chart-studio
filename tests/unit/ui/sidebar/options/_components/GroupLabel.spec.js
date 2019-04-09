import React from 'react';

import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import GroupLabel from '../../../../../../src/ui/sideBar/options/_components/GroupLabel';


afterEach(cleanup);

describe('GroupLabel', () => {

	let props = {};

	beforeEach(() => {
		props = {
			label: 'myLabel',
			icon: 'myIcon',
		};
	});


	describe('render()', () => {
		test('should render texts in props', () => {
			const { getByText, container } = render(<GroupLabel
				{...props}
			/>);

			getByText('myLabel');
			getByText('myIcon');

			expect(container.firstChild).toHaveClass('optionGroupLabel');
		});
	});

});
