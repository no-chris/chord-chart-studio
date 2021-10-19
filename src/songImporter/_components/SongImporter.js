import './SongImporter.scss';

import importFromUltimateGuitar from '../importers/ultimateGuitar/import';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SongImporter(props) {
	const [ importUrl, setImportUrl ] = useState('https://tabs.ultimate-guitar.com/tab/les-innocents/une-vie-moins-ordinaire-chords-1714922');
	const [ importPreview, setImportPreview ] = useState('Please type a URL');
	const {
		closeModal
	} = props;
	
	const handleInput = (e) => {
		setImportUrl(e.target.value);
	};
	
	const doImport = () => {
		importFromUltimateGuitar(importUrl).then((result) => {
			setImportPreview(result);
		});
	};

	return (
		<div className={'songImporter-container'}>
			<div>Yeah man, lets import some songs!!!</div>
			<div>
				<input style={{ width: '60%' }} type={'text'} name={'importUrl'} value={importUrl} onChange={handleInput} />
				<button onClick={doImport}>Import!</button>
			</div>
			<div><textarea style={{ width: '90%' }} rows={25} name={'importPreview'} value={importPreview} readOnly={true}/></div>
			<div><iframe src={importUrl} /></div>
			<button onClick={closeModal}>CLOSE ME</button>
		</div>
	);
}

SongImporter.propTypes = {
	closeModal: PropTypes.func.isRequired
};

SongImporter.defaultProps = {};

export default SongImporter;
