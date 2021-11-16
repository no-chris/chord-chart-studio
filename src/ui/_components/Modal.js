import './Modal.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
	const { children, closeModal } = props;

	useEffect(() => {
		const handleKeyboard = (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		window.addEventListener('keyup', handleKeyboard);

		return () => {
			window.removeEventListener('keyup', handleKeyboard);
		};
	});

	return (
		<section className={'mod-ModalContainer'}>
			<div
				className={'mod-Overlay'}
				onClick={closeModal}
				data-testid={'modal-overlay'}
			></div>
			<div className={'mod-ContentContainer'}>{children}</div>
		</section>
	);
}

Modal.propTypes = {
	children: PropTypes.element.isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default Modal;
