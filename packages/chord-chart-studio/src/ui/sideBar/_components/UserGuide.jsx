import './UserGuide.scss';

import React from 'react';

import Button from '../../_components/Button.jsx';
import Icon from '../../_components/Icon.jsx';

const userGuideUrl = 'https://chord-chart-studio.netlify.app';

const UserGuide = () => {
	const openUserGuide = () => {
		window.open(userGuideUrl, '_blank').focus();
	};

	return (
		<div className={'userGuide'}>
			<div className={'userGuide-isCollapsed'}>
				<Icon iconName={'help_outline'} />
			</div>

			<div className={'userGuide-isExpanded'}>
				<Button
					buttonName={'userGuide'}
					type={'primary'}
					onClick={openUserGuide}
				>
					User Guide
				</Button>
			</div>
		</div>
	);
};

UserGuide.propTypes = {};

UserGuide.defaultProps = {};

export default React.memo(UserGuide);
