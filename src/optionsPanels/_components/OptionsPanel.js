import React from 'react';
import PropTypes from 'prop-types';

function OptionsPanel(props) {
	const {
		id,
		panelLayout,
		widgetsInitialState,
		setOption,
		getEntryComponent,
	} = props;

	const classNames = [
		'optionsPanel',
		'optionsPanel-' + id
	];

	let widget;
	let groupWidget;

	let WidgetComponent;
	let GroupComponent;

	const renderedWidgets = panelLayout.widgetsOrder.map(widgetId => {
		widget = panelLayout.allWidgets[widgetId];

		if (widget.type === 'optionsGroup') {
			const renderedGroupWidgets = widget.groupWidgetsOrder.map(groupWidgetId => {
				groupWidget = widget.allGroupWidgets[groupWidgetId];

				return renderWidget(
					groupWidgetId,
					groupWidget,
					widgetsInitialState[groupWidgetId]
				);
			});

			GroupComponent = getEntryComponent(widget.type);

			return (
				<GroupComponent
					key={widgetId}
					isInteractable={widgetsInitialState[widgetId].isInteractable}
					label={widget.label}
					icon={widget.icon}
				>
					{renderedGroupWidgets}
				</GroupComponent>
			);

		} else {
			return renderWidget(
				widgetId,
				widget,
				widgetsInitialState[widgetId]
			);
		}

	});



	function renderWidget(widgetId, localWidget, state) {
		WidgetComponent = getEntryComponent(localWidget.type);

		return (
			<WidgetComponent
				key={widgetId}
				isInteractable={state.isInteractable}
				isVisible={state.isVisible}
				isCollapsed={state.isCollapsed}

				optionContext={localWidget.option.context}
				optionKey={localWidget.option.key}
				optionValue={props[localWidget.option.key]}
				setOption={setOption}

				label={localWidget.label}
				{...localWidget.typeOption}
			/>
		);
	}

	return (
		<div className={classNames.join(' ')}>
			{renderedWidgets}
		</div>
	);
}

//OptionsPanel.propTypes = {
	// id: PropTypes.string.isRequired,
	// allWidgets: PropTypes.objectOf(
	// 	PropTypes.object
	// ).isRequired,
	// allPanelEntries: PropTypes.object.isRequired,
	// setOption: PropTypes.func.isRequired,
	// // The function that maps a component with its Id in the widget declaration
	// getEntryComponent: PropTypes.func.isRequired,
//};

export default OptionsPanel;
