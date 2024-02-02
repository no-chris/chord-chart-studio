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

export function navigateTo(url, shouldPushState = true) {
	const parsedUrl = new URL(url, window.location.origin);

	return universalRouter
		.resolve(parsedUrl.pathname)
		.then(({ Controller, params }) => {
			if (shouldPushState) {
				pushState(url);
			}
			const queryParams = qs.parse(parsedUrl.search, {
				ignoreQueryPrefix: true,
			});
			renderController(Controller, {
				...params,
				...queryParams,
			});
		});
}

function pushState(stateUrl) {
	window.history.pushState({}, null, stateUrl);
}

window.addEventListener('popstate', () => {
	console.log('popstate');
	const path = window.location.pathname + window.location.search;
	navigateTo(path, false);
});
