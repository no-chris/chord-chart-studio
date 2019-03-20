import pluginFactory from '../../core/plugin';
import htmlToElement from '../../../core/dom/htmlToElement';

import editorFactory from '../../../editor/prosemirror/editor';
import songRenderer from '../../../renderer/song/song';

import editorTpl from './editor.hbs';

import worry from '../../../../samples/dont-you-worry-bout-a-thing.chp';

const editorPlugin = pluginFactory({

	render() {
		const app = this.getHost();
		const areaBroker = app.getAreaBroker();
		const contentArea = areaBroker.getContent();

		const editorDom = htmlToElement(editorTpl());

		contentArea.appendChild(editorDom);





		// add editor functionality
		const editorNode = document.querySelector('#source');

		const editor = editorFactory(editorNode);


		const previewContainer = document.querySelector('#preview');

		function previewSong(songLines, { alignChords = true }) {
			const renderedSong = songRenderer.render(songLines, { alignChords });
			const rendered = htmlToElement(renderedSong);

			if (previewContainer.childNodes.length) {
				previewContainer.replaceChild(rendered, previewContainer.firstChild);
			} else {
				previewContainer.appendChild(rendered);
			}
		}


		editor.on('change', (songLines) => {
			previewSong(songLines, { alignChords: true });
			app.emit('editorchange', songLines.join('\n'));
		});


		editor.load(toNode(worry));

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