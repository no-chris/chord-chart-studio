import React from 'react';
import Logo from './Logo';
import Nav from './Nav';
import Footer from './Footer';

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

	return (
		<div className="app-wrapper">
			<section data-area="app-sidebar-left" className={isLeftBarCollapsed ? 'is-collapsed' : ''}>
				<div className="content" onClick={(isLeftBarCollapsed) ? toggleLeftBar : null}>
					<Logo />
					{leftBar}
				</div>
				<div className="collapser" onClick={toggleLeftBar} />
			</section>
			<section data-area="app-main">
				<section data-area="app-header">
					<Nav active={activeRoute} />
				</section>
				<section data-area="app-content">
					{props.children}
				</section>
				<section data-area="app-footer">
					<Footer/>
				</section>
			</section>
			<section data-area="app-sidebar-right" className={(isRightBarCollapsed) ? 'is-collapsed' : ''}>
				<div className="collapser" onClick={toggleRightBar} />
				<div className="content" onClick={(isRightBarCollapsed) ? toggleRightBar : null}>
					{rightBar}
				</div>
			</section>
		</div>
	);
}
