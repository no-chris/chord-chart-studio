import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';

import Select from '../../../../../../src/ui/sideBar/options/_components/Select';


afterEach(cleanup);

describe('Select', () => {

	let props = {};
	const setOption = jest.fn();

	beforeEach(() => {
		props = {
			isInteractable: true,
			label: 'myLabel',
			allChoices: [
				{ label: 'myChoice1', value: 'choice1' },
				{ label: 'myChoice2', value: 'choice2' },
				{ label: 'myChoice3', value: 'choice3' },
			],
			optionContext: 'myContext',
			optionKey: 'myKey',
			optionValue: 'choice1',
			setOption,
		};

		setOption.mockReset();
	});


	describe('Toggle choice list', () => {
		test('should not respond to click if option is disabled', () => {
			const { getByText, queryByText } = render(<Select
				{...props}
				isInteractable={false}
			/>);

			const selectTitle = getByText(props.label);

			fireEvent.click(selectTitle);

			expect(queryByText(props.allChoices[0].label)).toBeNull();
			expect(queryByText(props.allChoices[1].label)).toBeNull();
			expect(queryByText(props.allChoices[2].label)).toBeNull();
			expect(queryByText('keyboard_arrow_down')).toBeNull();

			fireEvent.click(selectTitle);

			expect(queryByText(props.allChoices[0].label)).toBeNull();
			expect(queryByText(props.allChoices[1].label)).toBeNull();
			expect(queryByText(props.allChoices[2].label)).toBeNull();
			expect(queryByText('keyboard_arrow_down')).toBeNull();
		});

		test('should toggle choices display on click', async () => {
			const { getByText, queryByText } = render(<Select
				{...props}
			/>);

			expect(queryByText(props.allChoices[0].label)).toBeNull();
			expect(queryByText(props.allChoices[1].label)).toBeNull();
			expect(queryByText(props.allChoices[2].label)).toBeNull();
			expect(queryByText('keyboard_arrow_down')).toBeNull();
			getByText('keyboard_arrow_right');

			const selectTitle = getByText(props.label);

			fireEvent.click(selectTitle);

			getByText(props.allChoices[0].label);
			getByText(props.allChoices[1].label);
			getByText(props.allChoices[2].label);
			getByText('keyboard_arrow_down');
			expect(queryByText('keyboard_arrow_right')).toBeNull();

			fireEvent.click(selectTitle);

			expect(queryByText(props.allChoices[0].label)).toBeNull();
			expect(queryByText(props.allChoices[1].label)).toBeNull();
			expect(queryByText(props.allChoices[2].label)).toBeNull();
			expect(queryByText('keyboard_arrow_down')).toBeNull();
			getByText('keyboard_arrow_right');
		});
	});


	describe('Select choice', () => {
		test('should setOption to clicked choice', () => {
			const { getByText } = render(<Select
				{...props}
			/>);

			const selectTitle = getByText(props.label);
			fireEvent.click(selectTitle);

			const choice1 = getByText(props.allChoices[0].label);
			fireEvent.click(choice1);

			expect(setOption).toHaveBeenCalledWith(
				props.optionContext,
				props.optionKey,
				props.allChoices[0].value
			);

			const choice2 = getByText(props.allChoices[1].label);
			fireEvent.click(choice2);

			expect(setOption).toHaveBeenCalledWith(
				props.optionContext,
				props.optionKey,
				props.allChoices[1].value
			);

			const choice3 = getByText(props.allChoices[2].label);
			fireEvent.click(choice3);

			expect(setOption).toHaveBeenCalledWith(
				props.optionContext,
				props.optionKey,
				props.allChoices[2].value
			);
		});

	});

});
