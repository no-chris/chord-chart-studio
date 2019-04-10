import React from 'react';
import PropTypes from 'prop-types';

function Slider(props) {
	const {
		isEnabled,
		label,
		min,
		max,
		showPlusSymbol,
		optionContext,
		optionKey,
		optionValue,
		setOption
	} = props;

	function handleChange(e) {
		setOption(
			optionContext,
			optionKey,
			Number.parseInt(e.target.value)
		);
	}

	const valueDisplay = (optionValue > 0 && showPlusSymbol)
		? '+' + optionValue
		: optionValue;

	return (
		<div
			className={'sb-option sb-optionSlider'}
		>
			<div className={'sb-optionSlider-desc'}>{label}</div>
			<div className={'sb-optionSlider-value'}>{valueDisplay}</div>
			<div className={'sb-optionSlider-range'}>
				<input
					min={min}
					max={max}
					value={optionValue}
					type={'range'}
					onChange={(isEnabled) ? handleChange : null}
					disabled={!isEnabled}
				/>
			</div>
		</div>
	);
}

Slider.propTypes = {
	isEnabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	showPlusSymbol: PropTypes.bool,
	optionContext: PropTypes.string.isRequired,
	optionKey: PropTypes.string.isRequired,
	optionValue: PropTypes.number.isRequired,
	setOption: PropTypes.func.isRequired,
};

Slider.defaultProps = {
	showPlusSymbol: true
};

export default React.memo(Slider);
