import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';
import qs from 'qs';

import renderController from '../renderController';

let universalRouter;
let getUrl;

export default {
	initRouter(allRoutes) {
		const allRoutesWithWrappedActions = allRoutes.map((route) => {
			return {
				...route,
				action: (context) => ({
					Controller: route.action,
					params: context.params,
				}),
			};
		});
		universalRouter = new UniversalRouter(allRoutesWithWrappedActions, {
			errorHandler(error, context) {
				console.error('======== Error');
				console.error(error);
				console.info(context);
			},
		});
		getUrl = generateUrls(universalRouter);
	},
};

export function navigateTo(pathname) {
	return universalRouter.resolve(pathname).then(({ Controller, params }) => {
		const queryParams = qs.parse(window.location.search, {
			ignoreQueryPrefix: true,
		});
		renderController(Controller, {
			...params,
			...queryParams,
		});
	});
}
