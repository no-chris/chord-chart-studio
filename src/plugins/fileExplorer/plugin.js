import _sortBy from 'lodash/sortBy';
import _defer from 'lodash/defer';
import _throttle from 'lodash/throttle';

import pluginFactory from '../../core/pluginFactory';
import htmlToElement from '../../core/dom/htmlToElement';

import fileManagerFactory from './fileManager';

import fileExplorerTpl from './fileExplorer.hbs';
import fileEntryTpl from './entry.hbs';


const autosaveIntervalMs = 1000;

const fileExplorerPlugin = pluginFactory({
	render() {
		const app = this.getHost();
		const areaBroker = app.getAreaBroker();
		const sideBar = areaBroker.getSideBar();

		const fileExplorer = document.createDocumentFragment();
		fileExplorer.appendChild(htmlToElement(fileExplorerTpl()));


		let activeFileKey;

		// DOM elements
		const newFileBtn = fileExplorer.querySelector('[data-action="new-file"]');
		const deleteFileBtn = fileExplorer.querySelector('[data-action="delete-file"]');
		const fileList = fileExplorer.querySelector('.entry-list');


		function insertFile(file) {
			const newEntry = htmlToElement(fileEntryTpl(file));

			const activeFile = fileList.querySelector(`[data-key="${activeFileKey}"`);

			if (activeFile && activeFile.nextSibling) {
				fileList.insertBefore(newEntry, activeFile.nextSibling);

			} else {
				fileList.appendChild(newEntry);
			}
			return newEntry;
		}

		const activateFile = (key) => {
			activeFileKey = key;

			fileList.querySelectorAll('.active').forEach(active => active.classList.remove('active'));
			const activeFile = fileList.querySelector(`[data-key="${key}"`);
			if (activeFile) {
				activeFile.classList.add('active');
			}

			const file = this.fm.getOneByKey(activeFileKey);
			app.emit('activatefile', file);
		};

		// load existing files
		const allFiles = this.fm.getAll();
		const sortedFiles = _sortBy(allFiles, o => o.title);

		if (sortedFiles.length) {
			sortedFiles.forEach( file => {
				insertFile(file);
			});
			activateFile(sortedFiles[0].key);
		}



		// Add behaviour events
		const createNewFile = () => {
			const newFile = this.fm.create();

			const newFileElement = insertFile(newFile);
			activateFile(newFile.key);

			_defer(() => makeTitleEditable(newFileElement));
		};

		const deleteFile = () => {
			this.fm.deleteOne(activeFileKey);

			const toDelete = fileList.querySelector(`[data-key="${activeFileKey}"]`);

			if (toDelete) {
				const toActivate = (toDelete.previousSibling)
					? toDelete.previousSibling
					: toDelete.nextSibling;

				fileList.removeChild(toDelete);

				if (toActivate) {
					activateFile(toActivate.dataset.key);

				} else {
					activeFileKey = null;
				}
			}
		};

		// todo: don't pass around event object
		const preventEnterKey = e => {
			if (e.which === 13) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		const blurOnEnter = e => {
			if (e.which === 13 && e.target.contentEditable) {
				e.target.blur();
				e.target.contentEditable = false;
			}
		};

		const activateEntry = e => {
			if (e.detail === 1) {
				const keyElement = e.target.closest('[data-key]');
				activateFile(keyElement.dataset.key);
			}
		};

		const makeTitleEditable = entry => {
			const title = entry.querySelector('.entry-title');
			title.contentEditable = true;
			title.focus();

			const range = new Range();
			range.selectNodeContents(title);
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		};

		const autosaveTitle = e => {
			const keyElement = e.target.closest('[data-key]');
			this.fm.updateTitle(keyElement.dataset.key, e.target.innerText); //todo sanitize
			//todo prevent empty
		};

		const autoBlurContentEditableElements = e => {
			const allEditable = fileList.querySelectorAll('[contenteditable="true"]');
			allEditable.forEach(editable => {
				if (!editable.isSameNode(e.target)) {
					editable.contentEditable = false;
				}
			});
		};

		window.addEventListener('click', autoBlurContentEditableElements);

		newFileBtn.addEventListener('click', createNewFile);
		deleteFileBtn.addEventListener('click', deleteFile);

		fileList.addEventListener('keypress', preventEnterKey);
		fileList.addEventListener('keypress', blurOnEnter);
		fileList.addEventListener('input', _throttle(autosaveTitle, autosaveIntervalMs));
		fileList.addEventListener('click', activateEntry);
		fileList.addEventListener('dblclick', e => makeTitleEditable(e.target.parentElement)); //todo fix bug when click outside of title div

		app.on('editorchange', fileContent => {
			this.fm.updateContent(activeFileKey, fileContent);
		});

		// attach to document
		sideBar.appendChild(fileExplorer);
	},

	init() {
		this.fm = fileManagerFactory();
	}
});

export default fileExplorerPlugin;



/**
 // Drag & drop
 const body = document.body;
 body.ondragover = () => {
	body.classList.add('hover');
	return false;
};
 body.ondragleave = () => {
	body.classList.remove('hover');
	return false;
};

 body.ondrop = e => {
	body.classList.remove('hover');
	e.preventDefault();

	const file = e.dataTransfer.files[0];
	const reader = new FileReader();

	reader.onload = function(event) {
		editor.load(toNode(event.target.result));
	};
	reader.readAsText(file);

	return false;
};
 **/
