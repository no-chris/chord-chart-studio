import app from '../../src/app';

describe('app', () => {
	test('Module', () => {
		expect(app).toBeInstanceOf(Object);
	});
});

describe('app', () => {
	test('Renders correctly', () => {
		return app.init()
			.then(() => {
				return app.render();
			})
			.then(() => {

				const appHeader = document.body.querySelector('.app-header');
				const appFooter = document.body.querySelector('.app-footer');
				const editorArea = document.body.querySelector('.editor-area');
				const fileExplorer = document.body.querySelector('.file-explorer');
				const renderingOptions = document.body.querySelector('.rendering-options');

				expect(appHeader).toBeInstanceOf(Node);
				expect(appFooter).toBeInstanceOf(Node);
				expect(editorArea).toBeInstanceOf(Node);
				expect(fileExplorer).toBeInstanceOf(Node);
				expect(renderingOptions).toBeInstanceOf(Node);

				expect(appHeader.textContent).not.toEqual('');
				expect(appFooter.textContent).not.toEqual('');
				expect(editorArea.textContent).not.toEqual('');
				expect(fileExplorer.textContent).not.toEqual('');
				expect(renderingOptions.textContent).not.toEqual('');

			});
	});
});
