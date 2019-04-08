import { connect } from 'react-redux';

import { getSelectedId } from '../../../fileManager/_state/selectors';
import { getOne } from '../../../db/files/selectors';

import ExportPreview from '../_components/ExportPreview';

export default connect(
	state => ({
		selectedFile: getOne(state, getSelectedId(state))
	}),

	{}

)(ExportPreview);
