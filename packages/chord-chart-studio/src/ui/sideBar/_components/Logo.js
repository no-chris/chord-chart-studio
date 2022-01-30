import './Logo.scss';

import React from 'react';

import logoImg from './logo.png';

function Logo() {
	return (
		<div className={'logo'}>
			<div className={'logo-isExpanded'}>
				<div className={'logo-img'}>
					<img src={logoImg} alt={'Chord Chart Studio'} />
				</div>
			</div>
		</div>
	);
}

export default React.memo(Logo);
