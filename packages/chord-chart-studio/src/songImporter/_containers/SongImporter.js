import { connect } from 'react-redux';

import { importFile } from '../../db/files/actions';
import { setContent, setInputFormat, cancelImport } from '../_state/actions';
import {
	getInputFormat,
	getContent,
	getTitle,
	isImporting,
	isFromWeb,
} from '../_state/selectors';

import SongImporter from '../_components/SongImporter';

export default connect(
	(state) => ({
		content: getContent(state),
		isFromWeb: isFromWeb(state),
		isImporting: isImporting(state),
		inputFormat: getInputFormat(state),
		title: getTitle(state),
	}),

	{
		setContent,
		setInputFormat,
		cancelImport,
		importFile,
	}
)(SongImporter);
