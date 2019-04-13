import UniversalRouter from 'universal-router';
import renderController from './renderController';

import Editor from './controllers/Editor';

const routes = [
	{
		path: '/editor',
		action: () => Editor,
	},
];

const universalRouter = new UniversalRouter(routes);

export default {
	navigateTo(path) {
		universalRouter.resolve(path)
			.then(controller => {
				renderController(controller);
			});
	}
};


