import React from 'react';

import { render, cleanup, act } from 'react-testing-library';
import 'jest-dom/extend-expect';

import ProsemirrorEditorView from '../../../../../src/editor/songEditor/prosemirror/ProsemirrorEditorView';

afterEach(cleanup);

describe('ProsemirrorEditorView', () => {

	let props = {};
	const updateFile = jest.fn();

	beforeEach(() => {
		props = {
			selectedFileId: 'myId',
			editorContent: 'mySong in editor',
			updateFile,
		};
		updateFile.mockClear();
	});

	describe('Rendering and DOM updated', () => {
		test('Should create Prosemirror editor with correct content', () => {
			const { getByText } = render(<ProsemirrorEditorView
				{...props}
			/>);
			const pm = getByText(props.editorContent).closest('.ProseMirror');

			expect(pm).toBeInstanceOf(Element);
		});

		test('Should not re-create editor node if content changes but not selectedId', () => {
			let result = {};

			act(() => {
				result = render(<ProsemirrorEditorView
					{...props}
				/>);
			});
			const { rerender, getByText } = result;
			const pm1 = getByText(props.editorContent).closest('.ProseMirror');

			act(() => {
				rerender(<ProsemirrorEditorView
					{...props}
					editorContent={'myNewContent'}
				/>);

			});
			// changes are managed by Prosemirror itself, not via props changes, so 'myNewContent' should not be reflected here
			const pm2 = getByText(props.editorContent).closest('.ProseMirror');

			expect(pm1.isSameNode(pm2)).toBe(true);
			expect(pm1).toBe(pm2);
		});

		test('Should re-create editor node if selectedId changes', () => {
			let result = {};

			act(() => {
				result = render(<ProsemirrorEditorView
					{...props}
					selectedFileId={'myId1'}
				/>);
			});
			const { rerender, getByText } = result;
			const pm1 = getByText(props.editorContent).closest('.ProseMirror');

			act(() => {
				rerender(<ProsemirrorEditorView
					{...props}
					selectedFileId={'myId2'}
					editorContent={'myNewContent'}
				/>);

			});
			const pm2 = getByText('myNewContent').closest('.ProseMirror');

			expect(pm1.isSameNode(pm2)).not.toBe(true);
			expect(pm1).not.toBe(pm2);
		});

		test('Should destroy editor if no song is selected', () => {
			let result = {};

			act(() => {
				result = render(<ProsemirrorEditorView
					{...props}
					selectedFileId={'myId1'}
				/>);
			});
			const { container, rerender, getByText, queryByText } = result;

			// check that has been rendered first
			getByText(props.editorContent);
			expect(container.querySelector('.ProseMirror')).toBeInstanceOf(Element);

			act(() => {
				rerender(<ProsemirrorEditorView
					{...props}
					selectedFileId={''}
				/>);

			});

			// check that has been destroyed
			expect(queryByText(props.editorContent)).toBeNull();
			expect(container.querySelector('.ProseMirror')).toBeNull();
		});
	});

	describe('onChange()', () => {
		test('should call the updateFile callback', () => {
			const { getByText } = render(<ProsemirrorEditorView
				{...props}
			/>);
			getByText(props.editorContent).closest('.ProseMirror');

			ProsemirrorEditorView.editorView.dispatch(
				ProsemirrorEditorView.editorView.state.tr.insertText('Modified: ')
			);

			expect(updateFile).toHaveBeenCalledWith('myId', { content: 'Modified: mySong in editor' });
		});

		test('should not call the updateFile callback if transaction does not result in doc change', () => {
			const { getByText } = render(<ProsemirrorEditorView
				{...props}
			/>);
			getByText(props.editorContent).closest('.ProseMirror');

			// mock getSelection to prevent Prosemirror error
			document.getSelection = () => {
				return {
					addRange: () => {},
					removeAllRanges: () => {},
				};
			};

			ProsemirrorEditorView.editorView.dispatch(
				ProsemirrorEditorView.editorView.state.tr
			);

			expect(updateFile).not.toHaveBeenCalled();

			document.getSelection = undefined;
		});

	});
});
