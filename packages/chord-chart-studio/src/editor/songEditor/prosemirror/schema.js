import { Schema } from 'prosemirror-model';

const editorSchema = new Schema({
	nodes: {
		doc: {
			content: 'block+',
		},

		paragraph: {
			content: 'inline*',
			group: 'block',
			parseDOM: [{ tag: 'p' }],
			toDOM() {
				return ['p', 0];
			},
		},

		hard_break: {
			inline: true,
			group: 'inline',
			selectable: false,
			parseDOM: [{ tag: 'br' }],
			// no idea how to test this!
			/* istanbul ignore next */
			toDOM() {
				return ['br'];
			},
		},

		text: {
			group: 'inline',
		},
	},
});

export default editorSchema;
