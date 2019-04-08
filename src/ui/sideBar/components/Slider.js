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
			className={'option option-slider'}
		>
			<div className={'option-slider-desc'}>{widget.label}</div>
			<div className={'option-slider-value'}>{(value > 0) ? '+' + value : value}</div>
			<div className={'option-slider-range'}>
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

