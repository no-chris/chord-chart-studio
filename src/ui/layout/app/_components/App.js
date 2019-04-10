import './App.scss';

import React from 'react';
import Logo from '../../../sideBar/_components/Logo';
import Nav from './Nav';
import Footer from './Footer';
import Icon from '../../../_components/Icon';

import allNavEntries from '../allNavEntries';

export default function App(props) {
	const {
		isLeftBarCollapsed,
		isRightBarCollapsed,
		toggleLeftBar,
		toggleRightBar,

		leftBar,
		rightBar,
		activeRoute,
	} = props;

	const sidebarLeftClassNames = ['appLayout-sidebar', 'appLayout-leftBar'];
	if (isLeftBarCollapsed) {
		sidebarLeftClassNames.push('appLayout-sidebar-isCollapsed');
	}

	const sidebarRightClassNames = ['appLayout-sidebar', 'appLayout-rightBar'];
	if (isRightBarCollapsed) {
		sidebarRightClassNames.push('appLayout-sidebar-isCollapsed');
	}

	return (
		<div className="appLayout-wrapper">
			<section className={sidebarLeftClassNames.join(' ')}>
				<div className="appLayout-sidebarContent appLayout-leftBarContent" onClick={(isLeftBarCollapsed) ? toggleLeftBar : null}>
					<Logo />
					{leftBar}
				</div>
				<div className="appLayout-sidebarCollapser appLayout-leftBarCollapser" onClick={toggleLeftBar}>
					<Icon iconName={'keyboard_arrow_left'} />
				</div>
			</section>
			<section className="appLayout-main">
				<section className="appLayout-header">
					<Nav
						active={activeRoute}
						allEntries={allNavEntries}
					/>
				</section>
				<section className="appLayout-content">
					{props.children}
				</section>
				<section className="appLayout-footer">
					<Footer/>
				</section>
			</section>
			<section className={sidebarRightClassNames.join(' ')}>
				<div className="appLayout-sidebarCollapser appLayout-rightBarCollapser" onClick={toggleRightBar}>
					<Icon iconName={'keyboard_arrow_right'} />
				</div>
				<div className="appLayout-sidebarContent appLayout-rightBarContent" onClick={(isRightBarCollapsed) ? toggleRightBar : null}>
					{rightBar}
				</div>
			</section>
		</div>
	);
}
