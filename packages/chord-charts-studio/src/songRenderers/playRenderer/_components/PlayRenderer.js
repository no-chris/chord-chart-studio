import './PlayRenderer.scss';

import React from 'react';
import PropTypes from 'prop-types';

import SongRenderer from '../../_containers/SongRenderer';

function PlayRenderer(props) {
	const { theme, selectedFile, fontSize, columnsCount } = props;

	const classNames = ['playRenderer'];
	classNames.push('cmTheme-' + theme);
	classNames.push('playRenderer--columns-' + columnsCount);
	classNames.push('cmSong--fontSize' + fontSize);

	return (
		<div className={'playRendererWrapper1'}>
			<div className={'playRendererWrapper2'}>
				<div
					className={classNames.join(' ')}
					data-testid={'playRenderer'}
				>
					<SongRenderer content={selectedFile.content} />
				</div>
			</div>
		</div>
	);
}

PlayRenderer.propTypes = {
	theme: PropTypes.string.isRequired,
	fontSize: PropTypes.number.isRequired,
	selectedFile: PropTypes.object.isRequired,
	columnsCount: PropTypes.number.isRequired,
};

export default PlayRenderer;
