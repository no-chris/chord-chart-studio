import React from 'react';
import Button from '../../ui/_components/Button';
import PropTypes from 'prop-types';

const Header = ({ closeModal, content }) => {
	return (
		<div className={'sim-Header_Container'}>
			<div className={'sim-Header_Title'}>Import song</div>
			<div className={'sim-Header_Actions'}>
				<Button
					onClick={closeModal}
					buttonName={'cancel'}
					type={'secondary'}
				>
					CANCEL
				</Button>
				<Button
					onClick={closeModal}
					buttonName={'import'}
					type={'primary'}
					isDisabled={content === ''}
				>
					IMPORT
				</Button>
			</div>
		</div>
	);
};

Header.propTypes = {
	closeModal: PropTypes.func.isRequired,
	content: PropTypes.string,
};

export default Header;
