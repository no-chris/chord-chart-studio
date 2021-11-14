import { connect } from 'react-redux';

import {
	setContent,
	setSourceType,
	cancelImport,
	doImport,
} from '../_state/actions';
import { getSourceType, getContent, isImporting } from '../_state/selectors';

import SongImporter from '../_components/SongImporter';

export default connect(
	(state) => ({
		content: getContent(state),
		isImporting: isImporting(state),
		sourceType: getSourceType(state),
	}),

	{
		setContent,
		setSourceType,
		cancelImport,
		doImport,
	}
)(SongImporter);
