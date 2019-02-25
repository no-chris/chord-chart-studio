import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';

import { EventEmitter2 } from 'eventemitter2';

import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
	nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
	marks: schema.spec.marks
});


function exportLines(json) {
	return json.doc.content.map(paragraph => {
		if (!paragraph.content) {
			return '';
		}
		return paragraph.content.reduce((acc, current) => {
			acc += current.text;
			return acc;
		}, '');
	});
}

/**
 * @param {string} renderToSelector - selector (unique result)
 * @param {string} initialContentSelector - selector (unique result)
 */
export default function editorFactory(renderToSelector, initialContentSelector) {

	return Object.assign(new EventEmitter2(), {
		render() {

			window.view = new EditorView(document.querySelector(renderToSelector), {
				state: EditorState.create({
					doc: DOMParser.fromSchema(mySchema).parse(document.querySelector(initialContentSelector)),
					plugins: exampleSetup({ schema: mySchema })
				}),
				dispatchTransaction: (tr) => {
					let {state} = window.view.state.applyTransaction(tr);
					window.view.updateState(state);

					this.emit('change', exportLines(state.toJSON()));

					return true;
				}
			});
		}
	});
}