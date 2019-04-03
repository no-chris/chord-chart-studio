import React from 'react';

import Icon from '../../ui/components/Icon';

export default React.memo(function FileActionEntry(props) {
	const { icon, text, action } = props;

	return (
		<span className="fm-action" onClick={action}>
			<Icon
				iconName={icon}
			/> {text}
		</span>
	);
});
