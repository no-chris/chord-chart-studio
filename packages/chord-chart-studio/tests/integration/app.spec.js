jest.mock('../../src/core/config');

import run from '../../src/app';

const { act } = require('@testing-library/react');

describe('Main entry point', () => {
	test('should render... something ;-)', async () => {
		document.body.innerHTML = '<div id="app"></div>';

		await act(async () => await run());

		expect(document.body.querySelector('.songEditor')).toBeInstanceOf(
			Element
		);
		expect(document.body.querySelector('.leftBar')).toBeInstanceOf(Element);
		expect(document.body.querySelector('.rightBar')).toBeInstanceOf(
			Element
		);
	});
});
