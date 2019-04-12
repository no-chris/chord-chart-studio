import { connect } from 'react-redux';

import { getOptionValue } from '../../db/options/selectors';
import { setOptionValue } from '../../db/options/actions';

export default function OptionsPanelFactory(panelLayout, widgetsInitialState, component) {
	return connect(
		state => {
			const stateToProps = {
				panelLayout,
				widgetsInitialState,
			};

			let widget;
			let groupWidget;

			panelLayout.widgetsOrder.forEach(widgetId => {
				widget = panelLayout.allWidgets[widgetId];

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

