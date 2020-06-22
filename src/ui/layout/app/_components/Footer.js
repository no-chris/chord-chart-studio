import './Footer.scss';

import React from 'react';

function Footer() {
	return (
		<div className={'appFooter'}>
			Chords Charts Studio v0.8.3 - ChordMark v0.5.4 - ChordSymbol v0.5.1
		</div>
	);
}

export default React.memo(Footer);
