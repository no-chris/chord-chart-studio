import React from 'react';
import Logo from '../../../sideBar/_components/Logo';
import Nav from './Nav';
import Footer from './Footer';

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

	const sidebarLeftClassNames = ['sidebar'];
	if (isLeftBarCollapsed) {
		sidebarLeftClassNames.push('is-collapsed');
	}

	const sidebarRightClassNames = ['sidebar'];
	if (isRightBarCollapsed) {
		sidebarRightClassNames.push('is-collapsed');
	}

	return (
		<div className="app-wrapper">
			<section data-area="app-sidebar-left" className={sidebarLeftClassNames.join(' ')}>
				<div className="content" onClick={(isLeftBarCollapsed) ? toggleLeftBar : null}>
					<Logo />
					{leftBar}
				</div>
				<div className="collapser" onClick={toggleLeftBar} />
			</section>
			<section data-area="app-main">
				<section data-area="app-header">
					<Nav
						active={activeRoute}
						allEntries={allNavEntries}
					/>
				</section>
				<section data-area="app-content">
					{props.children}
				</section>
				<section data-area="app-footer">
					<Footer/>
				</section>
			</section>
			<section data-area="app-sidebar-right" className={sidebarRightClassNames.join(' ')}>
				<div className="collapser" onClick={toggleRightBar} />
				<div className="content" onClick={(isRightBarCollapsed) ? toggleRightBar : null}>
					{rightBar}
				</div>
			</section>
		</div>
	);
}
