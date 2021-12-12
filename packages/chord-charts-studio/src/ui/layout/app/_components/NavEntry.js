import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../_components/Icon.js';

function NavEntry(props) {
	const { label, icon, editorMode, setEditorMode, isActive, isDisabled } =
		props;

	const classNames = ['mainNavEntry'];

	if (isActive) {
		classNames.push('mainNavEntry-isActive');
	}
	if (isDisabled) {
		classNames.push('mainNavEntry-isDisabled');
	}

	function handleClick() {
		if (!isDisabled) setEditorMode(editorMode);
	}

	return (
		<li className={classNames.join(' ')} onClick={handleClick}>
			<span className={'mainNavEntry-icon'}>
				<Icon iconName={icon} />
			</span>
			{label}
		</li>
	);
}

NavEntry.propTypes = {
	label: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	editorMode: PropTypes.string.isRequired,
	setEditorMode: PropTypes.func.isRequired,
	isActive: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool.isRequired,
};

export default React.memo(NavEntry);
