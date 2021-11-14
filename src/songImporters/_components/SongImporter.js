import './SongImporter.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../ui/_components/Modal';
import Header from './Header';
import FilePicker from './FilePicker';
import Input from './Input';
import Preview from './Preview';
import InputFormatSelector from './InputFormatSelector';
import chordSheetJs2ChordMark from '../../core/converters/chordSheetJs2ChordMark';
import ChordSheetJS from 'chordsheetjs';

function SongImporter(props) {
	const {
		cancelImport,
		content,
		doImport,
		isImporting,
		setContent,
		setSourceType,
		sourceType,
	} = props;

	if (!isImporting) return null;

	let preview = '';
	let error = '';

	try {
		const parser = getParser(sourceType);
		const parsed = parser.parse(content);
		preview = chordSheetJs2ChordMark(parsed);
	} catch (e) {
		error = e.message;
	}

	return (
		<Modal>
			<div className={'sim-SongImporterModal_Container'}>
				<Header
					cancelImport={cancelImport}
					doImport={doImport}
					content={content}
					error={error}
				/>
				<div className={'sim-TwoColumns_Container'}>
					<div className={'sim-Column_Container'}>
						<FilePicker />
					</div>
					<div className={'sim-Column_Container'}>
						<InputFormatSelector
							sourceType={sourceType}
							setSourceType={setSourceType}
						/>
					</div>
				</div>
				<div
					className={
						'sim-TwoColumns_Container sim-TwoColumns_Container-autoHeight'
					}
				>
					<div className={'sim-Column_Container'}>
						<Input content={content} setContent={setContent} />
					</div>
					<div className={'sim-Column_Container'}>
						<Preview
							sourceType={sourceType}
							preview={preview}
							error={error}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

function getParser(sourceType) {
	switch (sourceType) {
		case 'chordpro':
			return new ChordSheetJS.ChordProParser();
		case 'ultimateGuitar':
			return new ChordSheetJS.UltimateGuitarParser();
		default:
			return new ChordSheetJS.ChordSheetParser();
	}
}

SongImporter.propTypes = {
	cancelImport: PropTypes.func.isRequired,
	content: PropTypes.string.isRequired,
	doImport: PropTypes.func.isRequired,
	isImporting: PropTypes.bool.isRequired,
	setContent: PropTypes.func.isRequired,
	setSourceType: PropTypes.func.isRequired,
	sourceType: PropTypes.string.isRequired,
};

SongImporter.defaultProps = {};

export default SongImporter;
