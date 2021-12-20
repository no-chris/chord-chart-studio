import React from 'react';

const ChordMarkBlock = ({ content }) => {
	return (
		<div className={'chordMarkBlockContainer'}>
			<div className={'chordMarkBlockContent'}>
				<pre className={'chordMarkBlock cmTheme-dark1'}>
					<code
						className={'chordMarkBlockLines'}
						/* eslint-disable-next-line jam3/no-sanitizer-with-danger */
						dangerouslySetInnerHTML={{
							__html: content,
						}}
					/>
				</pre>
			</div>
		</div>
	);
};

export default ChordMarkBlock;
