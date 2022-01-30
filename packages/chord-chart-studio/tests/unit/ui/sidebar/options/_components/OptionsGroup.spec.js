import React from 'react';

import { render, cleanup } from '@testing-library/react';
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
		};
	});

	describe('render()', () => {
		test('should render texts in props', () => {
			const { getByText } = render(<OptionGroup {...props} />);

			getByText(props.label);
			getByText(props.icon);
		});

		test('should render children ', () => {
			const { getByText } = render(
				<OptionGroup {...props}>{children}</OptionGroup>
			);

			getByText(childrenTxt);
		});
	});
});
