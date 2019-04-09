import React from 'react';

import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Toggle from '../../../../../../src/ui/sideBar/options/_components/Toggle';


afterEach(cleanup);

describe('Toggle', () => {

	let widget;
	let panelEntry;
	const setOption = jest.fn();

	beforeEach(() => {
		widget = {
			label: 'myLabel',
			option: {
				context: 'myContext',
				key: 'myKey'
			}
		};

		panelEntry = {
			isEnabled: true
		};

		setOption.mockReset();
	});


	describe('Toggle state', () => {
		test('Should render "on" state if value === true', () => {
			const { container, getByText } = render(<Toggle
				value={true}
				panelEntry={panelEntry}
				widget={widget}
				setOption={setOption}
			/>);
			getByText(widget.label);
			getByText('toggle_on');

			expect(container.firstChild).toHaveClass('optionToggle-isOn');
		});

		test('Should render "off" state if value === false', () => {
			const { container, getByText } = render(<Toggle
				value={false}
				panelEntry={panelEntry}
				widget={widget}
				setOption={setOption}
			/>);
			getByText(widget.label);
			getByText('toggle_off');

			expect(container.firstChild).toHaveClass('optionToggle-isOff');
		});
	});

	describe('onClick()', () => {
		test('should not respond to click if option is disabled', () => {
			const { container } = render(<Toggle
				value={true}
				panelEntry={{ isEnabled: false }}
				widget={widget}
				setOption={setOption}
			/>);

			fireEvent.click(container.firstChild);

			expect(setOption).not.toHaveBeenCalled();
		});

		test('should setOption to false on click if value === true', () => {
			const { container } = render(<Toggle
				value={true}
				panelEntry={panelEntry}
				widget={widget}
				setOption={setOption}
			/>);

			fireEvent.click(container.firstChild);

			expect(setOption).toHaveBeenCalledTimes(1);
			expect(setOption).toHaveBeenCalledWith('myContext', 'myKey', false);
		});

		test('should setOption to true on click if value === false', () => {
			const { container } = render(<Toggle
				value={false}
				panelEntry={panelEntry}
				widget={widget}
				setOption={setOption}
			/>);

			fireEvent.click(container.firstChild);

			expect(setOption).toHaveBeenCalledTimes(1);
			expect(setOption).toHaveBeenCalledWith('myContext', 'myKey', true);
		});
	});

});
