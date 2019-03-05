import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo, history } from 'prosemirror-history';
import onStateChange from './plugins/onStateChange';

export default function getPlugins(editor) {
	return [
		history(),
		keymap({ 'Mod-z': undo, 'Mod-y': redo }),
		keymap(baseKeymap),
		onStateChange(editor)
	];
}