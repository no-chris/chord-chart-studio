import '../scss/styles.scss';

import editorFactory from './editor/prosemirror/editor';
import songRenderer from './renderer/song/song';

import htmlToElement from './core/dom/htmlToElement';

import kiss from './songs/kiss';
import world from './songs/ifIRuledTheWorld';



const editorNode = document.querySelector('#editor');

const editor = editorFactory(editorNode);

const renderedSong = document.querySelector('#rendered-song');

editor.on('change', (songLines) => {
	const rendered = htmlToElement(songRenderer.render(songLines.join('\n')));

	if (renderedSong.childNodes.length) {
		renderedSong.replaceChild(rendered, renderedSong.firstChild);
	} else {
		renderedSong.appendChild(rendered);
	}

});


editor.load(toNode(kiss));

const songSelector = document.querySelector('.song-selector');
songSelector.addEventListener('change', (event) => {
	switch(event.target.value) {
	case 'kiss': editor.load(toNode(kiss)); break;
	case 'world': editor.load(toNode(world)); break;
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