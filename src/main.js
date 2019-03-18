import '../scss/styles.scss';

import editorFactory from './editor/prosemirror/editor';
import songRenderer from './renderer/song/song';

import htmlToElement from './core/dom/htmlToElement';

import kiss from './songs/kiss';

import logFactory from  './core/logger';
const log = logFactory.getLogger('main');


import areaBrokerFactory from './core/app/areaBroker';
import appFactory from './core/app/app';
import registerPlugins from './app/registerPlugins';


const areas = {
	header: '[data-area="app-header"]',
	footer: '[data-area="app-footer"]',
	sideBar: '[data-area="app-side-bar"]',
	content: '[data-area="app-content"]',
};

const areaBroker = areaBrokerFactory(areas);
const app = appFactory(areaBroker);
registerPlugins(app);

app
	.init()
	.then(() => {
		return app.render();
	});

log.info('info test');

const editorNode = document.querySelector('#editor');

const editor = editorFactory(editorNode);

const renderedSongContainer = document.querySelector('#rendered-song');
const alignRenderingSwitch = document.querySelector('#aligned-rendering');

function renderSong(songLines, { alignChords = true }) {
	const renderedSong = songRenderer.render(songLines, { alignChords });
	const rendered = htmlToElement(renderedSong);

	if (renderedSongContainer.childNodes.length) {
		renderedSongContainer.replaceChild(rendered, renderedSongContainer.firstChild);
	} else {
		renderedSongContainer.appendChild(rendered);
	}
}


editor.on('change', (songLines) => {
	renderSong(songLines, { alignChords: alignRenderingSwitch.checked });
});


editor.load(toNode(kiss));

alignRenderingSwitch.addEventListener('change', () => {
	editor.load(editorNode);
});

function toNode(text) {
	const div = document.createElement('div');
	div.innerHTML = text
		.split('\n')
		.map(line => `<p>${line}</p>`)
		.join('');
	return div;
}



// Drag & drop
const body = document.body;
body.ondragover = () => {
	body.classList.add('hover');
	return false;
};
body.ondragleave = () => {
	body.classList.remove('hover');
	return false;
};

body.ondrop = e => {
	body.classList.remove('hover');
	e.preventDefault();

	const file = e.dataTransfer.files[0];
	const reader = new FileReader();

	reader.onload = function(event) {
		editor.load(toNode(event.target.result));
	};
	reader.readAsText(file);

	return false;
};
