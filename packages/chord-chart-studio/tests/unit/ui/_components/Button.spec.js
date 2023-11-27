import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from '../../../../src/ui/_components/Button';

afterEach(cleanup);

describe('Button', () => {
	const buttonLabel = 'myCoolButton';
	const onClick = jest.fn();

	const props = {
		onClick,
		buttonName: 'myButton',
		type: 'unknown',
	};

	beforeEach(() => {
		onClick.mockClear();
	});

	test('Should render button with proper classes', () => {
		const rtl = render(<Button {...props}>{buttonLabel}</Button>);
		const button = rtl.getByText(buttonLabel);

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('Button');
		expect(button).not.toHaveClass(
			'Button-isDisabled',
			'Button-primary',
			'Button-secondary'
		);
	});

	test('Should call the onClick handler', () => {
		const rtl = render(<Button {...props}>{buttonLabel}</Button>);
		const button = rtl.getByText(buttonLabel);

		expect(button).toBeInTheDocument();

		button.click();
		button.click();
		button.click();

		expect(onClick).toHaveBeenCalledTimes(3);
	});

	test('Should not allow clicking a disabled button', () => {
		const rtl = render(
			<Button {...props} isDisabled={true}>
				{buttonLabel}
			</Button>
		);
		const button = rtl.getByText(buttonLabel);

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('Button-isDisabled');

		button.click();
		button.click();
		button.click();

		expect(onClick).toHaveBeenCalledTimes(0);
	});

	test('Should render a primary button', () => {
		const rtl = render(
			<Button {...props} type={'primary'}>
				{buttonLabel}
			</Button>
		);
		const button = rtl.getByText(buttonLabel);

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('Button-primary');
		expect(button).not.toHaveClass('Button-secondary');
	});

	test('Should render a secondary button', () => {
		const rtl = render(
			<Button {...props} type={'secondary'}>
				{buttonLabel}
			</Button>
		);
		const button = rtl.getByText(buttonLabel);

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('Button-secondary');
		expect(button).not.toHaveClass('Button-primary');
	});
});
