import { connect } from 'react-redux';

import { getSelectedId } from '../../../fileManager/_state/selectors';
import { getOne } from '../../../db/files/selectors';

import PrintPreview from '../_components/PrintPreview';

export default connect(
	state => ({
		selectedFile: getOne(state, getSelectedId(state))
	}),

	{}

)(PrintPreview);
