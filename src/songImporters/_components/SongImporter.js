import './SongImporter.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import FilePicker from './FilePicker';
import Input from './Input';
import Preview from './Preview';
import InputFormatSelector from './InputFormatSelector';

function SongImporter(props) {
	const { closeModal, setContent, content, setSourceType, sourceType } =
		props;

	return (
		<div className={'sim-SongImporterModal_Container'}>
			<Header closeModal={closeModal} />
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
					<Preview content={content} sourceType={sourceType} />
				</div>
			</div>
		</div>
	);
}

SongImporter.propTypes = {
	closeModal: PropTypes.func.isRequired,
	setContent: PropTypes.func.isRequired,
	setSourceType: PropTypes.func.isRequired,
	content: PropTypes.string.isRequired,
	sourceType: PropTypes.string.isRequired,
};

SongImporter.defaultProps = {};

export default SongImporter;
