import React from 'react';

jest.mock('../../../../../../src/router');

import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Nav from '../../../../../../src/ui/layout/app/_components/Nav';

import router from '../../../../../../src/router';

afterEach(cleanup);

describe('Nav', () => {

	let props = {};

	beforeEach(() => {
		props = {
			allEntries: [
				{
					id: 'nav1',
					label: 'Nav1',
					icon: 'icon1',
					link: '/link1',
				},
				{
					id: 'nav2',
					label: 'Nav2',
					icon: 'icon2',
					link: '/link2',
				},
				{
					id: 'nav3',
					label: 'Nav3',
					icon: 'icon3',
					link: '/link3',
				},
			],
			active: 'nav1',
		};

		router.navigateTo.mockClear();
	});


	describe('render()', () => {
		test('should display all nav entries', () => {
			const { getByText } = render(<Nav
				{...props}
			/>);

			getByText(props.allEntries[0].label);
			getByText(props.allEntries[0].icon);
			getByText(props.allEntries[1].label);
			getByText(props.allEntries[1].icon);
			getByText(props.allEntries[2].label);
			getByText(props.allEntries[2].icon);
		});

		test('should set "mainNavEntry-isActive" class on active Nav', () => {
			const { getByText } = render(<Nav
				{...props}
			/>);

			const active = getByText(props.allEntries[0].label);

			expect(active).toHaveClass('mainNavEntry-isActive');
		});
	});

	describe('onClick()', () => {
		test('should call router.navigateTo() with correct route on click', () => {
			const { getByText } = render(<Nav
				{...props}
			/>);

			const entry1 = getByText(props.allEntries[0].label);
			fireEvent.click(entry1);

			expect(router.navigateTo).toHaveBeenCalledWith(props.allEntries[0].link);

			const entry2 = getByText(props.allEntries[1].label);
			fireEvent.click(entry2);

			expect(router.navigateTo).toHaveBeenCalledWith(props.allEntries[1].link);

			const entry3 = getByText(props.allEntries[2].label);
			fireEvent.click(entry3);

			expect(router.navigateTo).toHaveBeenCalledWith(props.allEntries[2].link);
		});
	});

});
