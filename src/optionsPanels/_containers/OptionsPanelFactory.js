import { connect } from 'react-redux';

import { getOptionValue } from '../../db/options/selectors';
import { setOptionValue } from '../../db/options/actions';

export default function OptionsPanelFactory(allWidgets, getNonInteractableWidgets, getNonVisibleWidgets, component) {
	return connect(
		state => {
			const stateToProps = {
				allWidgets,
				nonInteractableWidgets: getNonInteractableWidgets(state),
				nonVisibleWidgets: getNonVisibleWidgets(state),
			};

			let widget;
			let groupWidget;

			allWidgets.widgetsOrder.forEach(widgetId => {
				widget = allWidgets.allWidgets[widgetId];

				if (widget.type === 'optionsGroup') {
					widget.groupWidgetsOrder.forEach(groupWidgetId => {
						groupWidget = widget.allGroupWidgets[groupWidgetId];

						stateToProps[groupWidget.option.key] = getOptionValue(state, groupWidget.option.context, groupWidget.option.key);
					});

				} else {
					stateToProps[widget.option.key] = getOptionValue(state, widget.option.context, widget.option.key);
				}
			});

			return stateToProps;
		},

		{
			setOption: setOptionValue
		}

	)(component);
}

