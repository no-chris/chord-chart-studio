import React from 'react';

export default function Slider(props) {
	const {
		widget,
		value,
		setOption
	} = props;

	function handleChange(e) {
		setOption(
			widget.option.context,
			widget.option.key,
			Number.parseInt(e.target.value)
		);
	}

	return (
		<div
			className={'option optionSlider'}
		>
			<div className={'optionSlider-desc'}>{widget.label}</div>
			<div className={'optionSlider-value'}>{(value > 0) ? '+' + value : value}</div>
			<div className={'optionSlider-range'}>
				<input
					min={widget.typeOption.min}
					max={widget.typeOption.max}
					value={value}
					type={'range'}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}

