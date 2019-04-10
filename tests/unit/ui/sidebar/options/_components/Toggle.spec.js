import React from 'react';

import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Toggle from '../../../../../../src/ui/sideBar/options/_components/Toggle';


afterEach(cleanup);

describe('Toggle', () => {

	let props;
	const setOption = jest.fn();

	beforeEach(() => {
		props = {
			isEnabled: true,
			label: 'myLabel',
			optionContext: 'myContext',
			optionKey: 'myKey',
			optionValue: true,
			setOption,
		};

		setOption.mockReset();
	});


	describe('Toggle state', () => {
		test('Should render "on" state if value === true', () => {
			const { container, getByText } = render(<Toggle
				{...props}
			/>);
			getByText(props.label);
			getByText('toggle_on');

			expect(container.firstChild).toHaveClass('sb-optionToggle-isOn');
		});

		test('Should render "off" state if value === false', () => {
			const { container, getByText } = render(<Toggle
				{...props}
				optionValue={false}
			/>);
			getByText(props.label);
			getByText('toggle_off');

			expect(container.firstChild).toHaveClass('sb-optionToggle-isOff');
		});
	});

	describe('onClick()', () => {
		test('should not respond to click if option is disabled', () => {
			const { container } = render(<Toggle
				{...props}
				isEnabled={false}
			/>);

			fireEvent.click(container.firstChild);

			expect(setOption).not.toHaveBeenCalled();
		});

		test('should setOption to false on click if value === true', () => {
			const { container } = render(<Toggle
				{...props}
			/>);

			fireEvent.click(container.firstChild);

			expect(setOption).toHaveBeenCalledTimes(1);
			expect(setOption).toHaveBeenCalledWith('myContext', 'myKey', false);
		});

		test('should setOption to true on click if value === false', () => {
			const { container } = render(<Toggle
				{...props}
				optionValue={false}
			/>);

			fireEvent.click(container.firstChild);

			expect(setOption).toHaveBeenCalledTimes(1);
			expect(setOption).toHaveBeenCalledWith('myContext', 'myKey', true);
		});
	});

});
