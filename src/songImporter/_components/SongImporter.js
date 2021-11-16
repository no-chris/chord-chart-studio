import './SongImporter.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../ui/_components/Modal';
import Header from './Header';
import FilePicker from './FilePicker';
import Input from './Input';
import Preview from './Preview';
import InputFormatSelector from './InputFormatSelector';
import input2ChordMark from '../input2ChordMark';

function SongImporter(props) {
	const {
		cancelImport,
		content,
		importFile,
		isFromWeb,
		isImporting,
		setContent,
		setSourceType,
		sourceType,
		title,
	} = props;

	if (!isImporting) return null;

	let chordMarkContent = '';
	let error = '';

	try {
		chordMarkContent = input2ChordMark(content, sourceType);
	} catch (e) {
		error = e.message;
	}

	return (
		<Modal closeModal={cancelImport}>
			<div className={'sim-SongImporterModal_Container'}>
				<Header
					cancelImport={cancelImport}
					chordMarkContent={chordMarkContent}
					content={content}
					error={error}
					importFile={importFile}
					title={title}
				/>
				<div className={'sim-TwoColumns_Container'}>
					<div className={'sim-Column_Container'}>
						<FilePicker setContent={setContent} />
					</div>
					<div className={'sim-Column_Container'}>
						<InputFormatSelector
							sourceType={sourceType}
							setSourceType={setSourceType}
							disableAll={isFromWeb === true}
						/>
					</div>
				</div>
				<div
					className={
						'sim-TwoColumns_Container sim-TwoColumns_Container-autoHeight'
					}
				>
					<div className={'sim-Column_Container'}>
						<Input
							content={content}
							setContent={setContent}
							isDisabled={isFromWeb}
						/>
					</div>
					<div className={'sim-Column_Container'}>
						<Preview
							sourceType={sourceType}
							chordMarkContent={chordMarkContent}
							error={error}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

SongImporter.propTypes = {
	cancelImport: PropTypes.func.isRequired,
	content: PropTypes.string.isRequired,
	importFile: PropTypes.func.isRequired,
	isFromWeb: PropTypes.bool.isRequired,
	isImporting: PropTypes.bool.isRequired,
	setContent: PropTypes.func.isRequired,
	setSourceType: PropTypes.func.isRequired,
	sourceType: PropTypes.string.isRequired,
	title: PropTypes.string,
};

SongImporter.defaultProps = {};

export default SongImporter;
