import React from 'react';

const Button = ({ statusId, onClick }) => {
	const isStatusOk = statusId === 'ok';

	const handleClick = (e) => {
		if (!e.target.disabled) {
			e.target.disabled = true;
			onClick();
		}
	};

	return (
		<div className={'pp-button_Container'}>
			<button
				className={'pp-button_Button'}
				disabled={!isStatusOk}
				onClick={handleClick}
			>
				Import
			</button>
		</div>
	);
};

export default Button;
