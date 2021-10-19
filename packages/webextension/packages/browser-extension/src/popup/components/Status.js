import React from 'react';

const Status = ({ statusId }) => {
	const contentPerStatusId = {
		ok: {
			title: 'All good!',
			className: 'pp-statusTitle_Container--green',
		},
		unsupported: {
			title: 'This website is not recognized',
			className: 'pp-statusTitle_Container--grey',
		},
		websiteError: {
			title: 'Duh! Something is wrong',
			className: 'pp-statusTitle_Container--yellow',
		},
	};
	const statusData = contentPerStatusId[statusId || 'unsupported'];

	const classNames = ['pp-statusTitle_Container', statusData.className];

	return (
		<div className={classNames.join(' ')}>
			{statusData.icon} {statusData.title}
		</div>
	);
};

export default Status;
