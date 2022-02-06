import './Logo.scss';

import React from 'react';

import logoSvg from '../../../../../../logo/media/logo.svg';

function Logo() {
	return (
		<div className={'logo'}>
			<div className={'logo-isExpanded'}>
				<div className={'logo-img'}>
					<svg className="stacked">
						<title>Chord Chart Studio</title>
						<use href={logoSvg + '#stacked'}></use>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default React.memo(Logo);
