import React from 'react';

export default function PrintPreview(props) {
	//const {xxx} = props;

	return (
		<div className="pp">
			<div className="pp-page">
				{props.children}
			</div>
		</div>
	);
}
