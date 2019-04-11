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

	const sidebarLeftClassNames = ['leftBar'];
	if (isLeftBarCollapsed) {
		sidebarLeftClassNames.push('leftBar-isCollapsed');
	}

	const sidebarRightClassNames = ['rightBar'];
	if (isRightBarCollapsed) {
		sidebarRightClassNames.push('rightBar-isCollapsed');
	}

	return (
		<div className={'appLayout-wrapper'}>
			<section className={sidebarLeftClassNames.join(' ')}>
				<div className={'leftBar-content'} onClick={(isLeftBarCollapsed) ? toggleLeftBar : null}>
					<Logo />
					{leftBar}
				</div>
				<div className={'leftBar-collapser'} onClick={toggleLeftBar}>
					<span className={'leftBar-collapserIcon'}>
						<Icon iconName={'keyboard_arrow_left'} />
					</span>
				</div>
			</section>
			<section className={'appLayout-main'}>
				<section className={'appLayout-header'}>
					<Nav
						active={activeRoute}
						allEntries={allNavEntries}
					/>
				</section>
				<section className={'appLayout-content'}>
					{props.children}
				</section>
				<section className={'appLayout-footer'}>
					<Footer/>
				</section>
			</section>
			<section className={sidebarRightClassNames.join(' ')}>
				<div className={'rightBar-collapser'} onClick={toggleRightBar}>
					<span className={'rightBar-collapserIcon'}>
						<Icon iconName={'keyboard_arrow_right'} />
					</span>
				</div>
				<div className={'rightBar-content'} onClick={(isRightBarCollapsed) ? toggleRightBar : null}>
					{rightBar}
				</div>
			</section>
		</div>
	);
}
