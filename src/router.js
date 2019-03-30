import UniversalRouter from 'universal-router';
import renderController from './renderController';

import Edit from './controllers/Edit';
import Play from './controllers/Play';
import Print from './controllers/Print';
import Export from './controllers/Export';

const routes = [
	{
		path: '/edit',
		action: () => Edit,
	},
	{
		path: '/play',
		action: () => Play,
	},
	{
		path: '/print',
		action: () => Print,
	},
	{
		path: '/export',
		action: () => Export,
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


