import './EditorLayout.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { ScrollSync, ScrollSyncNode } from 'scroll-sync-react';

import EditorPreview from '../../../songRenderers/editorPreview/_components/EditorPreview';
import ProseMirrorEditorView from '../prosemirror/ProsemirrorEditorView';
import Icon from '../../../ui/_components/Icon';

function EditorLayout(props) {
	const { selectedFile, updateFile, theme } = props;

	const previewClassNames = [
		'songEditor-preview',
		'cmTheme-' + theme,
		'cmTheme-fadeRepeats',
	];

	return (
		<>
			<div className={'songEditor-headers'}>
				<div className={'songEditor-sourceHeader'}>
					<Icon iconName={'arrow_drop_down'} />
					ChordMark source (
					<a
						href={
							'https://chordmark.netlify.app/docs/getting-started'
						}
						target={'_blank'}
						rel={'noreferrer'}
						className={'link1'}
					>
						tutorial
					</a>
					)
					<Icon iconName={'arrow_drop_down'} />
				</div>
				<div className={'songEditor-previewHeader'}>
					<Icon iconName={'arrow_drop_down'} />
					Result preview
					<Icon iconName={'arrow_drop_down'} />
				</div>
			</div>
			<ScrollSync>
				<div className={'songEditor'}>
					<ScrollSyncNode group={'a'}>
						<div className={'songEditor-source'}>
							<ProseMirrorEditorView
								editorContent={selectedFile.content}
								updateFile={updateFile}
								selectedFileId={selectedFile.id}
							/>
						</div>
					</ScrollSyncNode>
					<ScrollSyncNode group={'a'}>
						<div className={previewClassNames.join(' ')}>
							<EditorPreview selectedFile={selectedFile} />
						</div>
					</ScrollSyncNode>
				</div>
			</ScrollSync>
		</>
	);
}

EditorLayout.propTypes = {
	selectedFile: PropTypes.object,
	theme: PropTypes.string.isRequired,
	updateFile: PropTypes.func.isRequired,
};

export default EditorLayout;
