import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import OptionGroup from '../../../../../../src/ui/sideBar/options/_components/OptionsGroup';

afterEach(cleanup);

describe('OptionGroup', () => {
	let props = {};
	let childrenTxt = 'Options are passed as children';
	let children = [<div key={'1'}>{childrenTxt}</div>];

	beforeEach(() => {
		props = {
			isInteractable: true,
			label: 'myLabel',
			icon: 'myIcon',
			isOpened: false,
		};
	});

	describe('render()', () => {
		test('should render texts in props', () => {
			const { getByText } = render(<OptionGroup {...props} />);

			getByText(props.label);
			getByText(props.icon);
		});

		test('should NOT render children by default if isOpened === false', () => {
			const { queryByText } = render(
				<OptionGroup {...props} isOpened={false}>
					{children}
				</OptionGroup>
			);

			expect(queryByText(childrenTxt)).toBeNull();
		});

		test('should render children by default if isOpened === true', () => {
			const { getByText } = render(
				<OptionGroup {...props} isOpened={true}>
					{children}
				</OptionGroup>
			);

			getByText(childrenTxt);
		});
	});

	describe('onClick()', () => {
		test('should toggle children on click if isInteractable === true', () => {
			const { getByText, queryByText } = render(
				<OptionGroup {...props}>{children}</OptionGroup>
			);
			const myLabel = getByText(props.label);

			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');

			fireEvent.click(myLabel);

			getByText(childrenTxt);
			getByText('unfold_less');

			fireEvent.click(myLabel);

			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');
		});

		test('should NOT toggle children on click if isInteractable === false', () => {
			const { getByText, queryByText } = render(
				<OptionGroup {...props} isInteractable={false}>
					{children}
				</OptionGroup>
			);
			const myLabel = getByText(props.label);

			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');

			fireEvent.click(myLabel);

			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');
		});

		test('should NOT be interactable if no children are passed', () => {
			const { getByText, queryByText } = render(
				<OptionGroup {...props} isInteractable={false}>
					{[]}
				</OptionGroup>
			);
			const myLabel = getByText(props.label);

			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');

			fireEvent.click(myLabel);

			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');
		});

		test('should be closed if no children are passed, even if isOpenned === true', () => {
			const { getByText, queryByText } = render(
				<OptionGroup {...props} isOpened={true} />
			);
			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');
		});
	});
});
