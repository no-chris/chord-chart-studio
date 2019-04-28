import './PlayRenderer.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function PlayRenderer(props) {
	const { selectedFile, fontSize, chordsColor, highlightChords, columnsCount } = props;

	const classNames = ['pr-SongRenderer'];
	classNames.push('pr-SongRenderer--columns-' + columnsCount);
	classNames.push('cmLine--fontSize' + fontSize);
	classNames.push('cmChordLine--chordsColor-' + chordsColor);
	if (highlightChords) {
		classNames.push('cmChordLine--highlightChords');
	}


	return (
		<div className={'pr-SongRendererWrapper1'}>
			<div className={'pr-SongRendererWrapper2'}>
				<div className={classNames.join(' ')}>
					<SongRenderer content={selectedFile.content} />
				</div>
			</div>
		</div>
	);
}

PlayRenderer.propTypes = {
	selectedFile: PropTypes.object.isRequired,
	columnsCount: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
	chordsColor: PropTypes.string.isRequired,
	highlightChords: PropTypes.bool.isRequired,
};

export default PlayRenderer;
