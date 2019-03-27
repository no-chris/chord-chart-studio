import areaBrokerFactory from '../../../src/core/areaBroker';

describe('areaBrokerFactory', () => {
	test('Module', () => {
		expect(areaBrokerFactory).toBeInstanceOf(Function);
	});
});

describe('Behaviour', () => {
	test('should retrieves area', () => {
		document.body.innerHTML = `
<div>
	<div data-area="app-header">header content</div>
	<div data-area="app-content">content</div>
	<div data-area="app-footer">footer content</div>
</div>
`;
		const areaBroker = areaBrokerFactory({
			header: 		'[data-area="app-header"]',
			contentArea: 	'[data-area="app-content"]',
			footer: 		'[data-area="app-footer"]',
		});

		expect(areaBroker.getHeader).toBeDefined();
		expect(areaBroker.getHeader).toBeInstanceOf(Function);
		expect(areaBroker.getContentArea).toBeDefined();
		expect(areaBroker.getContentArea).toBeInstanceOf(Function);
		expect(areaBroker.getFooter).toBeDefined();
		expect(areaBroker.getFooter).toBeInstanceOf(Function);

		const header = areaBroker.getHeader();
		const content = areaBroker.getContentArea();
		const footer = areaBroker.getFooter();

		expect(header).toBeInstanceOf(Node);
		expect(header.textContent).toEqual('header content');

		expect(content).toBeInstanceOf(Node);
		expect(content.textContent).toEqual('content');

		expect(footer).toBeInstanceOf(Node);
		expect(footer.textContent).toEqual('footer content');

	});


	test('should throw on missing area', () => {
		document.body.innerHTML = `
<div>
	<div data-area="app-header">header content</div>
	<div data-area="app-content">content</div>
</div>
`;

		const areaBroker = areaBrokerFactory({
			header: 		'[data-area="app-header"]',
			contentArea: 	'[data-area="app-content"]',
			footer: 		'[data-area="app-footer"]',
		});

		const throwingFn = () => areaBroker.getFooter();

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Cannot find area: footer with selector: [data-area="app-footer"]');

	});


	test('should throw on multiple area match', () => {
		document.body.innerHTML = `
<div>
	<div data-area="app-header">header content</div>
	<div data-area="app-header">another header</div>
</div>
`;

		const areaBroker = areaBrokerFactory({
			header: 		'[data-area="app-header"]',
		});

		const throwingFn = () => areaBroker.getHeader();

		expect(throwingFn).toThrow(Error);
		expect(throwingFn).toThrow('Multiple areas: header found with selector: [data-area="app-header"]');

	});
});
