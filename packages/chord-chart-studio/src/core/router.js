import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';
import qs from 'qs';

import renderController from '../renderController';

let router;
let getUrl;

export default {
	init(allRoutes) {
		const allRoutesWithWrappedActions = allRoutes.map((route) => {
			return {
				...route,
				action: (context) => ({
					Controller: route.action,
					params: context.params,
				}),
			};
		});
		router = new UniversalRouter(allRoutesWithWrappedActions, {
			errorHandler(error, context) {
				console.error(
					`Error: Cannot find route for path: ${context.pathname}`
				);
			},
		});
		getUrl = generateUrls(router, {
			stringifyQueryParams: qs.stringify,
		});
	},
};

export function navigateTo(url, shouldPushState = true) {
	const parsedUrl = new URL(url, window.location.origin);

	return router
		.resolve(parsedUrl.pathname)
		.then(({ Controller, params } = {}) => {
			if (Controller) {
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
			}
		});
}

export function getLink(routeName, params) {
	try {
		return getUrl(routeName, params);
	} catch (e) {
		console.error(e.toString());
	}
}

function pushState(url) {
	window.history.pushState({ url }, null, url);
}

/* istanbul ignore next */
window.addEventListener('popstate', () => {
	const path = window.location.pathname + window.location.search;
	navigateTo(path, false);
});
