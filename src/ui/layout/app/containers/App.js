import React from 'react';
import { connect } from 'react-redux';

import Nav from '../components/Nav';
import Logo from '../components/Logo';
import Footer from '../components/Footer';


import { toggleLeftBar, toggleRightBar} from '../actions';
import { isLeftBarCollapsed, isRightBarCollapsed } from '../selectors';


export default connect(
	state => ({
		isLeftBarCollapsed: isLeftBarCollapsed(state),
		isRightBarCollapsed: isRightBarCollapsed(state),
	}),

	{
		toggleLeftBar,
		toggleRightBar,
	}

)(function App(props) {
	const {
		leftBar,
		activeRoute,
	} = props;

	function expandLeftBar() {
		if (props.isLeftBarCollapsed) {
			props.toggleLeftBar();
		}
	}

	function expandRightBar() {
		if (props.isRightBarCollapsed) {
			props.toggleRightBar();
		}
	}

	return (
		<div className="app-wrapper">
			<section data-area="app-sidebar-left" className={props.isLeftBarCollapsed ? 'is-collapsed' : ''}>
				<div className="content" onClick={expandLeftBar}>
					<Logo />
					{leftBar}
				</div>
				<div className="collapser" onClick={props.toggleLeftBar} />
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
			<section data-area="app-sidebar-right" className={(props.isRightBarCollapsed) ? 'is-collapsed' : ''}>
				<div className="collapser" onClick={props.toggleRightBar} />
				<div className="content" onClick={expandRightBar} />
			</section>
		</div>
	);
});


