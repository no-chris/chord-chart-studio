import { connect } from 'react-redux';

import { getSelectedId } from '../../../fileManager/selectors';
import { getOne } from '../../../db/files/selectors';

import PlayRenderer from '../_components/PlayRenderer';

export default connect(
	state => ({
		selectedFile: getOne(state, getSelectedId(state))
	}),

	{}

)(PlayRenderer);
