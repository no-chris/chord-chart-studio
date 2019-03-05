import onStateChange from '../../../../src/editor/prosemirror/plugins/onStateChange';

import EventEmitter from 'eventemitter2';
import { Plugin } from 'prosemirror-state';

describe('onStateChange', () => {
	test('Module', () => {
		expect(onStateChange).toBeInstanceOf(Function);
	});
	test('Factory', () => {
		expect(onStateChange()).toBeInstanceOf(Plugin);
	});
});

describe('Behaviour', () => {
	test('Trigger statechange event on view call', (done) => {
		const editor = new EventEmitter();
		const plugin = onStateChange(editor);
		const state = 'I am a state';

		editor.on('statechange', newState => {
			expect(newState).toEqual(state);
			done();
		});

		plugin.spec.view().update({ state });
	});
});
