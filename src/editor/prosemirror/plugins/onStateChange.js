import { Plugin } from 'prosemirror-state';

export default function onStateChangeFactory(editor) {
	return new Plugin({
		key: 'onStateChange',
		view: () => {
			return {
				update(editorView) {
					editor.emit('statechange', editorView.state);
				}
			};
		},
	});
}