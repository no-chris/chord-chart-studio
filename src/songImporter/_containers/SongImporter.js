import { connect } from 'react-redux';

import { importFile } from '../../db/files/actions';
import { setContent, setSourceType, cancelImport } from '../_state/actions';
import {
	getSourceType,
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
		sourceType: getSourceType(state),
		title: getTitle(state),
	}),

	{
		setContent,
		setSourceType,
		cancelImport,
		importFile,
	}
)(SongImporter);
