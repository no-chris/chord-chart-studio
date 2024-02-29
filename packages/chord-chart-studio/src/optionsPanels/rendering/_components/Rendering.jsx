import './Rendering.scss';

import React from 'react';

import Icon from '../../../ui/_components/Icon';

import SidebarOptionPanel from '../../../ui/sideBar/options/_components/SidebarOptionsPanel';

export default function Rendering(props) {
	return (
		<div className={'renderingOptionsPanel'}>
			<div className={'renderingOptionsPanel-isCollapsed'}>
				<span className={'renderingOptionsPanel-icon'}>
					<Icon iconName={'settings'} />
				</span>
			</div>

			<div className={'renderingOptionsPanel-isExpanded'}>
				<SidebarOptionPanel {...props} id={'rendering'} />
			</div>
		</div>
	);
}
