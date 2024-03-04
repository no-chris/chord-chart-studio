jest.mock('../../../src/core/config');
jest.mock('../../../src/renderController');
import renderController from '../../../src/renderController';

import router, { navigateTo, getLink } from '../../../src/core/router';

describe('router', () => {
	test('Module', () => {
		expect(router).toBeInstanceOf(Object);
		expect(router.init).toBeInstanceOf(Function);
		expect(navigateTo).toBeInstanceOf(Function);
		expect(getLink).toBeInstanceOf(Function);
	});
});

const logSpy = jest.spyOn(console, 'error');

beforeEach(() => {
	renderController.mockClear();
	logSpy.mockClear();
});

const allRoutes = [
	{
		name: 'test1',
		path: '/test',
		action: 'myAction1',
	},
	{
		name: 'test2',
		path: '/test/:artistId/:songId',
		action: 'myAction2',
	},
];

describe('navigateTo', () => {
	test('should render the controller attached to a given route', async () => {
		router.init(allRoutes);
		await navigateTo('/test');

		expect(renderController).toHaveBeenCalledTimes(1);
		expect(renderController).toHaveBeenCalledWith('myAction1', {});
	});

	test('should pass the pathname parameters to the controller', async () => {
		router.init(allRoutes);
		await navigateTo('/test/bowie/changes');

		expect(renderController).toHaveBeenCalledTimes(1);
		expect(renderController).toHaveBeenCalledWith('myAction2', {
			artistId: 'bowie',
			songId: 'changes',
		});
	});

	test('should pass the query strings params to the controller', async () => {
		router.init(allRoutes);
		await navigateTo('/test?artistId=bowie&songId=changes');

		expect(renderController).toHaveBeenCalledTimes(1);
		expect(renderController).toHaveBeenCalledWith('myAction1', {
			artistId: 'bowie',
			songId: 'changes',
		});
	});

	test('should pass pathname and query strings params to the controller, query strings have the final word', async () => {
		router.init(allRoutes);
		await navigateTo('/test/bowie/changes?print=true&songId=ashes2ashes');

		expect(renderController).toHaveBeenCalledTimes(1);
		expect(renderController).toHaveBeenCalledWith('myAction2', {
			artistId: 'bowie',
			songId: 'ashes2ashes',
			print: 'true',
		});
	});

	test('should add an history entry by default', async () => {
		await navigateTo('/test/bowie/lifeonmars');

		expect(history.state.url).toBe('/test/bowie/lifeonmars');
	});

	test('should explicitly add an history entry if `shouldPushState` is true', async () => {
		await navigateTo('/test/bowie/themotel', true);

		expect(history.state.url).toBe('/test/bowie/themotel');
	});

	test('should not add an history entry if `shouldPushState` is false', async () => {
		await navigateTo('/test/bowie/starman', false);

		expect(history.state.url).not.toBe('/test/bowie/starman');
	});

	test('should log a error if route does not exists', async () => {
		await navigateTo('/unknown?params=should&be=discarded');

		expect(logSpy).toHaveBeenCalledWith(
			'Error: Cannot find route for path: /unknown'
		);
	});

	test('should log a error if route is undefined', async () => {
		await navigateTo(undefined);

		expect(logSpy).toHaveBeenCalledWith(
			'Error: Cannot find route for path: /undefined'
		);
	});
});

describe('getLink', () => {
	test('should get the link for a given route name', async () => {
		router.init(allRoutes);

		expect(getLink('test1')).toBe('/test');
		expect(getLink('test2', { artistId: 'bowie', songId: 'changes' })).toBe(
			'/test/bowie/changes'
		);
	});

	test('should happen extra params as query string parameters', async () => {
		router.init(allRoutes);

		expect(getLink('test1', { my: 'param', myOther: 'param' })).toBe(
			'/test?my=param&myOther=param'
		);
		expect(
			getLink('test2', {
				artistId: 'bowie',
				songId: 'changes',
				printMode: true,
			})
		).toBe('/test/bowie/changes?printMode=true');
	});

	test('should log a error if route name does not exists', () => {
		router.init(allRoutes);

		getLink('unknown');

		expect(logSpy).toHaveBeenCalledWith(`Error: Route "unknown" not found`);
	});

	test('should return undefined in case of missing params', () => {
		router.init(allRoutes);

		expect(
			getLink('test2', {
				artistId: 'bowie',
			})
		).toBeUndefined();
	});
});
