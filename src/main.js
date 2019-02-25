import editorFactory from './editor';
import songRendererFactory from './songRenderer';

const editor = editorFactory('#editor', '#editor-content');

editor.render();

const renderedSong = document.querySelector('#rendered-song');

editor.on('change', (songLines) => {
	const songRenderer = songRendererFactory(songLines.join('\n'));
	renderedSong.innerHTML = songRenderer.toString();

});