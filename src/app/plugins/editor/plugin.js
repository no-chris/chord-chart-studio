import _ from 'lodash';

import pluginFactory from '../../core/plugin';
import htmlToElement from '../../../core/dom/htmlToElement';

import { editorFactory, songRenderer } from '@touffi/ucc/src/index-editor';

import editorTpl from './editor.hbs';

const editorPlugin = pluginFactory({

	render() {
		const app = this.getHost();
		const areaBroker = app.getAreaBroker();
		const contentArea = areaBroker.getContent();

		const editorDom = htmlToElement(editorTpl());

		contentArea.appendChild(editorDom);


		const renderingOptions = {
			alignBars: true,
			transposeValue: 0
		};


		// add editor functionality
		const editorNode = document.querySelector('#source');

		const editor = editorFactory(editorNode);


		const previewContainer = document.querySelector('#preview');

		function previewSong(songLines) {
			const renderedSong = songRenderer.render(songLines, renderingOptions);
			const rendered = htmlToElement(renderedSong);

			if (previewContainer.childNodes.length) {
				previewContainer.replaceChild(rendered, previewContainer.firstChild);
			} else {
				previewContainer.appendChild(rendered);
			}
		}

		function refreshPreview() {
			const songLines = editor.getContent();
			previewSong(songLines);
		}

		editor.on('change', (songLines) => {
			previewSong(songLines, renderingOptions);
			app.emit('editorchange', songLines.join('\n'));
		});

		app.on('optionchange', newOptions => {
			_.assign(renderingOptions, newOptions);
			refreshPreview();
		});

		function toNode(text) {
			const div = document.createElement('div');
			div.innerHTML = text
				.split('\n')
				.map(line => `<p>${line}</p>`)
				.join('');
			return div;
		}

		// listen to events
		app.on('activatefile', file => editor.load(toNode(file.content)));


	}
});

export default editorPlugin;
