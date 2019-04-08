import { connect } from 'react-redux';

import { getOptionValue } from '../../db/options/selectors';
import { setOption } from '../../db/options/actions';

export default function OptionsPanelFactory(allPanelEntries, allWidgets, component) {
	return connect(
		state => {
			const stateToProps = {
				allWidgets,
				allPanelEntries
			};

			let widget;
			allPanelEntries
				.filter(panelEntry => {
					widget = allWidgets[panelEntry.widgetId];
					return typeof widget.option !== 'undefined';
				})
				.forEach(panelEntry => {
					widget = allWidgets[panelEntry.widgetId];
					stateToProps[widget.option.key] = getOptionValue(state, widget.option.context, widget.option.key);
				});

			return stateToProps;
		},

		{
			setOption
		}

	)(component);
}

