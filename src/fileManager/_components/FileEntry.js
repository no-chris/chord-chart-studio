import React, { useState, useEffect } from 'react';

export default function FileEntry(props) {
	const [ title, setTitle ] = useState(props.title);

	const {
		fileId,
		isSelected,
		isRenamed,
		defaultTitle,
		selectFile,
		enableRename,
		updateFile,
	} = props;

	const classList = ['fileManagerEntry'];
	if (isSelected) {
		classList.push('fileManagerEntry-isSelected');
	}
	if (isRenamed) {
		classList.push('fileManagerEntry-isRenamed');
	}

	const inputRef = React.createRef();

	useEffect(() => {
		if (isRenamed) {
			inputRef.current.focus();
		}
	}, [isRenamed, inputRef]);

	function handleClick() {
		if (!isSelected) {
			selectFile(fileId);
		}
	}

	function handleDoubleClick(e) {
		if (!isRenamed) {
			enableRename(fileId);
			e.target.select();
		}
	}

	function handleKeyPress(e) {
		if (isRenamed && e.which === 13) {
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

		updateFile(fileId, {
			title: newTitle
		});
		setTitle(newTitle);

		inputRef.current.scrollLeft = 0;
	}

	return (
		<li
			className={classList.join(' ')}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
		>
			<input
				className={'fileManagerEntry-input'}
				ref={inputRef}
				type={'text'}
				value={title}
				readOnly={(isRenamed) ? null : 'readOnly'}
				autoFocus={(isRenamed) ? 'autoFocus' : null}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				onKeyPress={handleKeyPress}
			/>
		</li>
	);
}
