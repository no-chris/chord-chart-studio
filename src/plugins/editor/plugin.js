import _assign from 'lodash/assign';

import pluginFactory from '../../core/pluginFactory';
import htmlToElement from '../../core/dom/htmlToElement';

import { editorFactory, parseSong, renderSong } from '@touffi/ucc/src/ucc-editor';

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


		const editorContainer = document.querySelector('#source');
		const previewContainer = document.querySelector('#preview');

		const editor = editorFactory(editorContainer);

		editor.on('change', (song) => {
			previewSong(song, renderingOptions);
			app.emit('editorchange', song);
		});

		app.on('optionchange', newOptions => {
			_assign(renderingOptions, newOptions);
			refreshPreview();
		});

		app.on('activatefile', file => editor.load(file.content));


		function previewSong(song) {
			const parsedSong = parseSong(song);
			const renderedSong = renderSong(parsedSong, renderingOptions);
			const rendered = htmlToElement(renderedSong);

			if (previewContainer.childNodes.length) {
				previewContainer.replaceChild(rendered, previewContainer.firstChild);
			} else {
				previewContainer.appendChild(rendered);
			}
		}

		function refreshPreview() {
			const song = editor.getContent();
			previewSong(song);
		}

	}
});

export default editorPlugin;
