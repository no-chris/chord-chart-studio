import React from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';
import Logo from './Logo';
import Footer from './Footer';

import {
	toggleLeftBar,
	toggleRightBar,
	getIsLeftBarCollapsed,
	getIsRightBarCollapsed
} from '../state';



export default connect(
	state => ({
		isLeftBarCollapsed: getIsLeftBarCollapsed(state),
		isRightBarCollapsed: getIsRightBarCollapsed(state),
	}),

	dispatch => ({
		_toggleLeftBar: () => toggleLeftBar(dispatch),
		_toggleRightBar: () => toggleRightBar(dispatch),
	})

)(function App(props) {
	const {
		leftBar,
		activeRoute,
		isLeftBarCollapsed,
		isRightBarCollapsed,
		_toggleRightBar,
		_toggleLeftBar
	} = props;

	function expandLeftBar() {
		if (isLeftBarCollapsed) {
			_toggleLeftBar();
		}
	}

	function expandRightBar() {
		if (isRightBarCollapsed) {
			_toggleRightBar();
		}
	}

	return (
		<div className="app-wrapper">
			<section data-area="app-sidebar-left" className={isLeftBarCollapsed ? 'is-collapsed' : ''}>
				<div className="content" onClick={expandLeftBar}>
					<Logo />
					{leftBar}
				</div>
				<div className="collapser" onClick={_toggleLeftBar}></div>
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
				<div className="collapser" onClick={_toggleRightBar}></div>
				<div className="content" onClick={expandRightBar}></div>
			</section>
		</div>
	);
});


