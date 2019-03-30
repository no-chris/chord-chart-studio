import React from 'react';

import AppLayout from '../plugins/ui/layouts/app/components/App';

export default class Export extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AppLayout activeRoute="export"/>
		);
	}
}
