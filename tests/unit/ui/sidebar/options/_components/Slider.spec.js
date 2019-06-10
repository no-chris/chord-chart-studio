import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';

import Slider from '../../../../../../src/ui/sideBar/options/_components/Slider';


afterEach(cleanup);

describe('Slider', () => {

	let props = {};
	const setOption = jest.fn();

	beforeEach(() => {
		props = {
			isInteractable: true,
			label: 'myLabel',
			min: -10,
			max: 10,
			showPlusSymbol: true,
			optionContext: 'myContext',
			optionKey: 'myKey',
			optionValue: 8,
			setOption,
		};

		setOption.mockReset();
	});


	describe('showPlusSymbol', () => {
		test('should display "+" symbol if showPlusSymbol === true', () => {
			const { getByText } = render(<Slider
				{...props}
			/>);

			getByText('+8');
		});

		test('should not display "+" symbol if showPlusSymbol === false', () => {
			const { queryByText } = render(<Slider
				{...props}
				showPlusSymbol={false}
			/>);

			expect(queryByText('+8')).toBeNull();
		});
	});

	describe('onChange()', () => {
		test('should not respond to change if option is disabled', () => {
			const { getByDisplayValue } = render(<Slider
				{...props}
				isInteractable={false}
			/>);

			const input = getByDisplayValue('8');

			fireEvent.change(input);

			expect(setOption).not.toHaveBeenCalled();
		});

		test('should setOption to an number-converted value', () => {
			const { getByDisplayValue } = render(<Slider
				{...props}
			/>);

			const input = getByDisplayValue('8');

			fireEvent.change(input, {
				target: {
					value: '-3'
				}
			});

			expect(setOption).toHaveBeenCalledTimes(1);
			expect(setOption).toHaveBeenCalledWith('myContext', 'myKey', -3);
		});
	});

});
