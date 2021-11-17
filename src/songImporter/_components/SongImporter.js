import './SongImporter.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../ui/_components/Modal';
import Header from './Header';
import FilePicker from './FilePicker';
import Input from './Input';
import PreviewError from './PreviewError';
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
		setInputFormat,
		inputFormat,
		title,
	} = props;

	if (!isImporting) return null;

	let chordMarkContent = '';
	let error = '';

	try {
		chordMarkContent = input2ChordMark(content, inputFormat);
	} catch (e) {
		error = e.message;
	}

	return (
		<Modal closeModal={cancelImport}>
			<div
				className={'sim-SongImporterModal_Container'}
				data-testid={'song-importer'}
			>
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
							inputFormat={inputFormat}
							setInputFormat={setInputFormat}
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
						<div className={'sim-Preview_Container'}>
							{!error ? (
								chordMarkContent
							) : (
								<PreviewError
									inputFormat={inputFormat}
									error={error}
								/>
							)}
						</div>
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
	setInputFormat: PropTypes.func.isRequired,
	inputFormat: PropTypes.string.isRequired,
	title: PropTypes.string,
};

SongImporter.defaultProps = {};

export default SongImporter;
