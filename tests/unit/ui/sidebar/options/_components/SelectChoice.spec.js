import React from 'react';

import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import SelectChoice from '../../../../../../src/ui/sideBar/options/_components/SelectChoice';


afterEach(cleanup);

describe('SelectChoice', () => {

	let props = {};
	const onClick = jest.fn();

	beforeEach(() => {
		props = {
			isActive: true,
			label: 'myLabel',
			onClick,
		};

		onClick.mockReset();
	});


	describe('Active choice', () => {
		test('Should add the "active" class if isActive === true', () => {
			const { container } = render(<SelectChoice
				{...props}
			/>);

			expect(container.firstChild).toHaveClass('optionSelectChoice-isActive');
		});

		test('Should not add the "active" class if isActive === false', () => {
			const { container } = render(<SelectChoice
				{...props}
				isActive={false}
			/>);

			expect(container.firstChild).not.toHaveClass('optionSelectChoice-isActive');
		});
	});

});
