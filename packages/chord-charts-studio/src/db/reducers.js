import combineSectionReducers from 'combine-section-reducers';
import files from './files/reducers';
import options from './options/reducers';

export default combineSectionReducers({
	files,
	options,
});
