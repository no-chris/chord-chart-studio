import React from 'react';

import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import SelectChoice from '../../../../../../src/ui/sideBar/options/_components/SelectChoice';


afterEach(cleanup);

describe('SelectChoice', () => {

	let props = {};
	const onClick = jest.fn();

	beforeEach(() => {
		props = {
			isSelected: true,
			label: 'myLabel',
			onClick,
		};

		onClick.mockReset();
	});


	describe('Active choice', () => {
		test('Should add the "isSelected" class if isSelected === true', () => {
			const { container } = render(<SelectChoice
				{...props}
			/>);

			expect(container.firstChild).toHaveClass('sb-optionSelectChoice-isSelected');
		});

		test('Should not add the "isSelected" class if isSelected === false', () => {
			const { container } = render(<SelectChoice
				{...props}
				isSelected={false}
			/>);

			expect(container.firstChild).not.toHaveClass('sb-optionSelectChoice-isSelected');
		});
	});

});
