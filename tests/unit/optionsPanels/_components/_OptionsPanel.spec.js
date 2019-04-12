import React from 'react';

import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import OptionsPanel from '../../../../src/optionsPanels/_components/OptionsPanel';

afterEach(cleanup);

describe('OptionsPanel', () => {

	let props;
	const setOption = jest.fn();
	const getEntryComponent = jest.fn();

	beforeEach(() => ({
		id: 'panelId',
		allWidgets: {},
		allPanelEntries: {},
		setOption,
		getEntryComponent,
	}));



	describe('xxx', () => {
		test('xxx', () => {
			/*
			const { getByText } = render(<OptionsPanel
				{...props}
			/>);
			*/
			//expect(icon).toHaveClass('icon', 'material-icons');
		});
	});
});
