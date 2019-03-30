import React from 'react';

import AppLayout from '../plugins/ui/layouts/app/components/App';

export default class Play extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AppLayout activeRoute="play"/>
		);
	}
}
