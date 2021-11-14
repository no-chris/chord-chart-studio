import React from 'react';
import Button from '../../ui/_components/Button';
import PropTypes from 'prop-types';

const Header = ({
	cancelImport,
	chordMarkContent,
	importFile,
	title,
	content,
	error,
}) => {
	const headerTitle = title ? 'Import "' + title + '"' : 'Import song';

	return (
		<div className={'sim-Header_Container'}>
			<div className={'sim-Header_Title'}>{headerTitle}</div>
			<div className={'sim-Header_Actions'}>
				<Button
					onClick={cancelImport}
					buttonName={'cancel'}
					type={'secondary'}
				>
					CANCEL
				</Button>
				<Button
					onClick={importFile.bind(
						null,
						title || '[untitled]',
						chordMarkContent
					)}
					buttonName={'import'}
					type={'primary'}
					isDisabled={content === '' || error !== ''}
				>
					IMPORT
				</Button>
			</div>
		</div>
	);
};

Header.propTypes = {
	cancelImport: PropTypes.func.isRequired,
	chordMarkContent: PropTypes.string,
	content: PropTypes.string,
	error: PropTypes.string,
	importFile: PropTypes.func.isRequired,
	title: PropTypes.string,
};

export default Header;
