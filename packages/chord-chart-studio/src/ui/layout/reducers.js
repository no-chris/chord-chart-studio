import combineSectionReducers from 'combine-section-reducers';
import app from './app/_state/reducers';

export default combineSectionReducers({
	app,
});
