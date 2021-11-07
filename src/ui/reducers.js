import combineSectionReducers from 'combine-section-reducers';
import layout from './layout/reducers';

export default combineSectionReducers({
	layout,
});
