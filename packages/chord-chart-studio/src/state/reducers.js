import combineSectionReducers from 'combine-section-reducers';

import db from '../db/reducers';
import fileManager from '../fileManager/_state/reducers';
import songImporter from '../songImporter/_state/reducers';
import ui from '../ui/layout/app/uiSlice';

export default combineSectionReducers({
	db,
	fileManager,
	songImporter,
	ui,
});
