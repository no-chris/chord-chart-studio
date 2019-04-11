import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../ui/_components/Icon';

function FileActionEntry(props) {
	const { icon, text, action } = props;

	return (
		<span className={'fileManagerAction'} onClick={action}>
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
};

export default React.memo(FileActionEntry);
