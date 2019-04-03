import React, { useEffect, useRef } from 'react';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser as pmDOMParser } from 'prosemirror-model';

import getPlugins from './getPlugins';
import editorSchema from './schema';

import stateToText from './converters/stateToText';
import textToDom from './converters/textToDom';

import 'prosemirror-view/style/prosemirror.css';


function createEditorState(editorContent) {
	return EditorState.create({
		doc: pmDOMParser.fromSchema(editorSchema).parse(textToDom(editorContent), { preserveWhitespace: 'full' }),
		plugins: getPlugins()
	});
}

function createEditorView(editorState, onEditorChange, fileKey) {
	const editorView = new EditorView(null, {
		state: editorState,
		dispatchTransaction: transaction => {
			const { state, transactions } = editorView.state.applyTransaction(transaction);

			editorView.updateState(state);

			if (transactions.some(tr => tr.docChanged)) {
				onEditorChange(fileKey, stateToText(state));
			}
		},
	});
	return editorView;
}

export default function ProseMirrorEditorView(props) {
	const { selectedFileKey, editorContent, onEditorChange } = props;

	const editorView = useRef();
	const editorDom = useRef();
	const previousFileKey = usePrevious(selectedFileKey);

	useEffect(() => {
		/**
		 * Editor is recreated on component mount and on file change.
		 * The later is needed as we need to to re-bind the change handler with the new file id.
		 */
		if (!editorView.current || (previousFileKey !== selectedFileKey)) {
			if (editorView.current && editorView.current.dom.parentNode) {
				editorView.current.dom.parentNode.removeChild(editorView.current.dom);
			}

			const editorState = createEditorState(editorContent);
			editorView.current = createEditorView(editorState, onEditorChange, selectedFileKey);
			editorDom.current.appendChild(editorView.current.dom);

			editorView.current.focus();
		}
	});

	return (
		<div className="prosemirror-wrapper" ref={editorDom} />
	);
}

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
