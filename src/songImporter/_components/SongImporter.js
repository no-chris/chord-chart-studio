import './SongImporter.scss';

import React from 'react';
import PropTypes from 'prop-types';

function SongImporter(props) {
	const {
		closeModal
	} = props;

	return (
		<div className={'songImporter-container'}>
			<div>Yeah man, lets import some songs!!!</div>
			<button onClick={closeModal}>CLOSE ME</button>
		</div>
	);
}

SongImporter.propTypes = {
	closeModal: PropTypes.func.isRequired
};

SongImporter.defaultProps = {};

export default SongImporter;
