import filesize from 'filesize';

const maxFileSizeBytes = 50 * 1024;

const getUploadedFile = (fileList) => {
	return new Promise((resolve, reject) => {
		if (fileList.length) {
			const file = fileList[0];

			if (isOversized(file)) {
				reject(getFileTooBigMsg(file.size));
			} else if (!isTextFile(file)) {
				reject(getWrongFileTypeMsg(file));
			} else {
				file.text()
					.then((fileContent) => {
						resolve({
							content: fileContent,
							title: getSongTitle(file),
						});
					})
					.catch((e) => {
						reject(e);
					});
			}
		} else {
			reject(getNoFileSelectedMsg());
		}
	});
};

const getSongTitle = (file) => file.name.substr(0, file.name.lastIndexOf('.'));

const isOversized = (file) => file.size > maxFileSizeBytes;

// files with extension such as .cho or .chopro are detected with an empty mimetype
const isTextFile = (file) =>
	file.type.indexOf('text') !== 0 || file.type.length === 0;

const getFileTooBigMsg = (actualSize) =>
	'The selected file is too big: ' +
	filesize(actualSize, { round: 0 }) +
	' (maximum allowed file size is ' +
	filesize(maxFileSizeBytes, { round: 0 }) +
	').';

const getWrongFileTypeMsg = (file) =>
	'Cannot import file of type ' + file.type + '.';

const getNoFileSelectedMsg = () => 'No file selected.';

export default getUploadedFile;
