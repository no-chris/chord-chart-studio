import React from 'react';
import PropTypes from 'prop-types';
import getUploadedFile from '../getUploadedFile';

const allowedFiles = 'text/*,.cho,.crd,.chopro,.chord,.pro,.txt,.md';

const FilePicker = ({ setContent }) => {
	const handleChange = (ev) => {
		getUploadedFile(ev.target.files)
			.then((file) => {
				setContent(file.content, file.title);
			})
			.catch((e) => {
				setContent(e);
			});
	};

	return (
		<div>
			<label
				htmlFor={'importSong-Input'}
				className={'Button Button-primary'}
			>
				Select File
			</label>
			<input
				id={'importSong-Input'}
				name={'importSong-Input'}
				type={'file'}
				className={'sim-InputFile_Input'}
				onChange={handleChange}
				accept={allowedFiles}
			/>
		</div>
	);
};

FilePicker.propTypes = {
	setContent: PropTypes.func.isRequired,
};

export default FilePicker;
