import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo, history as pmHistory } from 'prosemirror-history';

export default function getPlugins() {
	return [
		pmHistory(),
		keymap({ 'Mod-z': undo, 'Mod-y': redo }),
		keymap(baseKeymap),
	];
}
