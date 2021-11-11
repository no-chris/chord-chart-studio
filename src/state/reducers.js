import combineSectionReducers from 'combine-section-reducers';

import db from '../db/reducers';
import fileManager from '../fileManager/_state/reducers';
import ui from '../ui/reducers';

export default combineSectionReducers({
	db,
	fileManager,
	ui,
});
