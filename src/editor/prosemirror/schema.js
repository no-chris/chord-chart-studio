import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';

const editorSchema = new Schema({
	nodes: basicSchema.spec.nodes,
	marks: basicSchema.spec.marks
});

export default editorSchema;