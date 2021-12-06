import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../ui/_components/Icon';

function FileActionEntry(props) {
	const { icon, text, action, isDisabled } = props;

	const classNames = ['fileManagerAction'];

	if (isDisabled) {
		classNames.push('fileManagerAction-isDisabled');
	}
	const handleClick = () => {
		if (!isDisabled) {
			action();
		}
	};

	return (
		<span className={classNames.join(' ')} onClick={handleClick}>
			<span className={'fileManagerAction-icon'}>
				<Icon iconName={icon} /> {text}
			</span>
		</span>
	);
}

FileActionEntry.propTypes = {
	icon: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool.isRequired,
};

export default React.memo(FileActionEntry);
