import './UserGuide.scss';

import React from 'react';

import Button from '../../../_components/Button';

const UserGuide = () => {
	const openUserGuide = () => {
		window.open('https://chordmark.netlify.app', '_blank').focus();
	};

	return (
		<div className={'rightBar-userGuide'}>
			<Button
				buttonName={'userGuide'}
				type={'primary'}
				onClick={openUserGuide}
			>
				User Guide
			</Button>
		</div>
	);
};

UserGuide.propTypes = {};

UserGuide.defaultProps = {};

export default React.memo(UserGuide);
