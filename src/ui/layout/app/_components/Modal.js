import './Modal.scss';

import React from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
	const { activeModal, closeModal } = props;
	
	if (activeModal === 'none') {
		return null;
	}

	return (
		<section className={'modal-Overlay'}>
			<div className={'modal-Container'}>
				<div>MODALICA</div>
				<button onClick={closeModal}>CLOSE ME!</button>	
			</div>
		</section>
	);
}

Modal.propTypes = {
	activeModal: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default Modal;
