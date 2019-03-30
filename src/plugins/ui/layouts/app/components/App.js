import React from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';
import Logo from './Logo';
import Footer from './Footer';

import { toggleLeftBar, toggleRightBar, getIsLeftBarCollapsed, getIsRightBarCollapsed } from '../state';


function mapStateToProps(state) {
	return {
		isLeftBarCollapsed: getIsLeftBarCollapsed(state),
		isRightBarCollapsed: getIsRightBarCollapsed(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		_toggleLeftBar: () => toggleLeftBar(dispatch),
		_toggleRightBar: () => toggleRightBar(dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps

)(function App(props) {
	const {
		activeRoute,
		isRightBarCollapsed,
		isLeftBarCollapsed,
		_toggleRightBar,
		_toggleLeftBar
	} = props;

	return (
		<div className="app-wrapper">
			<section data-area="app-sidebar-left" className={isLeftBarCollapsed ? 'is-collapsed' : ''}>
				<div className="content">
					<Logo />
				</div>
				<div className="collapser" onClick={_toggleLeftBar}></div>
			</section>
			<section data-area="app-main">
				<section data-area="app-header">
					<Nav active={activeRoute} />
				</section>
				<section data-area="app-content">Tab</section>
				<section data-area="app-footer">
					<Footer/>
				</section>
			</section>
			<section data-area="app-sidebar-right" className={(isRightBarCollapsed) ? 'is-collapsed' : ''}>
				<div className="collapser" onClick={_toggleRightBar}></div>
				<div className="content"></div>
			</section>
		</div>
	);
});


