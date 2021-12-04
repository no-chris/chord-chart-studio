import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SelectChoice from '../../../../../../src/ui/sideBar/options/_components/SelectChoice';

afterEach(cleanup);

describe('SelectChoice', () => {
	let props = {};
	const onClick = jest.fn();

	beforeEach(() => {
		props = {
			isSelected: true,
			isInteractable: true,
			label: 'myLabel',
			onClick,
		};

		onClick.mockReset();
	});

	describe('Active choice', () => {
		test('Should add the "isSelected" class if isSelected === true', () => {
			const { container } = render(<SelectChoice {...props} />);

			expect(container.firstChild).toHaveClass(
				'sb-optionSelectChoice-isSelected'
			);
		});

		test('Should not add the "isSelected" class if isSelected === false', () => {
			const { container } = render(
				<SelectChoice {...props} isSelected={false} />
			);

			expect(container.firstChild).not.toHaveClass(
				'sb-optionSelectChoice-isSelected'
			);
		});
	});

	describe('Interactable', () => {
		test('Should call the onClick handler if clicked when interactable', () => {
			const { getByText } = render(<SelectChoice {...props} />);

			const choice = getByText('myLabel');

			choice.click();

			expect(onClick).toHaveBeenCalledTimes(1);
		});

		test('Should NOT call the onClick handler if clicked when not interactable', () => {
			const { getByText } = render(
				<SelectChoice {...props} isInteractable={false} />
			);

			const choice = getByText('myLabel');

			choice.click();

			expect(onClick).toHaveBeenCalledTimes(0);
		});

		test('Should NOT add "isNotInteractable" class if isInteractable === true', () => {
			const { container } = render(<SelectChoice {...props} />);

			expect(container.firstChild).not.toHaveClass(
				'sb-optionSelectChoice-isNotInteractable'
			);
		});

		test('Should add "isNotInteractable" class if isInteractable === false', () => {
			const { container } = render(
				<SelectChoice {...props} isInteractable={false} />
			);

			expect(container.firstChild).toHaveClass(
				'sb-optionSelectChoice-isNotInteractable'
			);
		});
	});
});
