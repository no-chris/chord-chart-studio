import React from 'react';
import PropTypes from 'prop-types';

import Button from "./Button";

function ModalConfirm(props) {
	const { confirmAction, confirmTitle = 'OK', cancelAction, cancelTitle = 'CANCEL', children } = props;

	return (
		<section className={'mod-ModalConfirmContainer'}>
			<div className={'mod-ModalConfirmMessage'}>{children}</div>
			<div className={'mod-ModalConfirmButtons'}>
				<Button onClick={cancelAction} type={'secondary'} buttonName={'cancel'}>{cancelTitle}</Button>
				<Button onClick={confirmAction} type={'primary'} buttonName={'confirm'}>{confirmTitle}</Button>
			</div>
		</section>
	);
}

ModalConfirm.propTypes = {
	confirmAction: PropTypes.func.isRequired,
	confirmTitle: PropTypes.string,
	cancelAction: PropTypes.func.isRequired,
	cancelTitle: PropTypes.string,
	children: PropTypes.element.isRequired,
};

export default ModalConfirm;
