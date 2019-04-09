import React from 'react';

import OptionsPanelEntry from './OptionsPanelEntry';

export default function OptionsPanel(props) {
	const {
		id,
		allWidgets,
		allPanelEntries,
		setOption,
		getEntryComponent,
	} = props;

	const classNames = [
		'optionsPanel',
		'optionsPanel-' + id
	];

	let widget;
	let WidgetComponent;
	let value;

	const renderedWidgets = allPanelEntries
		.filter(panelEntry => panelEntry.isVisible)
		.map(panelEntry => {

			widget = allWidgets[panelEntry.widgetId];
			WidgetComponent = getEntryComponent(widget.type);

			value = (widget.option) ? props[widget.option.key] : null;

			return (
				<OptionsPanelEntry
					key={panelEntry.widgetId + (panelEntry.key || '') }
					isEnabled={panelEntry.isEnabled}
					isVisible={panelEntry.isVisible}
				>
					{
						(panelEntry.isCustomWidget)
							?
							<WidgetComponent
								{...panelEntry}
							/>
							:
							<WidgetComponent
								isEnabled={panelEntry.isEnabled}
								{...widget.typeOption}
								label={widget.label}
								optionContext={widget.option.context}
								optionKey={widget.option.key}
								optionValue={value}
								setOption={setOption}
							/>
					}
				</OptionsPanelEntry>
			);
		});

	return (
		<div className={classNames.join(' ')}>
			{renderedWidgets}
		</div>
	);
}
