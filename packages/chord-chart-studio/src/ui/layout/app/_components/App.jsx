import './App.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../../sideBar/_components/Logo';
import Nav from './Nav';
import UserGuide from '../../../sideBar/_components/UserGuide';
import Versions from '../../../sideBar/_components/Versions';
import Icon from '../../../_components/Icon';
import SongImporter from '../../../../songImporter/_containers/SongImporter';

import allNavEntries from '../allNavEntries';

function App(props) {
	const {
		editorMode,
		isLeftBarCollapsed,
		isRightBarCollapsed,
		toggleLeftBar,
		toggleRightBar,
		setEditorMode,
		selectedId,

		leftBar,
		rightBar,
	} = props;

	const leftBarClassNames = ['leftBar'];
	if (isLeftBarCollapsed) {
		leftBarClassNames.push('leftBar-isCollapsed');
	}

	const rightBarClassNames = ['rightBar'];
	if (isRightBarCollapsed) {
		rightBarClassNames.push('rightBar-isCollapsed');
	}

	return (
		<div className={'appLayout-wrapper'}>
			<SongImporter />
			<section className={leftBarClassNames.join(' ')}>
				<div
					className={'leftBar-content'}
					onClick={isLeftBarCollapsed ? toggleLeftBar : null}
				>
					<Logo />
					{leftBar}
				</div>
				<div
					className={'leftBar-collapser'}
					onClick={toggleLeftBar}
					data-testid={'leftBar-collapser'}
				>
					<span className={'leftBar-collapserIcon'}>
						<Icon iconName={'keyboard_arrow_left'} />
					</span>
				</div>
			</section>
			<section className={'appLayout-main'}>
				<section className={'appLayout-header'}>
					<Nav
						allEntries={allNavEntries}
						currentMode={editorMode}
						setEditorMode={setEditorMode}
						selectedId={selectedId}
					/>
				</section>
				<section className={'appLayout-content'}>
					{props.children}
				</section>
			</section>
			<section className={rightBarClassNames.join(' ')}>
				<div
					className={'rightBar-collapser'}
					onClick={toggleRightBar}
					data-testid={'rightBar-collapser'}
				>
					<span className={'rightBar-collapserIcon'}>
						<Icon iconName={'keyboard_arrow_right'} />
					</span>
				</div>
				<div
					className={'rightBar-content'}
					onClick={isRightBarCollapsed ? toggleRightBar : null}
				>
					<UserGuide />
					{rightBar}
					<Versions />
				</div>
			</section>
		</div>
	);
}

App.propTypes = {
	children: PropTypes.element,

	isLeftBarCollapsed: PropTypes.bool,
	isRightBarCollapsed: PropTypes.bool,
	selectedId: PropTypes.string,
	toggleLeftBar: PropTypes.func.isRequired,
	toggleRightBar: PropTypes.func.isRequired,

	editorMode: PropTypes.string.isRequired,
	setEditorMode: PropTypes.func.isRequired,

	leftBar: PropTypes.element.isRequired,
	rightBar: PropTypes.element.isRequired,
};

App.defaultProps = {
	isLeftBarCollapsed: false,
	isRightBarCollapsed: false,
};

export default App;
