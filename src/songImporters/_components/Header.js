import React from 'react';
import Button from '../../ui/_components/Button';
import PropTypes from 'prop-types';

const Header = ({ cancelImport, doImport, content, error }) => {
	return (
		<div className={'sim-Header_Container'}>
			<div className={'sim-Header_Title'}>Import song</div>
			<div className={'sim-Header_Actions'}>
				<Button
					onClick={cancelImport}
					buttonName={'cancel'}
					type={'secondary'}
				>
					CANCEL
				</Button>
				<Button
					onClick={doImport}
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
	content: PropTypes.string,
	doImport: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default Header;
