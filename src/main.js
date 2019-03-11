import '../scss/styles.scss';

import editorFactory from './editor/prosemirror/editor';
import songRenderer from './renderer/song/song';

import htmlToElement from './core/dom/htmlToElement';

import kiss from './songs/kiss';
import world from './songs/ifIRuledTheWorld';
import worry from './songs/worry';



const editorNode = document.querySelector('#editor');

const editor = editorFactory(editorNode);

const renderedSongContainer = document.querySelector('#rendered-song');

editor.on('change', (songLines) => {
	const renderedSong = songRenderer.render(songLines, { alignChords: true });
	const rendered = htmlToElement(renderedSong);

	if (renderedSongContainer.childNodes.length) {
		renderedSongContainer.replaceChild(rendered, renderedSongContainer.firstChild);
	} else {
		renderedSongContainer.appendChild(rendered);
	}

});


editor.load(toNode(kiss));

const songSelector = document.querySelector('.song-selector');
songSelector.addEventListener('change', (event) => {
	switch(event.target.value) {
	case 'kiss': editor.load(toNode(kiss)); break;
	case 'world': editor.load(toNode(world)); break;
	case 'worry': editor.load(toNode(worry)); break;
	}
});

function toNode(text) {
	const div = document.createElement('div');
	div.innerHTML = text
		.split('\n')
		.map(line => `<p>${line}</p>`)
		.join('');
	return div;
}