import React from 'react';
import PropTypes from 'prop-types';

function OptionsPanel(props) {
	const {
		id,
		allWidgets,
		nonInteractableWidgets,
		hiddenWidgets,
		setOption,
		getEntryComponent,
	} = props;

	const classNames = ['optionsPanel', 'optionsPanel-' + id];

	let widget, groupWidget;

	let WidgetComponent, GroupComponent;
	let isGroupInteractable, isGroupWidgetInteractable;

	let renderedGroupWidgets;

	const renderedWidgets = allWidgets.widgetsOrder
		.filter((widgetId) => {
			return !hiddenWidgets.includes(widgetId);
		})
		.map((widgetId) => {
			widget = allWidgets.allWidgets[widgetId];

			if (widget.type === 'optionsGroup') {
				renderedGroupWidgets = widget.groupWidgetsOrder
					.filter((groupWidgetId) => {
						return !hiddenWidgets.includes(groupWidgetId);
					})
					.map((groupWidgetId) => {
						groupWidget = widget.allGroupWidgets[groupWidgetId];

						isGroupWidgetInteractable =
							!nonInteractableWidgets.includes(widgetId) &&
							!nonInteractableWidgets.includes(groupWidgetId);

						return renderWidget(
							groupWidgetId,
							groupWidget,
							isGroupWidgetInteractable
						);
					});

				if (renderedGroupWidgets.length === 0) {
					return null;
				}

				GroupComponent = getEntryComponent(widget.type);
				isGroupInteractable =
					!nonInteractableWidgets.includes(widgetId);

				return (
					<GroupComponent
						key={widgetId}
						isInteractable={isGroupInteractable}
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
					!nonInteractableWidgets.includes(widgetId)
				);
			}
		});

	function renderWidget(widgetId, localWidget, isInteractable) {
		WidgetComponent = getEntryComponent(localWidget.type);

		return (
			<WidgetComponent
				key={widgetId}
				isInteractable={isInteractable}
				optionContext={localWidget.option.context}
				optionKey={localWidget.option.key}
				optionValue={props[localWidget.option.key]}
				setOption={setOption}
				label={localWidget.label}
				{...localWidget.typeOptions}
			/>
		);
	}

	return <div className={classNames.join(' ')}>{renderedWidgets}</div>;
}

OptionsPanel.propTypes = {
	id: PropTypes.string.isRequired,
	allWidgets: PropTypes.object.isRequired,
	nonInteractableWidgets: PropTypes.arrayOf(PropTypes.string).isRequired,
	hiddenWidgets: PropTypes.arrayOf(PropTypes.string).isRequired,
	setOption: PropTypes.func.isRequired,
	getEntryComponent: PropTypes.func.isRequired,
};

export default OptionsPanel;
