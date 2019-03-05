import editorFactory from './editor';
import songRendererFactory from './songRenderer';

import kiss from './songs/kiss';
import world from './songs/ifIRuledTheWorld';

const editorContent = document.querySelector('#editor-content');

const editor = editorFactory('#editor', '#editor-content');

editor.render();

const renderedSong = document.querySelector('#rendered-song');
editor.on('change', (songLines) => {
	const songRenderer = songRendererFactory(songLines.join('\n'));
	renderedSong.innerHTML = songRenderer.toString();

});

const songSelector = document.querySelector('.song-selector');
songSelector.addEventListener('change', (event) => {
	switch(event.target.value) {
	case 'kiss': editorContent.innerHTML = kiss; break;
	case 'world': editorContent.innerHTML = world; break;
	}
});