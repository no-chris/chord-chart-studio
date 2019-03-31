import React, { useState, useEffect } from 'react';

export default function FileEntry(props) {
	const [ title, setTitle ] = useState(props.title);

	const {
		fileKey,
		isSelected,
		isRenamed,
		defaultTitle,
		selectFile,
		enableRename,
		renameFile,
	} = props;

	const classList = ['fm-entry'];
	if (isSelected) {
		classList.push('selected');
	}
	if (isRenamed) {
		classList.push('renamed');
	}

	const inputRef = React.createRef();

	useEffect(() => {
		if (isRenamed) {
			inputRef.current.focus();
		}
	}, [isRenamed, inputRef]);

	function handleClick() {
		if (!isSelected) {
			selectFile(fileKey);
		}
	}

	function handleDoubleClick(e) {
		enableRename(fileKey);
		e.target.select();
	}

	function handleKeyPress(e) {
		if (e.which === 13) {
			e.preventDefault();
			window.getSelection().removeAllRanges();

			const newTitle = e.target.value;
			saveTitle(newTitle);
		}
	}

	function handleChange(e) {
		setTitle(e.target.value);
	}

	function handleFocus(e) {
		if (isRenamed) {
			e.target.select();
		}
	}

	function handleBlur(e) {
		if (isRenamed) {
			const newTitle = e.target.value;
			saveTitle(newTitle);
		}
	}

	function saveTitle(newTitle) {
		newTitle = newTitle || defaultTitle;

		renameFile(fileKey, newTitle);
		setTitle(newTitle);

		inputRef.current.scrollLeft = 0;
	}

	return (
		<li
			className={classList.join(' ')}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			onKeyPress={handleKeyPress}
		>
			<input
				ref={inputRef}
				className="entry-title"
				type="text"
				value={title}
				readOnly={(isRenamed) ? null : 'readOnly'}
				autoFocus={(isRenamed) ? 'autoFocus' : null}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
			/>
		</li>
	);
}
