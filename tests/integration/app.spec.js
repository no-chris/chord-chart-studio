import run from '../../src/app';

describe('Main entry point', () => {
	test('should render... something ;-)', () => {
		document.body.innerHTML = '<div id="app"></div>';
		return run()
			.then(() => {
				expect(document.body.querySelector('.songEditor')).toBeInstanceOf(Element);
				expect(document.body.querySelector('.leftBar')).toBeInstanceOf(Element);
				expect(document.body.querySelector('.rightBar')).toBeInstanceOf(Element);
			});
	});
});
