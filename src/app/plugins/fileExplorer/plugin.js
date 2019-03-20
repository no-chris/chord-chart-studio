import _ from 'lodash';

import pluginFactory from '../../../app/core/plugin';
import htmlToElement from '../../../core/dom/htmlToElement';

import fileManagerFactory from './fileManager';

import fileExplorerTpl from './fileExplorer.hbs';
import fileEntryTpl from './entry.hbs';


const autosaveIntervalMs = 1000;

const fileExplorerPlugin = pluginFactory({
	init() {
		this.fm = fileManagerFactory();
	},

	render() {
		const app = this.getHost();
		const areaBroker = app.getAreaBroker();
		const sideBar = areaBroker.getSideBar();

		const fileExplorer = new DocumentFragment();
		fileExplorer.appendChild(htmlToElement(fileExplorerTpl()));


		let activeFileKey;

		// DOM elements
		const newFileBtn = fileExplorer.querySelector('[data-action="new-file"]');
		const deleteFileBtn = fileExplorer.querySelector('[data-action="delete-file"]')
		const fileList = fileExplorer.querySelector('.entry-list');


		function insertFile(file) {
			const newEntry = htmlToElement(fileEntryTpl(file));

			const activeFile = fileList.querySelector(`[data-key="${activeFileKey}"`);

			if (activeFile && activeFile.nextSibling) {
				fileList.insertBefore(newEntry, activeFile.nextSibling);

			} else {
				fileList.appendChild(newEntry);
			}
		}

		function activateFile(key) {
			activeFileKey = key;

			fileList.querySelectorAll('.active').forEach(active => active.classList.remove('active'));
			const activeFile = fileList.querySelector(`[data-key="${key}"`);
			if (activeFile) {
				activeFile.classList.add('active');
			}
		}

		// load existing files
		const allFiles = this.fm.getAll();
		const sortedFiles = _.sortBy(allFiles, o => o.title);

		if (sortedFiles.length) {
			sortedFiles.forEach( file => {
				insertFile(file);
			});
			activateFile(sortedFiles[0].key);
		}



		// Add behaviour events
		const createNewFile = () => {
			const newFile = this.fm.create();

			insertFile(newFile);
			activateFile(newFile.key);
		};

		const deleteFile = () => {
			this.fm.deleteOne(activeFileKey);

			const toDelete = fileList.querySelector(`[data-key="${activeFileKey}"]`);

			if (toDelete) {
				const toActivate = (toDelete.nextSibling)
					? toDelete.nextSibling
					: toDelete.previousSibling;

				fileList.removeChild(toDelete);

				if (toActivate) {
					activateFile(toActivate.dataset.key);

				} else {
					activeFileKey = null;
				}
			}
		};

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
				const keyElement = (e.target.dataset.key) ? e.target : e.target.closest('[data-key]'); //todo WTF?!
				activateFile(keyElement.dataset.key);
			}
		};

		const makeTitleEditable = e => {
			if (e.target.classList.contains('entry-title')) {
				e.target.contentEditable = true;
				e.target.focus();
			}
		};

		const autosaveTitle = e => {
			const keyElement = e.target.closest('[data-key]');
			this.fm.updateTitle(keyElement.dataset.key, e.target.innerText); //todo sanitize
		};

		const autoBlurContentEditableElements = e => {
			const allEditable = fileList.querySelectorAll('[contenteditable="true"]');
			allEditable.forEach(editable => {
				if (!editable.isSameNode(e.target)) {
					editable.contentEditable = false;
				}
			});
		};

		newFileBtn.addEventListener('click', createNewFile);
		deleteFileBtn.addEventListener('click', deleteFile);

		fileList.addEventListener('keypress', preventEnterKey);
		fileList.addEventListener('keypress', blurOnEnter);
		fileList.addEventListener('input', _.throttle(autosaveTitle, autosaveIntervalMs));
		fileList.addEventListener('click', activateEntry);
		fileList.addEventListener('dblclick', makeTitleEditable);

		window.addEventListener('click', autoBlurContentEditableElements);



		// attach to document
		sideBar.appendChild(fileExplorer);
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