import './Nav.scss';

import React from 'react';
import PropTypes from 'prop-types';

import NavEntry from './NavEntry';

function Nav(props) {
	const { currentMode, allEntries, setEditorMode, selectedId } = props;

	return (
		<nav className={'mainNav'}>
			<ul className={'mainNav-entries'}>
				{allEntries.map((entry, key) => (
					<NavEntry
						key={key}
						isActive={
							!!selectedId && entry.editorMode === currentMode
						}
						isDisabled={!selectedId}
						setEditorMode={setEditorMode}
						{...entry}
					/>
				))}
			</ul>
		</nav>
	);
}

Nav.propTypes = {
	currentMode: PropTypes.string.isRequired,
	setEditorMode: PropTypes.func.isRequired,
	selectedId: PropTypes.string,
	allEntries: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			icon: PropTypes.string.isRequired,
			editorMode: PropTypes.string.isRequired,
		})
	),
};

export default React.memo(Nav);
