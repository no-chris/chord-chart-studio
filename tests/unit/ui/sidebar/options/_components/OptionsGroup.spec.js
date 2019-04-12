import React from 'react';

import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import GroupLabel from '../../../../../../src/ui/sideBar/options/_components/OptionsGroup';


afterEach(cleanup);

describe('GroupLabel', () => {

	let props = {};
	let childrenTxt = 'Options are passed as children';
	let children = [<div key={'1'}>{childrenTxt}</div>];

	beforeEach(() => {
		props = {
			isInteractable: true,
			label: 'myLabel',
			icon: 'myIcon',
		};
	});


	describe('render()', () => {
		test('should render texts in props', () => {
			const { getByText } = render(<GroupLabel
				{...props}
			/>);

			getByText(props.label);
			getByText(props.icon);
		});

		test('should NOT render children by default', () => {
			const { queryByText } = render(
				<GroupLabel
					{...props}
				>
					{children}
				</GroupLabel>
			);

			expect(queryByText(childrenTxt)).toBeNull();
		});
	});


	describe('onClick()', () => {
		test('should toggle children on click if isInteractable === true', () => {
			const { getByText, queryByText } = render(
				<GroupLabel
					{...props}
				>
					{children}
				</GroupLabel>
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
				<GroupLabel
					{...props}
					isInteractable={false}
				>
					{children}
				</GroupLabel>
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
				<GroupLabel
					{...props}
					isInteractable={false}
				>
					{[]}
				</GroupLabel>
			);
			const myLabel = getByText(props.label);

			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');

			fireEvent.click(myLabel);

			expect(queryByText(childrenTxt)).toBeNull();
			getByText('unfold_more');
		});
	});

});
