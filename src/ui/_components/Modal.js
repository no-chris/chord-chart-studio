import './Modal.scss';

import React from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
	const { children } = props;

	return (
		<section className={'mod-ModalContainer'} data-testid={'modal-overlay'}>
			<div className={'mod-Overlay'}></div>
			<div className={'mod-ContentContainer'}>{children}</div>
		</section>
	);
}

Modal.propTypes = {
	children: PropTypes.element.isRequired,
};

export default Modal;
