import { connect } from 'react-redux';

import { setSourceType, setContent } from '../_state/actions';
import { getSourceType, getContent } from '../_state/selectors';

import SongImporter from '../_components/SongImporter';

export default connect(
	(state) => ({
		sourceType: getSourceType(state),
		content: getContent(state),
	}),

	{
		setSourceType,
		setContent,
	}
)(SongImporter);
