import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Nav from '../../../../../../src/ui/layout/app/_components/Nav';

afterEach(cleanup);

describe('Nav', () => {
	let props = {};
	const setEditorMode = jest.fn();

	beforeEach(() => {
		props = {
			allEntries: [
				{
					id: 'nav1',
					label: 'Nav1',
					icon: 'icon1',
					editorMode: 'mode1',
				},
				{
					id: 'nav2',
					label: 'Nav2',
					icon: 'icon2',
					editorMode: 'mode2',
				},
				{
					id: 'nav3',
					label: 'Nav3',
					icon: 'icon3',
					editorMode: 'mode3',
				},
			],
			currentMode: 'mode1',
			selectedId: 'fileId',
			setEditorMode,
		};
		setEditorMode.mockClear();
	});

	describe('render()', () => {
		test('should display all nav entries', () => {
			const { getByText } = render(<Nav {...props} />);

			getByText(props.allEntries[0].label);
			getByText(props.allEntries[0].icon);
			getByText(props.allEntries[1].label);
			getByText(props.allEntries[1].icon);
			getByText(props.allEntries[2].label);
			getByText(props.allEntries[2].icon);
		});

		test('should set "mainNavEntry-isActive" class on active Nav', () => {
			const { getByText } = render(<Nav {...props} />);

			const active = getByText(props.allEntries[0].label);

			expect(active).toHaveClass('mainNavEntry-isActive');
		});
	});

	describe('onClick()', () => {
		test('should call router.navigateTo() with correct route on click', () => {
			const { getByText } = render(<Nav {...props} />);

			const entry1 = getByText(props.allEntries[0].label);
			fireEvent.click(entry1);

			expect(setEditorMode).toHaveBeenCalledWith(
				props.allEntries[0].editorMode
			);

			const entry2 = getByText(props.allEntries[1].label);
			fireEvent.click(entry2);

			expect(setEditorMode).toHaveBeenCalledWith(
				props.allEntries[1].editorMode
			);

			const entry3 = getByText(props.allEntries[2].label);
			fireEvent.click(entry3);

			expect(setEditorMode).toHaveBeenCalledWith(
				props.allEntries[2].editorMode
			);
		});

		test('should not do anything if nav entries are disabled because no file is selected', () => {
			const { getByText } = render(<Nav {...props} selectedId={''} />);

			const entry1 = getByText(props.allEntries[0].label);
			fireEvent.click(entry1);

			expect(setEditorMode).not.toHaveBeenCalled();

			const entry2 = getByText(props.allEntries[1].label);
			fireEvent.click(entry2);

			expect(setEditorMode).not.toHaveBeenCalled();

			const entry3 = getByText(props.allEntries[2].label);
			fireEvent.click(entry3);

			expect(setEditorMode).not.toHaveBeenCalled();
		});
	});
});
