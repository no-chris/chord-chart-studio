import pluginFactory from '../../../core/app/plugin';
import htmlToElement from '../../../core/dom/htmlToElement';

import editorFactory from '../../../editor/prosemirror/editor';
import songRenderer from '../../../renderer/song/song';

import editorTpl from './editor.hbs';

import kiss from '../../../songs/worry';

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
		});


		editor.load(toNode(kiss));

		function toNode(text) {
			const div = document.createElement('div');
			div.innerHTML = text
				.split('\n')
				.map(line => `<p>${line}</p>`)
				.join('');
			return div;
		}



	}
});

export default editorPlugin;