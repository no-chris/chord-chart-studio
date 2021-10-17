import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../../../../../../src/ui/layout/app/_components/App';

afterEach(cleanup);

describe('App', () => {
	let props = {};
	const toggleLeftBar = jest.fn();
	const toggleRightBar = jest.fn();
	const setEditorMode = jest.fn();
	const closeModal = jest.fn();

	beforeEach(() => {
		props = {
			isLeftBarCollapsed: false,
			isRightBarCollapsed: false,
			editorMode: 'edit',
			toggleLeftBar,
			toggleRightBar,
			setEditorMode,
			closeModal,

			leftBar: <div>leftBarDiv</div>,
			rightBar: <div>rightBarDiv</div>,
			activeRoute: 'play',
			activeModal: 'none',
		};

		toggleLeftBar.mockClear();
		toggleRightBar.mockClear();
	});

	test('should render components passed as props', () => {
		const { getByText } = render(<App {...props} />);

		getByText('leftBarDiv');
		getByText('rightBarDiv');
	});

	test('should open left bar if closed by clicking on left bar', () => {
		const { getByText } = render(
			<App {...props} isLeftBarCollapsed={true} />
		);

		const leftBar = getByText('leftBarDiv');

		fireEvent.click(leftBar);

		expect(toggleLeftBar).toHaveBeenCalledTimes(1);
	});

	test('should close left bar if open by clicking on left bar collapser', () => {
		const { getByTestId } = render(
			<App {...props} isLeftBarCollapsed={false} />
		);

		const leftBarCollapser = getByTestId('leftBar-collapser');

		fireEvent.click(leftBarCollapser);

		expect(toggleLeftBar).toHaveBeenCalledTimes(1);
	});

	test('should open right bar if closed by clicking on right bar', () => {
		const { getByText } = render(
			<App {...props} isRightBarCollapsed={true} />
		);

		const rightBar = getByText('rightBarDiv');

		fireEvent.click(rightBar);

		expect(toggleRightBar).toHaveBeenCalledTimes(1);
	});

	test('should close right bar if open by clicking on right bar collapser', () => {
		const { getByTestId } = render(
			<App {...props} isRightBarCollapsed={false} />
		);

		const rightBarCollapser = getByTestId('rightBar-collapser');

		fireEvent.click(rightBarCollapser);

		expect(toggleRightBar).toHaveBeenCalledTimes(1);
	});

	test('should openModal if active modal is different than "none"', () => {
		const { getByTestId } = render(<App
			{...props}
			activeModal={'myModal'}
		/>);

		const modal = getByTestId('modal-overlay');
		
		expect(modal).toBeInstanceOf(Element);
		expect(modal).toBeInTheDocument();
	});

});
