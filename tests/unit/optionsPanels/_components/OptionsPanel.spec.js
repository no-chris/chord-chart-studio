import _ from 'lodash';
import React from 'react';
import renderer from 'react-test-renderer';

import OptionsPanel from '../../../../src/optionsPanels/_components/OptionsPanel';

describe('OptionsPanel', () => {

	const allWidgets = {
		widgetsOrder: ['widget1', 'widget2', 'optionsGroup1'],
		allWidgets: {
			// a top-level widget
			widget1: {
				type: 'mockWidget',
				typeOptions: {
					should: 'be',
					forwarded: 'to',
					widget: 'component'
				},
				label: 'topLevelWidget1',
				option: {
					context: 'topLevelWidget1Context',
					key: 'topLevelWidget1Key',
				}
			},

			// another top-level widget, no type options
			widget2: {
				type: 'mockWidget',
				label: 'topLevelWidget2',
				option: {
					context: 'topLevelWidget2Context',
					key: 'topLevelWidget2Key',
				}
			},

			// grouped widgets
			optionsGroup1: {
				type: 'optionsGroup',
				label: 'optionsGroup1',
				icon: 'optionsGroup1Icon',

				groupWidgetsOrder: ['group1Widget1', 'group1Widget2'],
				allGroupWidgets: {
					group1Widget1: {
						type: 'mockWidget',
						typeOptions: {
							should: 'be',
							forwarded: 'to',
							widget: 'component'
						},
						label: 'group1Widget1',
						option: {
							context: 'group1Widget1Context',
							key: 'group1Widget1Key',
						}
					},
					group1Widget2: {
						type: 'mockWidget',
						label: 'group1Widget2',
						option: {
							context: 'group1Widget2Context',
							key: 'group1Widget2Key',
						}
					}
				}
			}
		}
	};

	function MockWidget(props) {
		return (
			<div>
				{props.label}
			</div>
		);
	}

	function MockOptionGroup(props) {
		return (
			<div>
				<div>{props.children}</div>
			</div>
		);
	}

	let props;
	const setOption = jest.fn();

	beforeEach(() => {
		props = {
			id: 'panelId',
			allWidgets: _.cloneDeep(allWidgets),
			nonInteractableWidgets: [],
			hiddenWidgets: [],
			setOption,
			getEntryComponent: (widgetId) => (widgetId === 'optionsGroup') ? MockOptionGroup : MockWidget,
		};
		setOption.mockClear();
	});


	describe('Option panel id', () => {
		test('should set a class on the root component with the given id', () => {
			const component = renderer.create(
				<OptionsPanel
					{...props}
				/>,
			);

			const optionPanel = component.toJSON();

			expect(optionPanel.props.className).toContain('optionsPanel-panelId');
		});
	});


	describe('Widgets API', () => {
		test('Should forward correct props to widgets components', () => {
			const component = renderer.create(
				<OptionsPanel
					{...props}
					// those values are given by mapStateToProps in the OptionsPanel container
					topLevelWidget1Key={'topLevelWidget1Value'}
					topLevelWidget2Key={'topLevelWidget2Value'}
					group1Widget1Key={'group1Widget1Value'}
					group1Widget2Key={'group1Widget2Value'}
				/>,
			);

			const allRenderedWidgets = component.root.findAllByType(MockWidget);

			expect(allRenderedWidgets.length).toBe(4);

			expect(allRenderedWidgets[0].props.isInteractable).toBe(true);
			expect(allRenderedWidgets[0].props.optionContext).toBe('topLevelWidget1Context');
			expect(allRenderedWidgets[0].props.optionKey).toBe('topLevelWidget1Key');
			expect(allRenderedWidgets[0].props.optionValue).toBe('topLevelWidget1Value');
			expect(allRenderedWidgets[0].props.setOption).toBe(setOption);
			expect(allRenderedWidgets[0].props.label).toBe('topLevelWidget1');
			expect(allRenderedWidgets[0].props.should).toBe('be');
			expect(allRenderedWidgets[0].props.forwarded).toBe('to');
			expect(allRenderedWidgets[0].props.widget).toBe('component');

			expect(allRenderedWidgets[1].props.isInteractable).toBe(true);
			expect(allRenderedWidgets[1].props.optionContext).toBe('topLevelWidget2Context');
			expect(allRenderedWidgets[1].props.optionKey).toBe('topLevelWidget2Key');
			expect(allRenderedWidgets[1].props.optionValue).toBe('topLevelWidget2Value');
			expect(allRenderedWidgets[1].props.setOption).toBe(setOption);
			expect(allRenderedWidgets[1].props.label).toBe('topLevelWidget2');

			expect(allRenderedWidgets[2].props.isInteractable).toBe(true);
			expect(allRenderedWidgets[2].props.optionContext).toBe('group1Widget1Context');
			expect(allRenderedWidgets[2].props.optionKey).toBe('group1Widget1Key');
			expect(allRenderedWidgets[2].props.optionValue).toBe('group1Widget1Value');
			expect(allRenderedWidgets[2].props.setOption).toBe(setOption);
			expect(allRenderedWidgets[2].props.label).toBe('group1Widget1');
			expect(allRenderedWidgets[2].props.should).toBe('be');
			expect(allRenderedWidgets[2].props.forwarded).toBe('to');
			expect(allRenderedWidgets[2].props.widget).toBe('component');

			expect(allRenderedWidgets[3].props.isInteractable).toBe(true);
			expect(allRenderedWidgets[3].props.optionContext).toBe('group1Widget2Context');
			expect(allRenderedWidgets[3].props.optionKey).toBe('group1Widget2Key');
			expect(allRenderedWidgets[3].props.optionValue).toBe('group1Widget2Value');
			expect(allRenderedWidgets[3].props.setOption).toBe(setOption);
			expect(allRenderedWidgets[3].props.label).toBe('group1Widget2');
		});

		test('Should forward correct props to OptionGroup component', () => {
			const component = renderer.create(
				<OptionsPanel
					{...props}
				/>,
			);

			const optionGroup = component.root.findByType(MockOptionGroup);

			expect(optionGroup.props.isInteractable).toBe(true);
			expect(optionGroup.props.label).toBe('optionsGroup1');
			expect(optionGroup.props.icon).toBe('optionsGroup1Icon');
		});
	});


	describe('Widgets visibility', () => {
		test('Should not render hidden widgets', () => {
			const component = renderer.create(
				<OptionsPanel
					{...props}
					hiddenWidgets={['widget1', 'group1Widget2']}
				/>,
			);

			const allRenderedWidgets = component.root.findAllByType(MockWidget);

			expect(allRenderedWidgets.length).toBe(2);

			expect(allRenderedWidgets[0].props.label).toBe('topLevelWidget2');
			expect(allRenderedWidgets[1].props.label).toBe('group1Widget1');
		});
	});


	describe('Widgets interactability', () => {
		test('Should forward correct isInteractable state to widgets', () => {
			const component = renderer.create(
				<OptionsPanel
					{...props}
					nonInteractableWidgets={['widget1', 'group1Widget2']}
				/>,
			);

			const allRenderedWidgets = component.root.findAllByType(MockWidget);

			expect(allRenderedWidgets[0].props.isInteractable).toBe(false);
			expect(allRenderedWidgets[1].props.isInteractable).toBe(true);
			expect(allRenderedWidgets[2].props.isInteractable).toBe(true);
			expect(allRenderedWidgets[3].props.isInteractable).toBe(false);

			const optionGroup = component.root.findByType(MockOptionGroup);

			expect(optionGroup.props.isInteractable).toBe(true);
		});

		test('Should set isInteractable === false to all options under a non-interactable group', () => {
			const component = renderer.create(
				<OptionsPanel
					{...props}
					nonInteractableWidgets={['optionsGroup1']}
				/>,
			);

			const allRenderedWidgets = component.root.findAllByType(MockWidget);

			expect(allRenderedWidgets[0].props.isInteractable).toBe(true);
			expect(allRenderedWidgets[1].props.isInteractable).toBe(true);
			expect(allRenderedWidgets[2].props.isInteractable).toBe(false);
			expect(allRenderedWidgets[3].props.isInteractable).toBe(false);

			const optionGroup = component.root.findByType(MockOptionGroup);

			expect(optionGroup.props.isInteractable).toBe(false);
		});
	});
});
