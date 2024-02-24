import libraryRoutes from './library/routes';
import songViewRoutes from './songView/routes';
import Editor from '../controllers/Editor';

export default [
	{
		name: 'home',
		path: '/',
		action: Editor,
	},
	...libraryRoutes,
	...songViewRoutes,
];
