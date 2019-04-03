import React from 'react';

export default React.memo(function Icon(props) {
	const { iconName } = props;

	const classList = ['material-icons'];

	return (
		<i className={classList.join(' ')}>{iconName}</i>
	);
});
